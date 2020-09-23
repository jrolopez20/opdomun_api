'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistPostSchema extends Schema {
  up () {
    this.create('hist_posts', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.integer('action').notNullable().comment('1-Publicado, 2-Renovado, 3-Tasar')
      table.timestamps()
    })
  }

  down () {
    this.drop('hist_posts')
  }
}

module.exports = HistPostSchema
