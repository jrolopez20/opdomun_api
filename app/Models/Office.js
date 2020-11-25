'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Office extends Model {

    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    static async getOffices (page, limit) {
        const query = Office
            .query()
            .with('provincia')
            .with('users', (builder) => {
                builder.where('role', 'MANAGER')
            });

        const offices = await query.paginate(page, limit);
        return offices.toJSON();
    }

    static async getOffice (id) {
        const office = await Office
            .query()
            .with('provincia')
            .with('users', (builder) => {
                builder.orderBy('role', 'DESC')
            })
            .where('id', id)
            .firstOrFail();

        return office.toJSON();
    }

    provincia() {
        return this.belongsTo('App/Models/Provincia', 'provinciaId', 'id');
    }

    users() {
        return this.hasMany('App/Models/User', 'id', 'officeId')
    }
}

module.exports = Office
