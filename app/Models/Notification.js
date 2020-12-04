'use strict'

const Model = use('Model')

class Notification extends Model {
    static NOTIFICATION_TYPES() {
        return {
            SALE: 'SALE', //Notificación que se le envía a un comprador, indicándole un anuncio de venta que coincide con alguno de sus anuncios de compra
            PURCHASE_TO_PREMIUM:'PURCHASE_TO_PREMIUM', //Notificación que se le envía a un vendedor con anuncio preimum, indicándole de un anuncio de compra que coincide con alguno de sus anuncios de venta
            PURCHASE_TO_FREE:'PURCHASE_TO_FREE', //Notificación que se le envía a un vendedor con anuncio gratis, indicándole de un anuncio de compra que coincide con alguno de sus anuncios de venta
            SALE_AD_PREMIUM_RENEW: 'SALE_AD_PREMIUM_RENEW', //Notificación que se le envía a un vendedor de anuncio premium, indicándole que su anuncio de venta premium debe ser renovado
            SALE_AD_FREE_EXPIRED: 'SALE_AD_FREE_EXPIRED', //Notificación que se le envía a un vendedor de anuncio gratis, indicándole que su anuncio de venta gratis debe ser renovado,
            SALE_AD_VIEWS: 'SALE_AD_VIEWS', //Notificación que se le envía a un vendedor con anuncio premium, indicándole la cantidad de visitas que ha tenido su anuncio de venta
            SALE_AD_PREMIUM_CREATED: 'SALE_AD_PREMIUM_CREATED', //Notificación que se le envía a un vendedor, indicándole que su anuncio de venta premium ya está disponible
        }
    }
}

module.exports = Notification
