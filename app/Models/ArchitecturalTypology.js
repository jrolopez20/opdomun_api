'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ArchitecturalTypology extends Model {
    benchmarkPrices() {
        return this.hasMany('App/Models/BenchmarkPrice', 'id', 'architecturalTypologyId')
    }
}

module.exports = ArchitecturalTypology
