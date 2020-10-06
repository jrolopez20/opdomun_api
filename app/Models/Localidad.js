'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Localidad extends Model {

    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    static async getLocalidades(municipioId) {
        const localidades = await Localidad
            .query()
            .setVisible(['id', 'title'])
            .where('municipioId', municipioId)
            .fetch();

        return localidades;
    }

    municipio() {
        return this.belongsTo('App/Models/Municipio', 'municipioId', 'id');
    }

    addresses() {
        return this.hasMany('App/Models/Address', 'id', 'localidadId')
    }
}

module.exports = Localidad
