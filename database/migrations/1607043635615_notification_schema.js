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
                    Notification.NOTIFICATION_TYPES().SALE_TO_BUYER,
                    Notification.NOTIFICATION_TYPES().PURCHASE_TO_PREMIUM_SELLER,
                    Notification.NOTIFICATION_TYPES().PURCHASE_TO_FREE_SELLER,
                    Notification.NOTIFICATION_TYPES().SALE_AD_PREMIUM_EXPIRED,
                    Notification.NOTIFICATION_TYPES().SALE_AD_FREE_EXPIRED,
                    Notification.NOTIFICATION_TYPES().SALE_AD_VIEWS,
                    Notification.NOTIFICATION_TYPES().SALE_AD_PREMIUM_CREATED,
                ],
                {useNative: true, enumName: 'notification_type'},
            ).notNullable()
            table.boolean('read').notNullable().defaultTo(false)
            table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
            table.jsonb('resource')
            table.jsonb('client')
            table.timestamps()
        })
    }

    down() {
        this.drop('notifications')
        this.raw('drop type notification_type')
    }
}

module.exports = NotificationSchema
