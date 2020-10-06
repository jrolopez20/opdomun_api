'use strict'

const Address = use('App/Models/Address');

class AddressService {

    static async addAddress({localidadId, description, coordinates}) {
        let address = new Address();
        address = Object.assign(address, {
            localidadId,
            description,
            coordinates
        });
        await address.save();
        return address;
    }

    static async setAddress(addressId, {localidadId, description, coordinates}) {
        let address = await Address.find(addressId);
        address = Object.assign(address, {
            localidadId,
            description,
            coordinates
        });
        await address.save();
        return address;
    }

    static async destroyAddress(addressId) {
        const address = await Address.find(addressId);
        if (address) {
            return await address.delete();
        } else {
            throw new Error('Address not found');
        }
    }

}

module.exports = AddressService;
