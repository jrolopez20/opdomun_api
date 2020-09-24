'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeTypeSchema extends Schema {
  up () {
    this.create('home_types', (table) => {
      table.increments()
      table.string('title', 20).notNullable().unique()
      table.integer('value').notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('home_types')
  }
}

module.exports = HomeTypeSchema
