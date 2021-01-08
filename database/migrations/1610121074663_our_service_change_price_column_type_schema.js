'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OurServiceChangePriceColumnTypeSchema extends Schema {
  up () {
    this.table('our_services', (table) => {
      // alter table
      table.decimal('price', null, null).alter()
    })
  }

  down () {
    this.table('our_services', (table) => {
      // reverse alternations
      table.float('price').alter()
    })
  }
}

module.exports = OurServiceChangePriceColumnTypeSchema
