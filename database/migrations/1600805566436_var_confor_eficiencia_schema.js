'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VarConforEficienciaSchema extends Schema {
  up () {
    this.create('var_confor_eficiencias', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.float('window_category').notNullable()
      table.float('window_area').notNullable()
      table.integer('puntal').notNullable()
      table.integer('solar_protection').notNullable()
      table.integer('east_protection')
      table.integer('south_protection')
      table.integer('west_protection')
      table.timestamps()
    })
  }

  down () {
    this.drop('var_confor_eficiencias')
  }
}

module.exports = VarConforEficienciaSchema
