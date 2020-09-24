'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VariableSchema extends Schema {
  up () {
    this.create('variables', (table) => {
      table.increments()
      table.string('cod', 10).notNullable().unique().index()
      table.string('title', 100).notNullable()
      table.float('influencia').notNullable()
      table.boolean('visible').notNullable().defaultTo(true)
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('variables')
  }
}

module.exports = VariableSchema
