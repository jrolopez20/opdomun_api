'use strict'

const NotificationService = use('App/Services/NotificationService');

const Subscription = exports = module.exports = {}

Subscription.created = async ({subscription}) => {
    await NotificationService.notifySellers(subscription.toJSON());
}
