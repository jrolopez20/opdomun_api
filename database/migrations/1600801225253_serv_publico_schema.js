'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServPublicoSchema extends Schema {
  up () {
    this.create('serv_publicos', (table) => {
      table.increments()
      table.integer('post_variable_id').unsigned().notNullable().references('id').inTable('post_variables').onDelete('CASCADE')
      table.integer('value').notNullable()
      table.string('display_value', 100).notNullable()
      table.string('title', 40).notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('serv_publicos')
  }
}

module.exports = ServPublicoSchema
