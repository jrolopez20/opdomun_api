'use strict'

const Model = use('Model')

class VarDisenoEstetica extends Model {

    post() {
        return this.belongsTo('App/Models/Post', 'postId', 'id');
    }

}

module.exports = VarDisenoEstetica
