'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenajeElectrodomesticoSchema extends Schema {
    up() {
        this.create('menaje_electrodomesticos', (table) => {
            table.increments()
            table.integer('menaje_id').unsigned().notNullable().references('id').inTable('var_menajes').onDelete('CASCADE')
            table.integer('electrodomestico_id').unsigned().notNullable().references('id').inTable('nom_electrodomesticos').onDelete('RESTRICT')
            table.timestamps(true, true)
        })
    }

    down() {
        this.drop('menaje_electrodomesticos')
    }
}

module.exports = MenajeElectrodomesticoSchema
