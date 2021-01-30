'use strict'

const NotificationService = use('App/Services/NotificationService');

const Subscription = exports = module.exports = {}

Subscription.created = async ({subscription}) => {
    // Notify seller when a new subscripton is created
    await NotificationService.notifySellers(subscription);
    await NotificationService.notifySubscriptionOwnerAboutOlderPost(subscription);
}
