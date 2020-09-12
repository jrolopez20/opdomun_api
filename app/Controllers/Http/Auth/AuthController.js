'use strict'

const User = use('App/Models/User');
const EntryPointAccesService = use('App/Services/EntryPointAccesService');

class AuthController {

    async login({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        const entryPoint = request.input("entry_point");
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email);
                const allowAccess = EntryPointAccesService.checkEntryPointAccess(user, entryPoint);
                if(allowAccess) {
                    let accessToken = await auth.generate(user);
                    return response.json({"user": user, "access_token": accessToken})
                }
            }

            return response.status(401).json({message: 'Invalid login attemp!'})
        } catch (e) {
            return response.status(401).json({message: e.message})
        }
    }

}

module.exports = AuthController;
