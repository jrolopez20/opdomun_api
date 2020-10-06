'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class EnvElement extends Model {

    static async getEnvElements(postId) {
        return await Database.select('ee.id', '.ee.value', 'ee.title')
            .from('env_elements as ee')
            .innerJoin('post_variables as pv', 'pv.id', 'ee.post_variable_id')
            .where('pv.post_id', postId)
    }

    static async removeEnvElement(postVariableId) {
        await EnvElement
            .query()
            .where('postVariableId', postVariableId)
            .delete()
    }

    postVariable() {
        return this.belongsTo('App/Models/PostVariable');
    }
}

module.exports = EnvElement
