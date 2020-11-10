'use strict'

const CurrencyService = use('App/Services/CurrencyService')

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

class OurServicesService {

    static getServices() {
        return services;
    }
}

module.exports = OurServicesService;
