'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ArchitecturalTypology extends Model {

    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    static async getArchitecturalTypologies() {
        const architecturalTypologies = await ArchitecturalTypology
            .query()
            .fetch();

        return architecturalTypologies;
    }

    benchmarkPrices() {
        return this.hasMany('App/Models/BenchmarkPrice', 'id', 'architecturalTypologyId')
    }
}

module.exports = ArchitecturalTypology
