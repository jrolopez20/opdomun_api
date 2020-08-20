'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Office extends Model {

    static async getOffices (page, limit) {
        const query = Office
            .query()
            .with('provincia')
            .with('users', (builder) => {
                builder.where('role', 'MANAGER')
            });

        const offices = await query.paginate(page, limit);
        return offices;
    }

    provincia() {
        return this.belongsTo('App/Models/Provincia');
    }

    users() {
        return this.hasMany('App/Models/User')
    }
}

module.exports = Office
