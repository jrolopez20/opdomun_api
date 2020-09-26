'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class HomeType extends Model {

    static castDates(field, value) {
        return value;
    }

    static async getHomeTypes() {
        return await Database.select('id', 'title', 'value').from('home_types')
    }

    posts() {
        return this.hasMany('App/Models/Post')
    }
}

module.exports = HomeType
