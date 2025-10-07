const cron = require('node-cron');
const Habit = require('../model/habit');
const { sendHabitReminder } = require('./mailServer');
const {format} = require('date-fns');
const habit = require('../model/habit');

// check and send reminders in every minute
const startReminderScheduler = () => {
    cron.schedule('* * * * *', async () => {
        try {
            await checkAndSendReminders();
        } catch (error) {
            console.error('Error in reminder scheduler in cron scheduler:', error);
        }
    })
}

// chceck for active reminders and send email
const checkAndSendReminders = async () => {
    try {
        const currentTime = format(new Date(), 'HH:mm');
        const currentDay = format(new Date(), 'iii').toLowerCase();

        const habits = await Habit.find({
            'reminder.active': true,
            'reminder.time': currentTime,
            'reminder.freq': {$in: ['daily', 'weekly']}
        }).populate('userId', 'email username');

        
        for(const habit of habits) {
            let shouldSend = false;

            // check reminder frequency
            if(habit.reminder.freq === 'daily'){
                shouldSend = true;
            } else if(habit.reminder.freq === 'weekly' && (currentDay === 'sat' || currentDay === 'sun')) {
                shouldSend = true;
            }

            // check if already sent today
            const today = format(new Date(), 'dd-MM-yyyy');
        
            if(shouldSend){
                await sendReminderEmail(habit);

                // update last sent time
                habit.reminder.lastSent = today;
                await habit.save();
            }
        }
    } catch (error) {
        console.error('Error in checkAndSendReminders:', error);
        return error;
    }
};

const sendReminderEmail = async (habit) => {
    try {
        const user = habit.userId;

        if(!user || !user.email) {
            return { success: false, message: 'User email not found for habit ID: ' + habit._id };
        }

        const result = await sendHabitReminder(
            user.email,
            user.username || 'User',
            habit.name || 'Your Habit',
            habit.des || 'No description provided'
        )

        if(result.success) {
            console.log(`Reminder email sent to ${user.email} for habit ${habit.name}`);
            return { success: true, message: `Reminder email sent to ${user.email}` };
        }
        else {
            console.log(`Failed to send reminder email to ${user.email} for habit ${habit.name}`);
            return { success: false, message: `Failed to send reminder email to ${user.email}` };
        }
        
    } catch (error) {
        console.error('Error in sendHabitReminder:', error);
        return { success: false, message: 'Error in sendHabitReminder: ' + error.message };
    }
}

module.exports = {
    startReminderScheduler,
    checkAndSendReminders,
    sendHabitReminder
};