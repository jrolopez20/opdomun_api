'use strict'

const CurrencyService = use('App/Services/CurrencyService')
const OurService = use('App/Models/OurService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');

const services = [
    {
        type: 'PREMIUM_POST',
        title: 'Anuncio Premium',
        description: "" +
            "<ul>" +
            "<li>Visita de un arquitecto</li>" +
            "<li>Conexión con compradores registrados en Opdomun</li>" +
            "<li>Evaluación de su oferta en Opdomun</li>" +
            "<li>Mayor visibilidad en Opdomun</li>" +
            "<li>Elaboración de informe técnico</li>" +
            "<li>Publicidad en las redes sociales</li>" +
            "</ul>",
        price: {
            value: 30,
            currency: CurrencyService.DEFAULT_CURRENCY()
        },
    },
    {
        type: 'FREE_POST',
        title: 'Anuncio Gratis',
        description: "" +
            "<ul>" +
            "<li>Publicación en Opdomun</li>" +
            "<li>Activo por un mes</li>" +
            "</ul>",
        price: null
    }
];

class OurServiceService {
    static async addService({type, title, description, price}) {

        const service = new OurService();
        service.fill({type, title, description, price})
        await service.save();

        return await OurService.find(service.id);
    }

    static async setService(id, {type, title, description, price}) {
        let service = await OurService.find(id);
        if (!service) {
            throw new ResourceNotFoundException()
        }

        service.type = type
        service.title = title
        service.description = description
        service.price = price
        await service.save();

        return OurService.find(service.id);
    }

    static async destroyService(id) {
        try {
            let service = await OurService.findOrFail(id);
            return await service.delete();
        }
        catch (e) {
            throw new ResourceNotFoundException()
        }
    }
}

module.exports = OurServiceService;
