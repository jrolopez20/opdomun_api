'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NomElectrodomesticoSchema extends Schema {
  up () {
    this.create('nom_electrodomesticos', (table) => {
      table.increments()
      table.string('title', 255).notNullable()
      table.integer('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('nom_electrodomesticos')
  }
}

module.exports = NomElectrodomesticoSchema
