'use strict'

const Factory = use('Factory')
const OurService = use('App/Models/OurService')

class OurServiceSeeder {
    async run() {
        // Remove existing services
        await OurService.query().delete();

        const servicesType = OurService.OUR_SERVICE_TYPES()
        for (let type in servicesType) {
            await Factory.model('App/Models/OurService')
                .create({
                    type: type
                })
        }
    }
}

module.exports = OurServiceSeeder
