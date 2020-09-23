'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Provincia extends Model {

    static async getProvincias(page = 1, limit = 20, filter) {
        let query = this.query();
        if (filter) {
            const where = "(title like '%" + filter + "%') AND true = ?";
            query.whereRaw(where, [true]);
        }

        const provincias = await query.paginate(page, limit);
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
