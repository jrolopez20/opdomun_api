'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {

    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    /**
     * Coordinates getter
     *
     * @param coordinates
     * @returns {{latitude: number, longitude: number}}
     */
    getCoordinates (coordinates) {
        return {
            longitude: coordinates.x,
            latitude: coordinates.y
        }
    }

    localidad() {
        return this.belongsTo('App/Models/Localidad', 'localidadId', 'id');
    }

    post() {
        return this.hasOne('App/Models/Post', 'id', 'addressId')
    }

    user() {
        return this.hasOne('App/Models/User', 'id', 'addressId')
    }
}

module.exports = Address
