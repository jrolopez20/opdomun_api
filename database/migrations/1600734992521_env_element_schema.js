'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnvElementSchema extends Schema {
  up () {
    this.create('env_elements', (table) => {
      table.increments()
      table.integer('post_variable_id').unsigned().notNullable().references('id').inTable('post_variables').onDelete('CASCADE')
      table.string('title', 100).notNullable()
      table.integer('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('env_elements')
  }
}

module.exports = EnvElementSchema
