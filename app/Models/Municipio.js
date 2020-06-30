'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Municipio extends Model {

    static async getMunicipios(provinciaId, page = 1, limit = 20, filter) {
        let query = this.query()
            .where('provincia_id', provinciaId);

        if (filter) {
            const where = "(title like '%" + filter + "%') AND true = ?";
            query.whereRaw(where, [true]);
        }

        const municipios = await query.paginate(page, limit);
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
