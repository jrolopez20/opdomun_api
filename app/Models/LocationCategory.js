'use strict'

const Model = use('Model')

class LocationCategory extends Model {

    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    static async getLocationCategories() {
        const locationCategories = await LocationCategory
            .query()
            .fetch();

        return locationCategories;
    }

    benchmarkPrices() {
        return this.hasMany('App/Models/BenchmarkPrice', 'id', 'locationCategoryId')
    }

    localidads() {
        return this.hasMany('App/Models/Localidad', 'id', 'locationCategoryId')
    }
}

module.exports = LocationCategory
