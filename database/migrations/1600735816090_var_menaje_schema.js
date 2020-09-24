'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VarMenajeSchema extends Schema {
  up () {
    this.create('var_menajes', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.boolean('exist').notNullable().defaultTo(0)
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('var_menajes')
  }
}

module.exports = VarMenajeSchema
