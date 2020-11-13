'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubscriptionSchema extends Schema {
  up () {
    this.create('subscriptions', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('provincia_id').unsigned().notNullable().references('id').inTable('provincias').onDelete('CASCADE')
      table.specificType('municipio', 'jsonb').notNullable()
      table.specificType('home_type', 'jsonb').notNullable()
      table.float('min_price').notNullable()
      table.float('max_price').notNullable()
      table.integer('bedrooms')
      table.integer('bathrooms')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('subscriptions')
  }
}

module.exports = SubscriptionSchema
