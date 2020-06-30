'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Provincia extends Model {

    static async getProvincias() {
        return await Database.select('id', 'title', 'cod').from('provincias')
    }

    municipios() {
        return this.hasMany('App/Models/Municipio')
    }

    userProvincias() {
        return this.hasMany('App/Models/UserProvincia')
    }
}

module.exports = Provincia
