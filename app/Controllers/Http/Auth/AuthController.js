'use strict'

const User = use('App/Models/User');
const UserService = use('App/Services/UserService');

class AuthController {

    async login({request, auth, response}) {
        const email = request.input("email")
        let password = request.input("password");
        try {
            if (await auth.attempt(email, password)) {
                const user = await User.findBy('email', email);
                const accessToken = await auth.generate(user);
                return response.json({...accessToken})
            }
        } catch (e) {
            return response.status(400).json({message: 'Invalid login attemp!'})
        }
    }

    async register({request, response}) {
        const user = await UserService.addUser(request);
        return response.status(201).json(user)
    }

    async changePassword({request, auth, response}) {
        try {
            const user = await auth.getUser();
            await UserService.changePassword(user.id, request.input('password'));
            return response.json('Su contraseña ha sido actualizada');
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }


}

module.exports = AuthController;
