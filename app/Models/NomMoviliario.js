'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class NomMoviliario extends Model {

    menajeMoviliario() {
        return this.hasMany('App/Models/MenajeMoviliario', 'id', 'moviliarioId');
    }

}

module.exports = NomMoviliario
