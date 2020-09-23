'use strict'

/*
|--------------------------------------------------------------------------
| OfficeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Provincia = use('App/Models/Provincia')
const Office = use('App/Models/Office')

class OfficeSeeder {

    async run() {
        // Remove existing offices
        await Office.query().delete();

        const provincias = await Provincia.all();

        for (const province of provincias.toJSON()) {
            const office = await Factory.model('App/Models/Office')
                .create({province})
        }
    }
}

module.exports = OfficeSeeder
