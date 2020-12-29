'use strict'

const Factory = use('Factory')
const Notification = use('App/Models/Notification')
const User = use('App/Models/User')

class NotificationSeeder {

    async run() {
        // Remove existing notifications
        await Notification.query().delete();

        const user = await User.findBy('email', 'admin@opdomun.com');
        for (let notificationType in Notification.NOTIFICATION_TYPES()) {
            await Factory.model('App/Models/Notification')
                .create({
                    type: notificationType,
                    user
                })
        }
    }
}

module.exports = NotificationSeeder
