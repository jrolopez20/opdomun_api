'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class ServPublico extends Model {
    static async getServPublicos(postId) {
        return await Database.select('s.id', 's.value', 's.display_value', 's.title')
            .from('serv_publicos as s')
            .innerJoin('post_variables as pv', 'pv.id', 's.post_variable_id')
            .where('pv.post_id', postId)
    }

    static async removeServPublicos(postVariableId) {
        await ServPublico
            .query()
            .where('post_variable_id', postVariableId)
            .delete()
    }
}

module.exports = ServPublico
