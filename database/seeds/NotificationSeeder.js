'use strict'

const Factory = use('Factory')
const Notification = use('App/Models/Notification')

class NotificationSeeder {

    async run() {
        // Remove existing notifications
        await Notification.query().delete();


        for (let notificationType in Notification.NOTIFICATION_TYPES()) {
            await Factory.model('App/Models/Notification')
                .create({
                    type: notificationType
                })
        }
        for (let i = 0; i < 10; i++) {
            await Factory.model('App/Models/Notification')
                .create()
        }
    }
}

module.exports = NotificationSeeder
