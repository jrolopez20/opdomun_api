'use strict'

const Model = use('Model')

class Localidad extends Model {

    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    static async getLocalidades(municipioId) {
        const localidades = await Localidad
            .query()
            .setVisible(['id', 'title'])
            .with('locationCategory')
            .with('municipio.provincia')
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

    locationCategory() {
        return this.belongsTo('App/Models/LocationCategory', 'locationCategoryId', 'id');
    }
}

module.exports = Localidad
