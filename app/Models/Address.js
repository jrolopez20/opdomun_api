'use strict'

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
    getCoordinates(coordinates) {
        return coordinates ? {
            longitude: coordinates.x,
            latitude: coordinates.y
        } : null
    }

    /**
     * Coordinates setter
     * @param coordinates
     * @returns {string}
     */
    setCoordinates(coordinates) {
        return coordinates ? `${coordinates.longitude}, ${coordinates.latitude}` : null
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

module.exports = Address;
