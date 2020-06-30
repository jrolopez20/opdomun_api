'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class NomElectrodomestico extends Model {
    static boot() {
        super.boot()
    }

    menajeElectrodomestico() {
        return this.hasMany('App/Models/MenajeElectrodomestico');
    }
}

module.exports = NomElectrodomestico
