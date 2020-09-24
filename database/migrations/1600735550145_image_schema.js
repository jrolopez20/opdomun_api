'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.string('url', 254).notNullable()
      table.boolean('default').comment('Default image to show')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
