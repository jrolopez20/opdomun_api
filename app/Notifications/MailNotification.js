'use strict'

const Env = use('Env');
const Mail = use('Mail');
const Helpers = use('Helpers');

class MailNotification {

    static async sendCustomerEmail(owner, subscriptors) {
        const sender = Env.getOrFail('MAIL_USERNAME');
        await Mail.send('emails.customer_notification', {owner, subscriptors}, (message) => {
            message
                .to(owner.email)
                .from(sender)
                .subject('Posibles compradores para su propiedad')
                .embed(Helpers.publicPath('images/logo_dark.png'), 'logo')
        })
    }

    static async sendSubcriptorEmail() {
    }

}

module.exports = MailNotification;
