'use strict'

const User = use('App/Models/User');
const UserService = use('App/Services/UserService');
const MailNotification = use('App/Notifications/MailNotification');
const Encryption = use('Encryption');
const BadRequestException = use('App/Exceptions/BadRequestException');
const crypto = use('App/Exceptions/BadRequestException');

class AuthController {

    async login({request, auth, response}) {
        const email = request.input("email")
        let password = request.input("password");

        try {
            let accessToken = await auth.attempt(email, password)
            const user = await User.findBy('email', email);
            if(!user.enabled) {
                return response.status(401).json({message: 'Usuario desactivado!'})
            }
            return response.json({...accessToken})
        } catch (e) {
            return response.status(400).json({message: 'Autenticación fallida! Por favor verifique usuario y contraseña.'})
        }
    }

    async register({request, response, auth}) {
        try {
            const {
                email, password, fullname, telephone, address, office, role, picture, notificationsConsent
            } = request.all()

            const user = await UserService.addUser({email, password, fullname, telephone, address, office, role, picture, notificationsConsent});
            const token = Encryption.encrypt(user.id);

            await MailNotification.registerUserConfirmation(user, token)
            return response.status(201).json({
                message: 'We have send you an email with the instructions to verify your account'
            })
        } catch (e) {
            return response.status(400).json({message: e.message})
        }

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

    async registrationConfirmation({request, view, auth}) {
        try {
            const token = request.input('token');
            if(!token) {
                throw new Error('Token is required');
            }
            const id = Encryption.decrypt(token);
            if(!id) {
                throw new BadRequestException('Invalid token provided');
            }

            const user = await UserService.activateUser(id);
            return view.render('auth.registration_confirmed', {
                user
            })
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}

module.exports = AuthController;
