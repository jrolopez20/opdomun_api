'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class NomMoviliario extends Model {
    static boot() {
        super.boot()
    }

    menajeMoviliario() {
        return this.hasMany('App/Models/MenajeMoviliario');
    }

}

module.exports = NomMoviliario
