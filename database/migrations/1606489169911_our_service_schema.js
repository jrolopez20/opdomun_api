'use strict'

const Schema = use('Schema')
const OurService = use('App/Models/OurService')

class OurServiceSchema extends Schema {
    up() {
        this.create('our_services', (table) => {
            table.increments()
            table.enu(
                'type',
                [
                    OurService.OUR_SERVICE_TYPES().PREMIUM_POST,
                    OurService.OUR_SERVICE_TYPES().FREE_POST
                ],
                {useNative: true, enumName: 'our_service_type'},
            ).notNullable().unique()
            table.string('title', 255).notNullable()
            table.text('description').notNullable()
            table.float('price')
            table.timestamps(true, true)
        })
    }

    down() {
        this.drop('our_services')
        this.raw('drop type our_service_type')
    }
}

module.exports = OurServiceSchema
