'use strict'

const Database = use('Database')
const Model = use('Model')

class Subscription extends Model {

    static boot() {
        super.boot()
        this.addTrait('CastDate')
    }

    static async getSubscriptions(page = 1, limit = 20, filter) {
        const query = Subscription
            .query()
            .with('provincia');

        if (filter) {
            if (filter.provincia) {
                query.andWhere('provincia_id', filter.provincia)
            }
            if (filter.municipio) {
                query.whereRaw(`FIND_IN_SET(${filter.municipio}, municipio)`);
            }
            if (filter.homeType) {
                query.whereRaw(`FIND_IN_SET(${filter.homeType}, home_type)`);
            }
            if (filter.bedrooms) {
                query.andWhere('bedrooms', filter.bedrooms);
            }
            if (filter.bathrooms) {
                query.andWhere('bathrooms', filter.bathrooms);
            }
            if (filter.minPrice) {
                query.andWhere('min_price', '>=', filter.minPrice);
            }
            if (filter.maxPrice) {
                query.andWhere('max_price', '<=', filter.maxPrice);
            }
        }

        const subscriptions = await query.paginate(page, limit);
        return subscriptions.toJSON();
    }

    static async getMatchedSubscriptions({provinciaId, municipioId, price, homeType, bedrooms, bathrooms}) {
        const subscriptions = Database
            .from('subscriptions')
            .select(
                'id', 'email', 'telephone', 'fullname', 'subscriptions.municipio'
            );

        if (provinciaId) {
            subscriptions.where('provincia_id', provinciaId);
        }

        if (municipioId) {
            subscriptions.whereRaw(`FIND_IN_SET(${municipioId}, municipio)`);
        }

        if (price) {
            subscriptions.andWhere('min_price', '<=', price);
            subscriptions.andWhere('max_price', '>=', price);
        }

        if (homeType) {
            subscriptions.whereRaw(`FIND_IN_SET(${homeType}, home_type)`);
        }

        return await subscriptions;
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

    user() {
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Subscription
