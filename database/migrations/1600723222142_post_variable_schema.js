'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostVariableSchema extends Schema {
  up () {
    this.create('post_variables', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.integer('variable_id').unsigned().notNullable().references('id').inTable('posts').onDelete('RESTRICT')
      table.float('result')
      table.float('points')
      table.timestamps()
    })
  }

  down () {
    this.drop('post_variables')
  }
}

module.exports = PostVariableSchema
