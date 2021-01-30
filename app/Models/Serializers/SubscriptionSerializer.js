'use strict'

const AdvancedSerializer = use('AdvancedSerializer')
const CurrencyService = use('App/Services/CurrencyService')

class SubscriptionSerializer extends AdvancedSerializer {
    serializeSingle(modelInstance, user) {
        let model = modelInstance.toObject()
        model.minPrice = CurrencyService.formatPrice(model.minPrice, user)
        model.maxPrice = CurrencyService.formatPrice(model.maxPrice, user)
        return model
    }
}

module.exports = SubscriptionSerializer
