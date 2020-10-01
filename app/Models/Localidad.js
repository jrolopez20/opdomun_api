'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Localidad extends Model {

    static get hidden() {
        return ['created_at', 'updated_at'];
    }

    static async getLocalidades(municipioId) {
        const localidades = await Localidad
            .query()
            .setVisible(['id', 'title'])
            .where('municipio_id', municipioId)
            .fetch();

        return localidades;
    }

    municipio() {
        return this.belongsTo('App/Models/Municipio');
    }

    addresses() {
        return this.hasMany('App/Models/Address')
    }
}

module.exports = Localidad
