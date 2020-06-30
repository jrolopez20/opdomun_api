'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class HomeType extends Model {
    static boot() {
        super.boot()
    }

    static async getHomeTypes() {
        return await Database.select('id', 'title').from('home_types')
    }

    posts() {
        return this.hasMany('App/Models/Post')
    }
}

module.exports = HomeType
