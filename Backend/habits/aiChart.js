const express = require('express')
const router = express.Router();
const AiChart = require('../model/aiChart');
const Habit = require('../model/habit');
const { varifyToken, aiLimiter } = require('../middleware/authMiddleware');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const  { habitSystemPrompt }  =  require('./sytemPrompt');
const user = require('../model/user');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// get chat history
router.get("/history", varifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await AiChart.find({ userId })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean()
    .then(docs => docs.reverse());
        res.json({ history });
    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({ error: "Failed to fetch chat history" });
    }
});

router.post("/suggestions", varifyToken, aiLimiter, async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log("Received prompt:", prompt);
        const userId = req.user.id;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // get all habits
        const habits = await Habit.find(
            { userId, isActive: true },
        ).limit(5).sort({ createdAt: -1 })
        .select('name category current target completedDates -_id')
        .lean();

        const habitSummary = habits.length > 0
                ? habits.map((h, i) => `${i + 1}. ${h.name} (${h.category}) - ${h.current}/${h.target} days`)
                        .join('\n')
                : null;

        console.log("Habit summary for AI:", habitSummary);                

        // Build model with system instruction
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-lite',
            systemInstruction: habitSystemPrompt(habitSummary),
        });

        // Save user message to DB
        const userMsg = new AiChart({
            userId,
            role: 'user',
            message: prompt,
        });
        await userMsg.save();

        // Generate AI response
        const aiResponse = await model.generateContent(prompt);
        
        const aiMsgContent = aiResponse.response.text();

        // Save AI response to DB
        const aiMsg = new AiChart({
            userId,
            role: 'assistant',
            message: aiMsgContent,
        });
        await aiMsg.save();

        res.json({ message: aiMsg });
    } catch (error) {
        console.error("Error in AI suggestions:", error);
        res.status(500).json({ error: "Failed to generate AI suggestions" });
    }
});

module.exports = router;