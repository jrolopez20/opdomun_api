'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ColindanciaPrivacidadSchema extends Schema {
  up () {
    this.create('colindancia_privacidads', (table) => {
      table.increments()
      table.integer('post_variable_id').unsigned().notNullable().references('id').inTable('post_variables').onDelete('CASCADE')
      table.integer('rel_hor').notNullable()
      table.integer('rel_vert').notNullable()
      table.integer('tipo_via').notNullable()
      table.string('altura_cerc_per', 10).notNullable()
      table.integer('permeabilidad').notNullable()
      table.integer('altura').notNullable()
      table.string('distancia', 3).notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('colindancia_privacidads')
  }
}

module.exports = ColindanciaPrivacidadSchema
