'use strict'

const Address = use('App/Models/Address');

class AddressService {

    static async addAddress({localidad, description, coordinates = null}) {
        let address = new Address();
        address.localidadId = localidad.id
        address.description = description
        address.coordinates = coordinates
        await address.save();
        return address;
    }

    static async setAddress(addressId, {localidad, description, coordinates = null}) {
        let address = await Address.find(addressId);
        address.localidadId = localidad.id
        address.description = description
        address.coordinates = coordinates
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
