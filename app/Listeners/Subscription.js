'use strict'

const NotificationService = use('App/Services/NotificationService');

const Subscription = exports = module.exports = {}

Subscription.created = async ({subscription}) => {
    // Notify seller when a new subscrion is created
    await NotificationService.notifySellers(subscription.toJSON());
}
