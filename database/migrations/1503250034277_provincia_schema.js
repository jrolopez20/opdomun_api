'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvinciaSchema extends Schema {
  up () {
    this.create('provincias', (table) => {
      table.increments()
      table.string('cod', 5).notNullable().unique().index()
      table.string('title', 30).notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('provincias')
  }
}

module.exports = ProvinciaSchema
