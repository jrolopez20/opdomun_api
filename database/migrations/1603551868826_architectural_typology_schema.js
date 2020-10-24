'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArchitecturalTypologySchema extends Schema {
  up () {
    this.create('architectural_typologies', (table) => {
      table.increments()
      table.string('title', 100).notNullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('architectural_typologies')
  }
}

module.exports = ArchitecturalTypologySchema
