'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Variable extends Model {

    static async getVariables() {
        return await Variable.query().fetch();
    }

    postVariables() {
        return this.hasMany('App/Models/PostVariable', 'id', 'variableId')
    }
}

module.exports = Variable
