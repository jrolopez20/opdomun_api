'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class PostPlace extends Model {

    static async getPostPLaces(id) {
        return await Database.select('id', 'title').from('post_places').where('post_id', id)
    }

    post() {
        return this.belongsTo('App/Models/Post');
    }
}

module.exports = PostPlace
