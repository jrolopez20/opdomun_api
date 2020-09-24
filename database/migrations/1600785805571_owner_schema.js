'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OwnerSchema extends Schema {
  up () {
    this.create('owners', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.integer('owner_id').unsigned().references('id').inTable('owners').onDelete('CASCADE')
      table.string('fullname', 50).notNullable()
      table.string('telephone', 15).notNullable()
      table.string('email', 50)
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('owners')
  }
}

module.exports = OwnerSchema
