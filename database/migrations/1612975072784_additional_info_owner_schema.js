'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdditionalInfoOwnerSchema extends Schema {
    up() {
        this.table('owners', (table) => {
            // alter table
            table.jsonb('additional_info')
        })
    }

    down() {
        this.table('owners', (table) => {
            // reverse alternations
            table.dropColumn('additional_info')
        })
    }
}

module.exports = AdditionalInfoOwnerSchema
