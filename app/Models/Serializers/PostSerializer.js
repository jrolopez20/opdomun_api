'use strict'

const AdvancedSerializer = use('AdvancedSerializer')
const CurrencyService = use('App/Services/CurrencyService')

class PostSerializer extends AdvancedSerializer {
    serializeSingle(modelInstance, user) {
        let model = modelInstance.toObject()
        model.price = CurrencyService.formatPrice(model.price, user)
        return model
    }
}

module.exports = PostSerializer
