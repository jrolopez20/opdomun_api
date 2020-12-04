'use strict'

class Auth {
    register(Model, customOptions = {}) {
        Model.authUser = async function (auth) {
            try {
                return await auth.getUser();
            } catch (e) {
                return null
            }
        }
    }
}

module.exports = Auth
