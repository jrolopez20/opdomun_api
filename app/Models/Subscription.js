'use strict'

const Database = use('Database')
const Model = use('Model')

class Subscription extends Model {
    static boot() {
        super.boot()
    }

    static async getSubscriptions(page = 1, limit = 20, filter) {
        const query = Subscription
            .query()
            .with('provincia');

        if (filter) {
            let where = "(fullname like '%" + filter + "%') OR (email like '%" + filter + "%') OR (telephone like '%" + filter + "%')";
            where = where + " AND true = ?";
            query.whereRaw(where, [true])
        }

        const subscriptions = await query.paginate(page, limit);
        return subscriptions;
    }

    static async getSubscription(id) {
        let query = Subscription
            .query()
            .with('provincia')
            .where('id', id);

        const subscription = await query.first();

        const municipios = await Database
            .from('municipios')
            .whereRaw(`id in (${subscription.municipio})`);

        const homeTypes = await Database
            .from('home_types')
            .whereRaw(`id in (${subscription.home_type})`);

        subscription.municipios = municipios
        subscription.home_types = homeTypes

        return subscription;
    }

    static async getTotalSubscriptions(startAt, endAt) {
        const query = Subscription
            .query()
            .where('created_at', '>=', startAt)
            .where('created_at', '<=', endAt)
            .getCount()

        return await query;
    }

    provincia() {
        return this.belongsTo('App/Models/Provincia');
    }
}

module.exports = Subscription
