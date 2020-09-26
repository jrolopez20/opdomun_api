'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Provincia extends Model {

    static get hidden() {
        return ['created_at', 'updated_at'];
    }

    static async getProvincias() {
        const provincias = Provincia.query().fetch();

        return provincias;
    }

    municipios() {
        return this.hasMany('App/Models/Municipio')
    }

    office() {
        return this.hasOne('App/Models/Office')
    }
}

module.exports = Provincia
