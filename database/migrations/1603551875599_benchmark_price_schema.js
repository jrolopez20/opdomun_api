'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BenchmarkPriceSchema extends Schema {
  up () {
    this.create('benchmark_prices', (table) => {
      table.increments()
      table.integer('location_category_id').unsigned().notNullable().references('id').inTable('location_categories').onDelete('CASCADE')
      table.integer('architectural_typology_id').unsigned().notNullable().references('id').inTable('architectural_typologies').onDelete('CASCADE')
      table.integer('rooms').notNullable()
      table.boolean('garage').notNullable()
      table.boolean('garden')
      table.float('reference_value').notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('benchmark_prices')
  }
}

module.exports = BenchmarkPriceSchema
