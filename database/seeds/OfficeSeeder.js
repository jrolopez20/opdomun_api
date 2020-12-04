'use strict'

const Factory = use('Factory')
const Provincia = use('App/Models/Provincia')
const Office = use('App/Models/Office')

class OfficeSeeder {

    async run() {
        // Remove existing offices
        await Office.query().delete();

        const provincias = await Provincia.all();

        for (let provincia of provincias.toJSON()) {
            const office = await Factory.model('App/Models/Office')
                .create({provincia})
        }
    }
}

module.exports = OfficeSeeder
