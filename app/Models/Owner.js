'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Owner extends Model {
    static boot() {
        super.boot()
    }

    post() {
        return this.belongsTo('App/Models/Post')
    }

    static async addOwner({postId, fullname, phone, email}) {
        const owner = new Owner();
        owner.post_id = postId;
        owner.fullname = fullname;
        owner.phone = phone;
        owner.email = email;
        await owner.save();

        return owner;
    }
}

module.exports = Owner
