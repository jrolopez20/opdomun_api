'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostVisitSchema extends Schema {
  up () {
    this.create('post_visits', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.integer('total').notNullable().defaultTo(0)
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('post_visits')
  }
}

module.exports = PostVisitSchema
