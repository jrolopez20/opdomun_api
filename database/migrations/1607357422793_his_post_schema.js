'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const HisPost = use('App/Models/HisPost')

class HisPostSchema extends Schema {
    up() {
        this.create('his_posts', (table) => {
            table.increments()
            table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
            table.enu(
                'state',
                [
                    HisPost.STATES().NEW,
                    HisPost.STATES().PUBLISHED,
                    HisPost.STATES().RENEW,
                    HisPost.STATES().SOLD,
                    HisPost.STATES().CLOSED
                ],
                {useNative: true, enumName: 'his_post_state'},
            ).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('his_posts')
        this.raw('drop type his_post_state')
    }
}

module.exports = HisPostSchema
