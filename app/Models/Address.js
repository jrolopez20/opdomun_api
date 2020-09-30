'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {

    static get hidden() {
        return ['created_at', 'updated_at'];
    }

    localidad() {
        return this.belongsTo('App/Models/Localidad');
    }

    post() {
        return this.hasOne('App/Models/Post')
    }

    user() {
        return this.hasOne('App/Models/User')
    }
}

module.exports = Municipio
