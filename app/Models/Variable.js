'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Variable extends Model {

    postVariables() {
        return this.hasMany('App/Models/PostVariable')
    }
}

module.exports = Variable
