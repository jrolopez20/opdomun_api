'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NomMoviliarioSchema extends Schema {
  up () {
    this.create('nom_moviliarios', (table) => {
      table.increments()
      table.string('title', 255).notNullable()
      table.integer('value').notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('nom_moviliarios')
  }
}

module.exports = NomMoviliarioSchema
