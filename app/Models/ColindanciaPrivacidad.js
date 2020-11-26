'use strict'

const Model = use('Model')

class ColindanciaPrivacidad extends Model {

    static async removeColindanciaPrivacidad(postVariableId) {
        await ColindanciaPrivacidad
            .query()
            .where('postVariableId', postVariableId)
            .delete()
    }

    postVariable() {
        return this.belongsTo('App/Models/PostVariable');
    }
}

module.exports = ColindanciaPrivacidad;
