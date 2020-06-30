'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserProvincia extends Model {

    user() {
        return this.belongsTo('App/Models/User');
    }

    provincia() {
        return this.belongsTo('App/Models/Provincia');
    }
}

module.exports = UserProvincia
