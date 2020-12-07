'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubscriptionSchema extends Schema {
    up() {
        this.create('subscriptions', (table) => {
            table.increments()
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
            table.integer('provincia_id').unsigned().notNullable().references('id').inTable('provincias').onDelete('CASCADE')
            table.jsonb('municipios')
            table.jsonb('home_types')
            table.float('min_price')
            table.float('max_price').notNullable()
            table.integer('bedrooms')
            table.integer('bathrooms')
            table.timestamps(true, true)
            table.timestamp('closed_at', true)
        })

        this.raw('CREATE INDEX subscriptions_home_type_gin_idx ON subscriptions USING gin (home_types jsonb_path_ops);')
        this.raw('CREATE INDEX subscriptions_municipio_gin_idx ON subscriptions USING gin (municipios jsonb_path_ops);')
    }

    down() {
        this.raw('DROP INDEX subscriptions_home_type_gin_idx;')
        this.raw('DROP INDEX subscriptions_municipio_gin_idx;')
        this.raw("drop table subscriptions CASCADE")

    }
}

module.exports = SubscriptionSchema
