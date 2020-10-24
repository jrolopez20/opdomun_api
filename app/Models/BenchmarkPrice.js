'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BenchmarkPrice extends Model {

    locationCategory() {
        return this.belongsTo('App/Models/LocationCategory', 'locationCategoryId', 'id');
    }

    architecturalTypology() {
        return this.belongsTo('App/Models/ArchitecturalTypology', 'architecturalTypologyId', 'id');
    }
}

module.exports = BenchmarkPrice
