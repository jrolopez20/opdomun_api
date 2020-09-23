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
        email: faker.email(),
        password: await Hash.make('123456'),
        role: data.role || User.roles().USER,
        fullname: faker.name(),
        numid: faker.integer({min: 60000000000, max: 99999999999}),
        telephone: faker.phone({formatted: false}),
        office_id: data.office ? data.office.id : null,
    }
});
