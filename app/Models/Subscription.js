'use strict'

const Database = use('Database')
const Model = use('Model')
const CurrencyService = use('App/Services/CurrencyService')
const User = use('App/Models/User')

class Subscription extends Model {

    static boot() {
        super.boot()
        this.addTrait('@provider:SerializerExtender')
        this.addTrait('CastDate')
        this.addTrait('Auth')
    }

    static get Serializer() {
        return 'App/Models/Serializers/SubscriptionSerializer'
    }

    static get hidden() {
        return ['createdAt', 'updatedAt', 'provinciaId', 'userId'];
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
            .with('owner')
            .with('user');

        if (auth.user.role !== User.roles().ADMIN) {
            query.where('userId', auth.user.id);
        }

        if (filter) {
            if (filter.provinciaId) {
                query.andWhere('provinciaId', filter.provinciaId)
            }
            if (filter.municipioId) {
                query.whereRaw('municipios @> ?', `[{"id":${filter.municipioId}}]`);
            }
            if (filter.homeTypeId) {
                query.whereRaw('home_types @> ?', `[{"id":${filter.homeTypeId}}]`);
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
        return subscriptions.toJSON(auth.user)
    }

    static async getPublishedSubscriptions(page = 1, limit = 20, filter, auth) {
        const query = Subscription
            .query()
            .with('provincia')
            .with('owner')
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

        const subscriptions = await query.paginate(page, limit)

        const user = await this.authUser(auth)
        return subscriptions.toJSON(user ? user.toJSON() : null)
    }

    static async getMatchedSubscriptions({provinciaId, municipioId, homeTypeId, price, bedrooms, bathrooms}) {
        const query = Subscription
            .query()
            .with('provincia')
            .with('user')
            .fetch();

        if (auth.user.role !== User.roles().ADMIN) {
            query.where('userId', auth.user.id);
        }

        if (provinciaId) {
            query.andWhere('provinciaId', provinciaId)
        }
        if (municipioId) {
            query.whereRaw('municipios @> ?', `[{"id":${municipioId}}]`);
        }
        if (homeTypeId) {
            query.whereRaw('home_types @> ?', `[{"id":${homeTypeId}}]`);
        }
        if (bedrooms) {
            query.andWhere('bedrooms', bedrooms);
        }
        if (bathrooms) {
            query.andWhere('bathrooms', bathrooms);
        }
        if (price) {
            query.where('minPrice', '<=', price);
            query.where('maxPrice', '>=', price);
        }

        const subscriptions = await query;
        return subscriptions.toJSON();
    }

    static async getSubscription(id) {
        let query = Subscription
            .query()
            .with('provincia')
            .with('owner')
            .with('user')
            .where('id', id);

        return await query.firstOrFail();
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

    owner() {
        return this.hasOne('App/Models/Owner', 'id', 'subscriptionId')
    }
}

module.exports = Subscription
