'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocalidadSchema extends Schema {
  up () {
    this.create('localidads', (table) => {
      table.increments()
      table.integer('municipio_id').unsigned().references('id').inTable('municipios').onDelete('CASCADE')
      table.string('title', 120).notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('localidads')
  }
}

module.exports = LocalidadSchema
