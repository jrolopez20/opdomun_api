'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')
const Office = use('App/Models/Office')
const HomeType = use('App/Models/HomeType')
const Localidad = use('App/Models/Localidad')
const Municipio = use('App/Models/Municipio')
const Hash = use('Hash')


Factory.blueprint('App/Models/Article', async (faker, i, data) => {
    return {
        title: faker.sentence({words: 7}),
        summary: faker.sentence({words: 20}),
        text: faker.paragraph() + ' ' + faker.paragraph(),
    }
});

Factory.blueprint('App/Models/User', async (faker, i, data) => {
    return {
        email: data.email || faker.email(),
        password: '123456',
        role: data.role || User.roles().CLIENT,
        enabled: true,
        fullname: faker.name(),
        numid: faker.integer({min: 60000000000, max: 99999999999}),
        telephone: faker.phone({formatted: false}),
        notificationsConsent: true,
        officeId: data.office ? data.office.id : null
    }
});

Factory.blueprint('App/Models/Post', async (faker, i, data) => {
    const homeTypes = (await HomeType.all()).toJSON();
    const localidades = (await Localidad.all()).toJSON();
    if (!homeTypes.length || !localidades.length) {
        throw Error('Be sure to execute database initialization script before execute this seed.')
    }
    return {
        plan: data.plan || null,
        price: {
            value: faker.integer({min: 7000, max: 80000}),
            currency: 'USD'
        },
        area: faker.integer({min: 90, max: 199}),
        homeType: {
            id: homeTypes[faker.integer({min: 0, max: 5})].id
        },
        bedrooms: faker.integer({min: 1, max: 6}),
        bathrooms: faker.integer({min: 1, max: 3}),
        summary: faker.paragraph({sentences: 4}),
        builtYear: faker.year({min: 1940, max: 2020}),
        postPlaces: [
            {
                "score": 100,
                "title": "Sala"
            },
            {
                "score": 100,
                "title": "Cocina"
            }
        ],
        address: {
            localidad: {
                id: localidades[faker.integer({min: 10, max: 600})].id,
            },
            description: faker.address(),
            coordinates: {
                longitude: faker.longitude(),
                latitude: faker.latitude()
            }
        },
        owner: {
            fullname: faker.name(),
            email: faker.email(),
            telephone: faker.phone({formatted: false})
        },
        images: [
            {
                url: faker.avatar({protocol: 'https', fileExtension: 'jpg'}),
                default: true
            },
            {
                url: faker.avatar({protocol: 'https', fileExtension: 'jpg'}),
                default: false
            }
        ]
    }
});

Factory.blueprint('App/Models/Office', async (faker, i, data) => {
    return {
        provinciaId: data.province.id
    }
});

Factory.blueprint('App/Models/Subscription', async (faker, i, data) => {
    const provinciaId = faker.integer({min: 1, max: 15});
    const homeTypes = (await HomeType.all()).toJSON();
    const municipios = (
        await Municipio
            .query()
            .where('provinciaId', provinciaId)
            .fetch()
    ).toJSON();

    const municipioIndex = faker.integer({min: 3, max: municipios.length - 1});
    const firstIndex = faker.integer({min: 0, max: 2});
    const secondIndex = faker.integer({min: 3, max: 4});

    return {
        provinciaId: provinciaId,
        municipios: [
            {
                id: municipios[municipioIndex - 1].id,
                title: municipios[municipioIndex - 1].title
            }, {
                id: municipios[municipioIndex].id,
                title: municipios[municipioIndex].title
            }
        ],
        homeTypes: [
            {
                id: homeTypes[firstIndex].id,
                title: homeTypes[firstIndex].title
            }, {
                id: homeTypes[secondIndex].id,
                title: homeTypes[secondIndex].title
            }
        ],
        minPrice: {
            value: faker.integer({min: 8000, max: 20000}),
            currency: 'USD'
        },
        maxPrice: {
            value: faker.integer({min: 20001, max: 90000}),
            currency: 'USD'
        },
        bedrooms: faker.integer({min: 1, max: 5}),
        bathrooms: faker.integer({min: 1, max: 3}),
    }
});
