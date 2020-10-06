'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class InfUrbana extends Model {

    static async getInfUrbana(postId) {
        return await Database.select('iu.id', '.iu.value', 'iu.title')
            .from('inf_urbanas as iu')
            .innerJoin('post_variables as pv', 'pv.id', 'iu.post_variable_id')
            .where('pv.post_id', postId)
    }

    static async removeInfUrbana(postVariableId) {
        await InfUrbana
            .query()
            .where('postVariableId', postVariableId)
            .delete()
    }

    postVariable() {
        return this.belongsTo('App/Models/PostVariable', 'postVariableId', 'id');
    }
}

module.exports = InfUrbana
