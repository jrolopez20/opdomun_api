'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
    up() {
        this.create('articles', (table) => {
            table.increments()
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
            table.string('title', 130).notNullable()
            table.string('summary', 300).notNullable()
            table.text('text').notNullable()
            table.string('picture', 254)
            table.timestamps(true, true)
        })
    }

    down() {
        this.drop('articles')
    }
}

module.exports = ArticleSchema
