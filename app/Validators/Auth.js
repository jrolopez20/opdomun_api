'use strict'

class Auth {
    get rules() {
        return {
            email: 'required|email',
            password: 'required',
            entry_point: 'required'
        }
    }

    get messages() {
        return {
            'email.required': 'You must provide an email address.',
            'email.email': 'You must provide a valid email address.',
            'password.required': 'You must provide a password',
            'entry_point.required': 'You must provide a valid entry point'
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = Auth;
