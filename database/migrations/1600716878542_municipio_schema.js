'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MunicipioSchema extends Schema {
  up () {
    this.create('municipios', (table) => {
      table.increments()
      table.integer('provincia_id').unsigned().notNullable().references('id').inTable('provincias').onDelete('CASCADE')
      table.string('title', 30).notNullable()
      table.decimal('prosp_urbana', 5).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('municipios')
  }
}

module.exports = MunicipioSchema
