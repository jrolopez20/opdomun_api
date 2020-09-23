'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RiesgoSchema extends Schema {
  up () {
    this.create('riesgos', (table) => {
      table.increments()
      table.integer('post_variable_id').unsigned().notNullable().references('id').inTable('post_variables').onDelete('CASCADE')
      table.integer('value').notNullable()
      table.integer('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('riesgos')
  }
}

module.exports = RiesgoSchema
