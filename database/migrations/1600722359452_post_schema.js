'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('municipio_id').unsigned().notNullable().references('id').inTable('municipios').onDelete('RESTRICT')
      table.integer('home_type_id').unsigned().notNullable().references('id').inTable('home_types').onDelete('RESTRICT')
      table.integer('plan').unsigned().references('id').inTable('plans').onDelete('RESTRICT')
      table.string('address', 120).notNullable()
      table.float('price')
      table.float('area').notNullable()
      table.integer('bedrooms').notNullable()
      table.integer('bathrooms').notNullable()
      table.string('summary', 1200)
      table.timestamps()
      table.timestamp('closed_at')
      table.timestamp('published_at')
      table.float('evi')
      table.float('opdo')
      table.integer('built_year')
      table.integer('build_status')
      table.integer('sold')
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
