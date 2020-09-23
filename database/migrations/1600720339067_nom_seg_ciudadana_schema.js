'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NomSegCiudadanaSchema extends Schema {
  up () {
    this.create('nom_seg_ciudadanas', (table) => {
      table.increments()
      table.string('title', 10).notNullable()
      table.integer('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('nom_seg_ciudadanas')
  }
}

module.exports = NomSegCiudadanaSchema
