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

    municipios() {
        return this.hasMany('App/Models/Municipio', 'id', 'locationCategoryId')
    }
}

module.exports = LocationCategory
