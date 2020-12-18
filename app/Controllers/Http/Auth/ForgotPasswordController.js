'use strict'

// const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const MailNotification = use('App/Notifications/MailNotification')
const UnauthorizedException = use('App/Exceptions/UnauthorizedException')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')

class ForgotPasswordController {

    async store({request, response}) {
        try {
            const {email} = request.only(['email'])

            // Checking if email is registered
            const user = await User.findByOrFail('email', email)

            // Generating token
            const token = await crypto.randomBytes(10).toString('hex')

            // Remove any existing token for reset password
            await Token.removeToken(user, Token.resetPasswordKey())

            await user.tokens().create({
                token,
                type: Token.resetPasswordKey()
            })

            await MailNotification.recoverPasswordNotification(user, token);

            return response.status(200).json({
                message: 'We have send you an email with the instructions to verify your account'
            })
        } catch (err) {
            if (err.name === 'ModelNotFoundException') {
                throw new ResourceNotFoundException();
            } else {
                console.log(err)
            }
        }
    }

    async update({request, response, params}) {
        const tokenProvided = params.token // retrieving token in URL
        const emailRequesting = params.email // email requesting recovery
        const {newPassword} = request.only(['newPassword'])

        const user = await User.findBy('email', emailRequesting);
        if (!user) {
            throw new ResourceNotFoundException();
        }

        const token = await Token.getUserTokenByType(user, Token.resetPasswordKey());
        if (tokenProvided !== token.token) {
            throw new UnauthorizedException('Old token provided or token already used.');
        }

        // Saving new password
        user.password = newPassword

        // Delete current token
        await Token.removeToken(user, Token.resetPasswordKey())

        await user.save()

        return response.status(200).json({
            message: 'Your password has been restored'
        })
    }
}

module.exports = ForgotPasswordController
