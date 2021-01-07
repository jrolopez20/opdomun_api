'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubscriptionAddRemovedAtSchema extends Schema {
  up () {
    this.table('subscriptions', (table) => {
      // alter table
      table.timestamp('removed_at', true)
    })
  }

  down () {
    this.table('subscriptions', (table) => {
      // reverse alternations
      table.dropColumn('removed_at')
    })
  }
}

module.exports = SubscriptionAddRemovedAtSchema
