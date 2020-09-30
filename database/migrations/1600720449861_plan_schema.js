'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanSchema extends Schema {
    up() {
        this.raw("create type plan_type as enum('PREMIUM', 'FREE')")

        this.create('plans', (table) => {
            table.increments()
            table.integer('ranking').notNullable()
            table.timestamps(true, true)
        })

        this.raw("alter table plans add type plan_type NOT NULL UNIQUE")
    }

    down() {
        this.drop('plans')
        this.raw("drop type plan_type")
    }
}

module.exports = PlanSchema
