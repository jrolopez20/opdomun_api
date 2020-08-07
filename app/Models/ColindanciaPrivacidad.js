'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ColindanciaPrivacidad extends Model {

    static async removeColindanciaPrivacidad(postVariableId) {
        await ColindanciaPrivacidad
            .query()
            .where('post_variable_id', postVariableId)
            .delete()
    }

    postVariable() {
        return this.belongsTo('App/Models/PostVariable');
    }
}

module.exports = ColindanciaPrivacidad;
