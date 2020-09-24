'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.integer('office_id').unsigned().references('id').inTable('offices').onDelete('CASCADE')
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('role', 10).notNullable()
      table.string('fullname', 50).notNullable()
      table.string('numid', 11)
      table.string('telephone', 15)
      table.string('address', 120)
      table.string('picture', 254)
      table.timestamps(true, true)
      table.timestamp('closed_at', true)
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
