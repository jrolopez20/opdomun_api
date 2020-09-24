'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstConstructivaSchema extends Schema {
  up () {
    this.create('est_constructivas', (table) => {
      table.increments()
      table.integer('post_variable_id').unsigned().notNullable().references('id').inTable('post_variables').onDelete('CASCADE')
      table.string('display_value', 100).notNullable()
      table.string('title', 30).notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('est_constructivas')
  }
}

module.exports = EstConstructivaSchema
