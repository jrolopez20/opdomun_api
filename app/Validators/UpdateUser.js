'use strict'

class UpdateUser {
    get rules() {
        const userId = this.ctx.params.id;

        return {
            fullname: 'required',
            // email: `required|unique:users,email,id,${userId}`,
        }
    }

    get messages() {
        return {
            'fullname.required': 'You must provide a fullname'
            // 'email.required': 'You must provide an email address.',
            // 'email.email': 'You must provide a valid email address.',
            // 'email.unique': 'The provided email already exists.',
        }
    }

    get validateAll() {
        return true
    }

}

module.exports = UpdateUser;
