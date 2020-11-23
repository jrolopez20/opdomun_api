'use strict'

class ResetPassword {
    get rules() {
        return {
            newPassword: 'required',
        }
    }

    get messages() {
        return {
            'newPassword.required': 'You must provide a new password'
        }
    }

    get validateAll() {
        return true
    }

}

module.exports = ResetPassword;
