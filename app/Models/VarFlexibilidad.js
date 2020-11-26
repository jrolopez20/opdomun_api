'use strict'

const Model = use('Model')

class VarFlexibilidad extends Model {

    post() {
        return this.belongsTo('App/Models/Post', 'postId', 'id');
    }

}

module.exports = VarFlexibilidad
