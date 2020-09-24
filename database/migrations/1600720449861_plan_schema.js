'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanSchema extends Schema {
  up () {
    this.create('plans', (table) => {
      table.increments()
      table.string('title', 20).notNullable().unique().index()
      table.integer('ranking').notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('plans')
  }
}

module.exports = PlanSchema
