'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Municipio extends Model {
	
	provincia() {
        return this.belongsTo('App/Models/Provincia');
    }

    posts() {
        return this.hasMany('App/Models/Post')
    }
}

module.exports = Municipio
