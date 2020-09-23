'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VarDisenoEsteticaSchema extends Schema {
  up () {
    this.create('var_diseno_esteticas', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.integer('valor_arquitectonico')
      table.integer('valor_urbano')
      table.timestamps()
    })
  }

  down () {
    this.drop('var_diseno_esteticas')
  }
}

module.exports = VarDisenoEsteticaSchema
