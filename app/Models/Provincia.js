'use strict'

const Model = use('Model')

class Provincia extends Model {

    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    static async getProvincias() {
        const provincias = await Provincia.query().fetch();

        return provincias;
    }

    municipios() {
        return this.hasMany('App/Models/Municipio', 'id', 'provinciaId')
    }

    office() {
        return this.hasOne('App/Models/Office', 'id', 'provinciaId')
    }
}

module.exports = Provincia
