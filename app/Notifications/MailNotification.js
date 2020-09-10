'use strict'

const Env = use('Env');
const Mail = use('Mail');
const Helpers = use('Helpers');
class MailNotification {

    static async notifyCustomerSingle(owner, subscriptor) {
        const sender = Env.getOrFail('MAIL_USERNAME');
        const appName = Env.getOrFail('APP_NAME');

        await Mail.send('emails.notify_customer_single_subscriptor', {owner, subscriptor}, (message) => {
            message
                .to(owner.email)
                .from(sender, appName)
                .subject('Posible comprador para su propiedad')
                .embed(Helpers.publicPath('images/logo_dark.png'), 'logo')
        })
    }

    static async notifyCustomerMultiple(owner, subscriptors) {
        const sender = Env.getOrFail('MAIL_USERNAME');
        const appName = Env.getOrFail('APP_NAME');

        await Mail.send('emails.notify_customer_multiple_subscriptors', {owner, subscriptors}, (message) => {
            message
                .to(owner.email)
                .from(sender, appName)
                .subject('Posibles compradores para su propiedad')
                .embed(Helpers.publicPath('images/logo_dark.png'), 'logo')
        })
    }

    static async notifySubcriptor(subscription, post) {
        const sender = Env.getOrFail('MAIL_USERNAME');
        const appName = Env.getOrFail('APP_NAME');

        await Mail.send('emails.subscriptor_notification', {subscription, post}, (message) => {
            message
                .to(subscription.email)
                .from(sender, appName)
                .subject('Nueva casa en venta que pudiera interesarte')
                .embed(Helpers.publicPath('images/logo_dark.png'), 'logo')
        })
    }

}

module.exports = MailNotification;
