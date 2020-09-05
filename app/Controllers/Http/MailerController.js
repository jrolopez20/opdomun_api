'use strict'

// const Article = use('App/Models/Article');
const NotificationService = use('App/Services/NotificationService');

class MailerController {

    async notifyCustomers({response}) {
        try {
            const result = await NotificationService.dispatchCustomerNotification();
            return response.json(result);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    async notifySubscriptors({response}) {
        try {
            const result = await NotificationService.dispatchSubscriptorNotification();
            return response.json(result);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = MailerController;
