'use strict'

const Address = use('App/Models/Address');

class AddressService {

    static async addAddress({localidad_id, street, location}) {
        let address = new Address();
        address = Object.assign(address, {
            localidad_id,
            street,
            location
        });
        await address.save();
        return address;
    }

    static async setAddress(address_id, {localidad_id, street, location}) {
        let address = await Address.find(address_id);
        address = Object.assign(address, {
            localidad_id,
            street,
            location
        });
        await address.save();
        return address;
    }

    static async destroyAddress(address_id) {
        const address = await Address.find(address_id);
        if (address) {
            return await address.delete();
        } else {
            throw new Error('Address not found');
        }
    }

}

module.exports = AddressService;
