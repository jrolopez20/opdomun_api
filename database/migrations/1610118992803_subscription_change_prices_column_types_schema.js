'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubscriptionChangePricesColumnTypesSchema extends Schema {
  up () {
    this.table('subscriptions', (table) => {
      // alter table
      table.decimal('min_price', null, null).alter()
      table.decimal('max_price', null, null).notNullable().alter()
    })
  }

  down () {
    this.table('subscriptions', (table) => {
      // reverse alternations
      table.float('min_price').alter()
      table.float('max_price').notNullable().alter()
    })
  }
}

module.exports = SubscriptionChangePricesColumnTypesSchema
