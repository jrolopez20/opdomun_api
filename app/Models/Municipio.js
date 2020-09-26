'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Municipio extends Model {

    static get hidden() {
        return ['created_at', 'updated_at'];
    }

    static async getMunicipios(provinciaId) {
        const municipios = await Municipio
            .query()
            .setVisible(['id', 'title', 'prosp_urbana'])
            .where('provincia_id', provinciaId)
            .fetch();

        return municipios;
    }

    provincia() {
        return this.belongsTo('App/Models/Provincia');
    }

    posts() {
        return this.hasMany('App/Models/Post')
    }
}

module.exports = Municipio
