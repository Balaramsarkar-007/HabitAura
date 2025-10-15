const nodemailer = require('nodemailer');
require('dotenv').config();

// Gmail transpoter configuration (backup)
const createGmailTransporter = () => {
    return nodemailer.createTransport({
        service : 'gmail',
        port : 465,
        secure : true,
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        },
        connectionTimeout : 50000,
        greetingTimeout : 50000,
        socketTimeout : 50000
    });
}

// Multi-provider email sender
const createGmailWithTransporter = async (to, subject, html) => {
        try {
            console.log('📧 Trying Gmail send mail...');
            const transporter = createGmailTransporter();

            const info = await transporter.sendMail({
                from: `"HabitAura" <${process.env.EMAIL_USER}>`,
                to: to,
                subject: subject,
                html: html
            });

            transporter.close();
            console.log('✅ Email sent with Gmail:', info.messageId);
            return { success: true, messageId: info.messageId, provider: 'gmail' };

        } catch (error) {
            console.error('❌ Gmail also failed:', error.message);
            return { success: false, error: 'All email providers failed: ' + error.message };
        }
    // }
}

// send habit reminder email
const sendHabitReminder = async (userEmail, userName, habitName, habitDescription) => {
    try {
           const subject = `🎯 Habit Reminder: ${habitName}`;
            const html = `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">HabitAura Reminder</h1>
                    </div>
                    
                    <div style="padding: 30px; background-color: #f9f9f9;">
                        <h2 style="color: #333;">Hi ${userName}! 👋</h2>
                        
                        <p style="color: #555; font-size: 16px; line-height: 1.6;">
                            It's time to work on your habit: <strong style="color: #667eea;">${habitName}</strong>
                        </p>
                        
                        ${habitDescription ? `
                            <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                <p style="color: #666; margin: 0;"><em>${habitDescription}</em></p>
                            </div>
                        ` : ''}
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.BASE_URL}/dashboard/habits" 
                               style="background: #667eea; color: white; padding: 12px 24px; 
                                      text-decoration: none; border-radius: 6px; display: inline-block;">
                                Mark as Done
                            </a>
                        </div>
                        
                        <p style="color: #888; font-size: 14px;">
                            Keep up the great work! Every small step counts towards building lasting habits.
                        </p>
                    </div>
                    
                    <div style="background: #333; color: white; padding: 15px; text-align: center;">
                        <p style="margin: 0; font-size: 12px;">
                            HabitAura - Building Better Habits, One Day at a Time
                        </p>
                    </div>
                </div>
            `;

        const info = await createGmailWithTransporter(userEmail, subject, html);
        if(!info.success){
            throw new Error(info.error || "Failed to send email");
        }
        console.log("Email sent: ", info);
        return { success: true, messageId: info };
    } catch (error) {
        console.log("Error sending email: ", error);
        return { success: false, error: error.message };
    }
};

// welcome email
const sendWelcomeMail = async (userEmail, userName) => {
    try {

        const subject = `🎉 Welcome to HabitAura, ${userName}!`;    
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to HabitAura!</h1>
                <p style="color: #e8f2ff; margin: 10px 0 0 0; font-size: 16px;">Building Better Habits, One Day at a Time</p>
                </div>
                
                <div style="padding: 40px 30px; background-color: #ffffff;">
                <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Hi ${userName}! 🌟</h2>
                
                <p style="color: #555; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
                    Welcome to <strong style="color: #667eea;">HabitAura</strong>! We're thrilled to have you join our community of habit builders who are committed to creating positive, lasting changes in their lives.
                </p>
                
                <div style="background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #667eea;">
                    <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">🚀 Ready to get started?</h3>
                    <p style="color: #666; margin: 0; font-size: 15px; line-height: 1.6;">
                    Your journey to building amazing habits begins now! Create your first habit and start tracking your progress today.
                    </p>
                </div>
                
                <div style="text-align: center; margin: 35px 0;">
                    <a href="${process.env.BASE_URL}/dashboard" 
                       style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; padding: 15px 30px; text-decoration: none; 
                          border-radius: 8px; display: inline-block; font-size: 16px; 
                          font-weight: bold; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                    Start Your Journey
                    </a>
                </div>
                
                <div style="border-top: 1px solid #eee; padding-top: 25px; margin-top: 30px;">
                    <p style="color: #777; font-size: 14px; line-height: 1.6; margin: 0;">
                    <strong>Tip:</strong> Start small! Choose one simple habit and commit to it for just 5 minutes a day. 
                    Consistency beats intensity every time. 💪
                    </p>
                </div>
                </div>
                
                <div style="background: #2c3e50; color: white; padding: 20px; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 14px;">
                    Need help? We're here for you!
                </p>
                <p style="margin: 0; font-size: 12px; color: #bdc3c7;">
                    HabitAura Team | Building Better Habits, One Day at a Time
                </p>
                </div>
            </div>
            `;

        const info = await createGmailWithTransporter(userEmail, subject, html);
        console.log("Welcome email sent: ", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending welcome email: ", error);
        return { success: false, error: error.message };
    }
}

module.exports = { sendHabitReminder, sendWelcomeMail };