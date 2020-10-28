'use strict'
const Validator = use('Validator');
const Plan = use('App/Models/Plan');

const checkImages = async (data, field, message, args, get) => {
    if (data[field]) {
        if (data['plan']) {
            const plan = await Plan.find('id', data['plan'].id);

            if (plan.type === Plan.TYPES().PREMIUM && data[field].length > 15) {
                throw 'You have exceed maximum length for images'
            } else if (plan.type === Plan.TYPES().FREE && data[field].length > 7) {
                throw 'You have exceed maximum length for images'
            }
        } else if (data[field].length > 7) {
            throw 'You have exceed maximum length for images'
        }
    }
}
Validator.extend('images', checkImages);

module.exports = checkImages;
