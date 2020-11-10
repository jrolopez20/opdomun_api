'use strict'

const OurServicesService = use('App/Services/OurServicesService');

class OurServicesController {

    async index({response}) {
        const services = OurServicesService.getServices();
        return response.json(services);
    }

}

module.exports = OurServicesController;
