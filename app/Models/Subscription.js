'use strict'

const Database = use('Database')
const Model = use('Model')
const CurrencyService = use('App/Services/CurrencyService')
const User = use('App/Models/User')

class Subscription extends Model {

    static boot() {
        super.boot()
        this.addTrait('CastDate')
    }

    setMunicipios (municipios) {
        return JSON.stringify(municipios)
    }

    setHomeTypes (homeTypes) {
        return JSON.stringify(homeTypes)
    }

    getMinPrice(price) {
        return {
            value: CurrencyService.transform(price, CurrencyService.BASE_CURRENCY(), CurrencyService.DEFAULT_CURRENCY()),
            currency: CurrencyService.DEFAULT_CURRENCY(),
        }
    }

    setMinPrice(price) {
        return price ? CurrencyService.transform(price.value, price.currency, CurrencyService.BASE_CURRENCY()) : null;
    }

    getMaxPrice(price) {
        return {
            value: CurrencyService.transform(price, CurrencyService.BASE_CURRENCY(), CurrencyService.DEFAULT_CURRENCY()),
            currency: CurrencyService.DEFAULT_CURRENCY(),
        }
    }

    setMaxPrice(price) {
        return price ? CurrencyService.transform(price.value, price.currency, CurrencyService.BASE_CURRENCY()) : null;
    }

    static async getSubscriptions(auth, page = 1, limit = 20, filter) {
        const query = Subscription
            .query()
            .with('provincia')
            .with('user');

        if (auth.user.role !== User.roles().ADMIN) {
            query.where('userId', auth.user.id);
        }

        if (filter) {
            if (filter.provincia) {
                query.andWhere('provinciaId', filter.provincia)
            }
            if (filter.municipio) {
                query.whereRaw('municipios @> ?', `[{"id":${filter.municipio}}]`);
            }
            if (filter.homeType) {
                query.whereRaw('home_types @> ?', `[{"id":${filter.homeType}}]`);
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

    static async getPublishedSubscriptions(page = 1, limit = 20, filter) {
        const query = Subscription
            .query()
            .with('provincia')
            .with('user');

        if (filter) {
            if (filter.provincia) {
                query.andWhere('provinciaId', filter.provincia)
            }
            if (filter.municipio) {
                query.whereRaw('municipios @> ?', `[{"id":${filter.municipio}}]`);
            }
            if (filter.homeType) {
                query.whereRaw('home_types @> ?', `[{"id":${filter.homeType}}]`);
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
                'subscriptions.id', 'users.email', 'users.telephone', 'users.fullname', 'subscriptions.municipios'
            )
            .innerJoin('users', 'users.id', 'subscriptions.user_id');

        if (provinciaId) {
            subscriptions.where('provincia_id', provinciaId);
        }

        if (municipioId) {
            subscriptions.whereRaw(`${municipioId} = ANY (regexp_split_to_array(municipios, ',')::int[])`);
        }

        if (price) {
            subscriptions.andWhere('min_price', '<=', price);
            subscriptions.andWhere('max_price', '>=', price);
        }

        if (homeType) {
            subscriptions.whereRaw(`${homeType} = ANY (regexp_split_to_array(home_types, ',')::int[])`);
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
