'use strict'

class StoreUser {
    get rules() {
        return {
            fullname: 'required',
            email: 'required|email',
            telephone: 'required',
            password: 'required',
            repassword: 'required'
        }
    }

    get messages() {
        return {
            'fullname.required': 'You must provide a fullname',
            'email.required': 'You must provide an email address.',
            'email.email': 'You must provide a valid email address.',
            'telephone.required': 'You must provide a telephone',
            'password.required': 'You must provide a password',
            'repassword.required': 'You must provide a repassword',
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = StoreUser
