'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostPlaceSchema extends Schema {
  up () {
    this.create('post_places', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.string('title', 254).notNullable()
      table.integer('score').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('post_places')
  }
}

module.exports = PostPlaceSchema
