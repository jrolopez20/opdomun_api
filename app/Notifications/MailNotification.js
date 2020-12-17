'use strict'

const Env = use('Env');
const Mail = use('Mail');
const Helpers = use('Helpers');
class MailNotification {

    static logoPatch() {
        return Helpers.publicPath('images/logo_large.png');
    }

    static async registerUserConfirmation(user, token) {
        const sender = Env.getOrFail('MAIL_USERNAME');
        const appName = Env.getOrFail('APP_NAME');

        const confirmationUrl = `${Env.get('APP_URL')}/registration_confirmation?token=${encodeURIComponent(token)}`;

        await Mail.send('emails.register_confirmation', {user, confirmationUrl}, (message) => {
            message
                .to(user.email)
                .from(sender, appName)
                .subject('Active su cuenta de Opdomun')
                .embed(MailNotification.logoPatch(), 'logo')
        })
    }

    static async recoverPasswordNotification(user, token) {
        const sender = Env.getOrFail('MAIL_USERNAME');
        const appName = Env.getOrFail('APP_NAME');

        const recoverUrl = `${Env.get('APP_URL')}/forgot_password/${token}/${user.email}`;

        await Mail.send('emails.password_recover', {user, recoverUrl}, (message) => {
            message
                .to(user.email)
                .from(sender, appName)
                .subject('Recupere su contraseña de Opdomun')
                .embed(MailNotification.logoPatch(), 'logo')
        });
    }
}

module.exports = MailNotification;
