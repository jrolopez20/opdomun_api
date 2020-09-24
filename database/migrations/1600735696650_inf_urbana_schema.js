'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InfUrbanaSchema extends Schema {
  up () {
    this.create('inf_urbanas', (table) => {
      table.increments()
      table.integer('post_variable_id').unsigned().notNullable().references('id').inTable('post_variables').onDelete('CASCADE')
      table.string('title', 40).notNullable()
      table.integer('value').notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('inf_urbanas')
  }
}

module.exports = InfUrbanaSchema
