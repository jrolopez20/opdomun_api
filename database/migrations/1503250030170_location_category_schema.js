'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocationCategorySchema extends Schema {
  up () {
    this.create('location_categories', (table) => {
      table.increments()
      table.string('title', 255).notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('location_categories')
  }
}

module.exports = LocationCategorySchema
