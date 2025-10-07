const express = require('express');
const router = express.Router();
const Habit = require('../model/habit');
const { varifyToken } = require('../middleware/authMiddleware');
const {sendHabitReminderHabit} = require('../config/mailServer')
const { checkAndSendReminders } = require('../config/reminderShedulserService');

// get all habits
router.get('/habits', varifyToken, async (req, res, next) => {
    try {
        const allhabits = await Habit.find({userId : req.user._id});

        res.status(200).json({
            success : true,
            message : 'All habits gets successfully',
            habits : allhabits
        })
    } catch (error) {
        console.log('Get all habits error: ', error);
        next(error);
    }
})

// Create new habit
router.post('/create', varifyToken, async (req, res) =>{
    try {

        if(!req.body) {
            return res.status(400).json({
                success : false,
                error : "Request body is missing"
            });
        }

        const newHabit = new Habit({ ...req.body, userId : req.user._id});
        await newHabit.save();
        console.log(newHabit);

        res.status(201).json({
            success : true,
            message : "New habit created successfully",
            habit : newHabit
        });
    } catch (error) {
        console.log("Create habits error : ", error)
        res.status(500).json({
            success : false,
            error : "Internal server error"
        });
    }
})

// mark as done in habit
router.put('/mark-as-done', varifyToken, async (req, res, next)  => {
    try {
        const { id, date} = req.body;

        if(!id || !date) {
            return res.status(400).json({
                success : false,
                error : "Request body is missing"
            });
        }

        const habit = await Habit.findById(id);
        if(!habit) {
            return res.status(404).json({
                success : false,
                error : "Habit not found"
            });
        }
        
        habit.current += 1;
        habit.complatedDates.push(date);

        if(habit.current >= habit.target) {
            habit.isCompleted = true;
        }

        await habit.save();

        res.status(200).json({
            success : true,
            message : "Habit marked as done successfully",
            habit : habit
        });

    } catch (error) {
        console.log("Mark as done error : ", error);
        next(error);
    }
})

// delete habit
router.delete('/delete', varifyToken, async (req, res, next) => {
    try {
        const { id } = req.body;
        
        if(!id){
            return res.status(400).json({
                success : false,
                error : "Request body is missing"
            });
        }

        const deletedHabit = await Habit.findByIdAndDelete(id);
        if(!deletedHabit) {
            return res.status(404).json({
                success : false,
                error : "Habit not found"
            });
        }

        res.status(200).json({
            success : true,
            message : "Habit deleted successfully",
            habit : deletedHabit
        })
    } catch (error) {
        console.log("Delete habit error : ", error);
        next(error);
    }
})

// edit habit data
router.put('/edit', varifyToken, async (req, res, next) => {
    try {
        const data = req.body;
        console.log('Edit habit data received:', data);
        if(!data) {
            return res.status(400).json({
                success : false,
                message : "Request body messing"
            });
        }

        const updatesHabit = await Habit.findByIdAndUpdate(data._id, data, { new : true});

        console.log('updated habit:', updatesHabit);

        if(!updatesHabit) {
            return res.status(404).json({
                success : false,
                message : "Habit not found"
            });
        }

        res.status(200).json({
            success : true,
            message : "Habit updated successfully",
            habit : updatesHabit
        })
    } catch (error) {
        console.log("Edit habit error : ", error);
        next(error);
    }
})

// disable reminder
router.put('/disable-reminder', varifyToken, async (req, res, next) =>{
    try {
        const id = req.body.id;
        if(!id) {
            return res.status(400).json({
                success : false,
                error : "Request body is missing"
            });
        }

        const habit = await Habit.findById(id);
        if(!habit) {
            return res.status(404).json({
                success : false,
                error : "Habit not found"
            });
        }

        habit.reminder.active = false;
        await habit.save();
        console.log("Reminder disabled for habit:", habit);
        res.status(200).json({
            success : true,
            message : "Reminder disabled successfully",
            habit : habit
        });
    } catch (error) {
        console.log("Disable reminder error : ", error);
        next(error);
    }
})

// edit reminder
router.put('/edit-reminder', varifyToken, async (req, res, next) => {
    try {
        const data = req.body;
        if(!data || !data.id || !data.reminder) {
            return res.status(400).json({
                success : false,
                error : "Request body is missing"
            });
        }

        const habit = await Habit.findById(data.id);

        if(!habit) {
            return res.status(404).json({
                success : false,
                error : "Habit not found"
            });
        }

        habit.reminder = { ...habit.reminder, ...data.reminder};
        await habit.save();

        res.status(200).json({
            success : true,
            message : "Reminder updated successfully",
            habit : habit
        });
    } catch (error) {
        console.log("Edit reminder error : ", error);
        next(error);
    }
})


// test mail server
router.get('/test-mail', async (req, res) => {
    try {
        const result = await checkAndSendReminders();
        res.status(200).json(result);
    } catch (error) {
        console.log("Test mail error: ", error);
        res.status(500).json({ success: false, error: error.message });
    }
})

module.exports = router;