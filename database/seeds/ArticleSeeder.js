'use strict'

/*
|--------------------------------------------------------------------------
| ArticleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class ArticleSeeder {
    async run() {
        const admin = await User.findBy('role', User.roles().ADMIN);

        const articles = await Factory.model('App/Models/Article')
            .makeMany(10)

        await admin.articles()
            .saveMany(articles);
    }
}

module.exports = ArticleSeeder
