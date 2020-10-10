'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Post = use('App/Models/Post')

class PostSchema extends Schema {
    up() {
        this.create('posts', (table) => {
            table.increments()
            table.integer('managed_by_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
            table.integer('address_id').unsigned().notNullable().references('id').inTable('addresses').onDelete('CASCADE')
            table.integer('home_type_id').unsigned().notNullable().references('id').inTable('home_types').onDelete('RESTRICT')
            table.integer('plan_id').unsigned().references('id').inTable('plans').onDelete('RESTRICT')
            table.float('price')
            table.float('area').notNullable()
            table.integer('bedrooms').notNullable()
            table.integer('bathrooms').notNullable()
            table.string('summary', 1200)
            table.timestamps(true, true)
            table.timestamp('closed_at', true)
            table.timestamp('published_at', true)
            table.float('evi')
            table.float('opdo')
            table.integer('built_year')
            table.enu(
                'build_status',
                [
                    Post.BUILD_STATUS_TYPES().EXCELENT,
                    Post.BUILD_STATUS_TYPES().VERY_GOOD,
                    Post.BUILD_STATUS_TYPES().GODD,
                    Post.BUILD_STATUS_TYPES().REGULAR,
                    Post.BUILD_STATUS_TYPES().BAD,
                    Post.BUILD_STATUS_TYPES().VERY_BAD,
                    Post.BUILD_STATUS_TYPES().DEMOLITION,
                ],
                {useNative: true, enumName: 'build_status_type'},
            )
            table.boolean('sold')
            table.timestamp('sold_at', true)
        })
    }

    down() {
        this.drop('posts')
        this.raw('drop type build_status_type')
    }
}

module.exports = PostSchema
