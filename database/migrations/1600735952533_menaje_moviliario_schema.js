'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenajeMoviliarioSchema extends Schema {
  up () {
    this.create('menaje_moviliarios', (table) => {
      table.increments()
      table.integer('menaje_id').unsigned().notNullable().references('id').inTable('var_menajes').onDelete('CASCADE')
      table.integer('moviliario_id').unsigned().notNullable().references('id').inTable('nom_moviliarios').onDelete('RESTRICT')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('menaje_moviliarios')
  }
}

module.exports = MenajeMoviliarioSchema
