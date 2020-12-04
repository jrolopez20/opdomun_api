'use strict'

const Schema = use('Schema')
const Notification = use('App/Models/Notification')

class NotificationSchema extends Schema {
    up() {
        this.create('notifications', (table) => {
            table.increments()
            table.string('title', 255).notNullable()
            table.text('description').notNullable()
            table.enu(
                'type',
                [
                    Notification.NOTIFICATION_TYPES().SALE,
                    Notification.NOTIFICATION_TYPES().PURCHASE_TO_PREMIUM,
                    Notification.NOTIFICATION_TYPES().PURCHASE_TO_FREE,
                    Notification.NOTIFICATION_TYPES().SALE_AD_PREMIUM_RENEW,
                    Notification.NOTIFICATION_TYPES().SALE_AD_FREE_EXPIRED,
                    Notification.NOTIFICATION_TYPES().SALE_AD_VIEWS,
                    Notification.NOTIFICATION_TYPES().SALE_AD_PREMIUM_CREATED,
                ],
                {useNative: true, enumName: 'notification_type'},
            ).notNullable()
            table.boolean('read')
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
            table.integer('resource')
            table.timestamps()
        })
    }

    down() {
        this.drop('notifications')
        this.raw('drop type notification_type')
    }
}

module.exports = NotificationSchema
