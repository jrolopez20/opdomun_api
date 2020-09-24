'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfficeSchema extends Schema {
  up () {
    this.create('offices', (table) => {
      table.increments()
      table.integer('provincia_id').unsigned().notNullable().references('id').inTable('provincias').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('offices')
  }
}

module.exports = OfficeSchema
