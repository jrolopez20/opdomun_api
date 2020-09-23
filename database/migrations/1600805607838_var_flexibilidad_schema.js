'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VarFlexibilidadSchema extends Schema {
  up () {
    this.create('var_flexibilidads', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.float('area_crecimiento').comment('Max resize area')
      table.timestamps()
    })
  }

  down () {
    this.drop('var_flexibilidads')
  }
}

module.exports = VarFlexibilidadSchema
