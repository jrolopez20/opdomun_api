'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class EstConstructiva extends Model {

    static async getEstConstructiva(postId) {
        return await Database.select('e.id', 'e.display_value', 'e.title')
            .from('est_constructivas as e')
            .innerJoin('post_variables as pv', 'pv.id', 'e.post_variable_id')
            .where('pv.post_id', postId)
    }

    static async removeEstConstructiva(postVariableId) {
        await EstConstructiva
            .query()
            .where('post_variable_id', postVariableId)
            .delete()
    }

    postVariable() {
        return this.belongsTo('App/Models/PostVariable');
    }
}

module.exports = EstConstructiva
