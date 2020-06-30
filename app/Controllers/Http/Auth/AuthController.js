'use strict'

const User = use('App/Models/User');
const {validate} = use('Validator');

class AuthController {

    async login({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                let accessToken = await auth.generate(user)
                return response.json({"user": user, "access_token": accessToken})
            }
        } catch (e) {
            return response.status(401).json({message: 'Invalid login attemp!'})
        }

    }

}

module.exports = AuthController
