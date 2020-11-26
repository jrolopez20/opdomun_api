'use strict'

const Model = use('Model')

class Municipio extends Model {

    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    static async getMunicipios(provinciaId) {
        const municipios = await Municipio
            .query()
            .setVisible(['id', 'title', 'prospUrbana'])
            .with('provincia')
            .with('locationCategory')
            .where('provincia_id', provinciaId)
            .fetch();

        return municipios;
    }

    provincia() {
        return this.belongsTo('App/Models/Provincia', 'provinciaId', 'id');
    }

    localidads() {
        return this.hasMany('App/Models/Localidad', 'id', 'municipioId')
    }

    locationCategory() {
        return this.belongsTo('App/Models/LocationCategory', 'locationCategoryId', 'id');
    }
}

module.exports = Municipio
