'use strict'

const Model = use('Model')

class Owner extends Model {

    static boot() {
        super.boot()
        this.addTrait('CastDate')
    }

    static get hidden() {
        return ['createdAt', 'updatedAt', 'postId', 'subscriptionId', 'userId'];
    }

    setAdditionalInfo(additionalInfo) {
        return JSON.stringify(additionalInfo)
    }

    post() {
        return this.belongsTo('App/Models/Post')
    }

    subscription() {
        return this.belongsTo('App/Models/Subscription')
    }

    user() {
        return this.belongsTo('App/Models/User', 'userId', 'id')
    }

    static async addOwner({postId, userId, fullname, telephone, email, additionalInfo}) {
        const owner = new Owner();
        owner.postId = postId;
        owner.userId = userId;
        owner.fullname = fullname;
        owner.telephone = telephone;
        owner.email = email;
        if (additionalInfo) {
            owner.additionalInfo = additionalInfo;
        }
        await owner.save();

        return owner;
    }
}

module.exports = Owner
