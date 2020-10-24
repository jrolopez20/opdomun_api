'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LocationCategory extends Model {
    benchmarkPrices() {
        return this.hasMany('App/Models/BenchmarkPrice', 'id', 'locationCategoryId')
    }
}

module.exports = LocationCategory
