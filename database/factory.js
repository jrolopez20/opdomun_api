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

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const Office = use('App/Models/Office')
const HomeType = use('App/Models/HomeType')
const Localidad = use('App/Models/Localidad')
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
        fullname: faker.name(),
        numid: faker.integer({min: 60000000000, max: 99999999999}),
        telephone: faker.phone({formatted: false}),
        officeId: data.office ? data.office.id : null
    }
});

Factory.blueprint('App/Models/Post', async (faker, i, data) => {
    const homeTypes = (await HomeType.all()).toJSON();
    const localidades = (await Localidad.all()).toJSON();
    if (!homeTypes.length || !localidades.length) {
        throw Error('Be sure to execute database initialization script before run this seed.')
    }
    return {
        planId: data.planId || null,
        price: {
            value: faker.integer({min: 7000, max: 80000}),
            currency: 'USD'
        },
        area: faker.integer({min: 90, max: 199}),
        homeTypeId: homeTypes[faker.integer({min: 0, max: 5})].id,
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
            localidadId: localidades[faker.integer({min: 10, max: 600})].id,
            description: faker.address(),
            coordinates: faker.coordinates()
        },
        owner: {
            fullname: faker.name(),
            email: faker.email(),
            telephone: faker.phone({formatted: false})
        }
    }
});

Factory.blueprint('App/Models/Office', async (faker, i, data) => {
    return {
        provinciaId: data.province.id
    }
});
