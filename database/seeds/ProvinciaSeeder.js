'use strict'

/*
|--------------------------------------------------------------------------
| ProvinciaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ProvinciaSeeder {

    async run() {
        // await (async function processArray() {
        //     for (const item of new Array(15)) {
        //         const provincia = await Factory.model('App/Models/Provincia')
        //             .create();
        //
        //         const office = await Factory.model('App/Models/Office')
        //             .make()
        //
        //         await provincia.office()
        //             .save(office);
        //     }
        // }());
    }
}

module.exports = ProvinciaSeeder
