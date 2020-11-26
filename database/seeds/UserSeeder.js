'use strict'

const Factory = use('Factory')
const User = use('App/Models/User')
const Office = use('App/Models/Office')

class UserSeeder {

    async run() {
        // Remove existing users
        await User.query().delete();

        // Create ADMIN user
        const admin = await Factory.model('App/Models/User')
            .create({email: 'admin@opdomun.com', role: User.roles().ADMIN})

        const offices = await Office.all();
        for (const office of offices.toJSON()) {
            // Create one manager per each office
            const manager = await Factory.model('App/Models/User')
                .create({role: User.roles().MANAGER, office})

            // Create three agents per each office
            const agents = await Factory.model('App/Models/User')
                .createMany(3, {role: User.roles().AGENT, office})
        }

        // Create Users
        const users = await Factory.model('App/Models/User')
            .createMany(40)
    }
}

module.exports = UserSeeder;
