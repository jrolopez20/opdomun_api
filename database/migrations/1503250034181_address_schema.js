'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
    up() {
        this
            .create('addresses', (table) => {
                table.increments()
                table.integer('localidad_id').notNullable().unsigned().references('id').inTable('localidads').onDelete('RESTRICT')
                table.string('description', 120).notNullable()
                table.timestamps(true, true)
            })

        this.raw("alter table addresses add coordinates point")
    }

    down() {
        this.drop('addresses')
    }
}

module.exports = AddressSchema
