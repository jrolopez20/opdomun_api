'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Plan = use('App/Models/Plan')

class PlanSchema extends Schema {
    up() {
        this.create('plans', (table) => {
            table.increments()
            table.integer('ranking').notNullable()
            table.timestamps(true, true)
            table.enu(
                'type',
                [Plan.TYPES().PREMIUM, Plan.TYPES().FREE],
                {useNative: true, enumName: 'plan_type'},
            ).notNullable().unique()
        })
    }

    down() {
        this.drop('plans')
        this.raw("drop type plan_type")
    }
}

module.exports = PlanSchema
