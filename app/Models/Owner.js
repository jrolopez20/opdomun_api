'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Owner extends Model {

    static boot() {
        super.boot()
        this.addTrait('CastDate')
    }

    post() {
        return this.belongsTo('App/Models/Post')
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    static async addOwner({postId, userId, fullname, telephone, email}) {
        const owner = new Owner();
        owner.post_id = postId;
        owner.user_id = userId;
        owner.fullname = fullname;
        owner.telephone = telephone;
        owner.email = email;
        await owner.save();

        return owner;
    }
}

module.exports = Owner;
