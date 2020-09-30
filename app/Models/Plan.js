'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Plan extends Model {
    static get hidden() {
        return ['created_at', 'updated_at'];
    }

    static TYPES() {
        return {
            PREMIUM: 'PREMIUM',
            FREE: 'FREE'
        }
    }

    posts() {
        return this.hasMany('App/Models/Post')
    }
}

module.exports = Plan
