'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const CurrencyService = use('App/Services/CurrencyService')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.integer('office_id').unsigned().references('id').inTable('offices').onDelete('CASCADE')
      table.integer('address_id').unsigned().references('id').inTable('addresses').onDelete('SET NULL')
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('role', 10).notNullable()
      table.boolean('enabled').notNullable().defaultTo(false)
      table.string('fullname', 50).notNullable()
      table.string('numid', 11)
      table.string('telephone', 15)
      table.string('picture', 254)
      table.boolean('notifications_consent').defaultTo(false)
      table.timestamps(true, true)
      table.timestamp('closed_at', true)
      table.string('preferred_currency', 3).defaultTo(CurrencyService.DEFAULT_CURRENCY())
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
