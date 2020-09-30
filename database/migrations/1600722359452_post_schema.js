'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('address_id').unsigned().notNullable().references('id').inTable('addresses').onDelete('CASCADE')
      table.integer('home_type_id').unsigned().notNullable().references('id').inTable('home_types').onDelete('RESTRICT')
      table.integer('plan_id').unsigned().references('id').inTable('plans').onDelete('RESTRICT')
      table.float('price')
      table.float('area').notNullable()
      table.integer('bedrooms').notNullable()
      table.integer('bathrooms').notNullable()
      table.string('summary', 1200)
      table.timestamps(true, true)
      table.timestamp('closed_at', true)
      table.timestamp('published_at', true)
      table.float('evi')
      table.float('opdo')
      table.integer('built_year')
      table.string('build_status', 20)
      table.boolean('sold')
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
