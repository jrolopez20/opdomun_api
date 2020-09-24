'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class NomSegCiudadana extends Model {

    static async getPostSegCiudadana(postId) {
        const segCiudadana = Database
            .select(
                'post_variables.result',
                'nom_seg_ciudadanas.title'
            )
            .from('post_variables')
            .innerJoin('variables', 'variables.id', 'post_variables.variable_id')
            .innerJoin('nom_seg_ciudadanas', 'nom_seg_ciudadanas.value', 'post_variables.result')
            .where('post_variables.post_id', postId)
            .andWhere('variables.cod', 'Sc')
            .first()

        return segCiudadana;
    }
}

module.exports = NomSegCiudadana
