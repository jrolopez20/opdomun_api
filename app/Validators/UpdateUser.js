'use strict'

class UpdateUser {
    get rules() {
        const userId = this.ctx.params.id;

        return {
            numid: 'required',
            fullname: 'required',
            email: `required|unique:users,email,id,${userId}`,
            telephone: 'required',
        }
    }

    get messages() {
        return {
            'numid.required': 'You must provide a numid',
            'fullname.required': 'You must provide a fullname',
            'email.required': 'You must provide an email address.',
            'email.email': 'You must provide a valid email address.',
            'email.unique': 'The provided email already exists.',
            'telephone.required': 'You must provide a telephone'
        }
    }

    get validateAll() {
        return true
    }

}

module.exports = UpdateUser;
