'use strict'

const User = use('App/Models/User');

class AuthController {

    async login({request, auth, response}) {
        const email = request.input("email")
        let password = request.input("password");
        try {
            if (await auth.attempt(email, password)) {
                const {password, ...user} = (await User.findBy('email', email)).toJSON();
                const accessToken = await auth.generate(user);
                return response.json({user, 'access_token': accessToken})
            }

            return response.status(401).json({message: 'Invalid login attemp!'})
        } catch (e) {
            return response.status(401).json({message: e.message})
        }
    }

}

module.exports = AuthController;
