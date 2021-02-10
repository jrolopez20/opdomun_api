'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdditionalInfoUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.jsonb('additional_info')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('additional_info')
    })
  }
}

module.exports = AdditionalInfoUserSchema
