'use strict'

const Database = use('Database')
const Model = use('Model')

class Subscription extends Model {

    static boot() {
        super.boot()
        this.addTrait('CastDate')
    }

    setMunicipio (municipio) {
        return JSON.stringify(municipio)
    }

    setHomeType (homeType) {
        return JSON.stringify(homeType)
    }

    static async getSubscriptions(page = 1, limit = 20, filter) {
        const query = Subscription
            .query()
            .with('provincia');

        if (filter) {
            if (filter.provincia) {
                query.andWhere('provinciaId', filter.provincia)
            }
            if (filter.municipio) {
                query.whereRaw(`${filter.municipio} = ANY (regexp_split_to_array(municipio, ',')::int[])`);
            }
            if (filter.homeType) {
                query.whereRaw(`${filter.homeType} = ANY (regexp_split_to_array(home_type, ',')::int[])`);
            }
            if (filter.bedrooms) {
                query.andWhere('bedrooms', filter.bedrooms);
            }
            if (filter.bathrooms) {
                query.andWhere('bathrooms', filter.bathrooms);
            }
            if (filter.minPrice) {
                query.andWhere('minPrice', '>=', filter.minPrice);
            }
            if (filter.maxPrice) {
                query.andWhere('maxPrice', '<=', filter.maxPrice);
            }
        }

        const subscriptions = await query.paginate(page, limit);
        return subscriptions.toJSON();
    }

    static async getMatchedSubscriptions({provinciaId, municipioId, price, homeType, bedrooms, bathrooms}) {
        const subscriptions = Database
            .from('subscriptions')
            .select(
                'subscriptions.id', 'users.email', 'users.telephone', 'users.fullname', 'subscriptions.municipio'
            )
            .innerJoin('users', 'users.id', 'subscriptions.user_id');

        if (provinciaId) {
            subscriptions.where('provincia_id', provinciaId);
        }

        if (municipioId) {
            subscriptions.whereRaw(`${municipioId} = ANY (regexp_split_to_array(municipio, ',')::int[])`);
        }

        if (price) {
            subscriptions.andWhere('min_price', '<=', price);
            subscriptions.andWhere('max_price', '>=', price);
        }

        if (homeType) {
            subscriptions.whereRaw(`${homeType} = ANY (regexp_split_to_array(home_type, ',')::int[])`);
        }

        return await subscriptions;
    }

    static async getSubscription(id) {
        let query = Subscription
            .query()
            .with('provincia')
            .where('id', id);

        const subscription = await query.firstOrFail();

        return subscription;
    }

    static async getTotalSubscriptions(startAt, endAt) {
        const query = Subscription
            .query()
            .where('createdAt', '>=', startAt)
            .where('createdAt', '<=', endAt)
            .getCount()
        const r = await query
        return r || 0;
    }

    provincia() {
        return this.belongsTo('App/Models/Provincia', 'provinciaId', 'id');
    }

    user() {
        return this.belongsTo('App/Models/User', 'userId', 'id');
    }
}

module.exports = Subscription
