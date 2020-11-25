'use strict'

const Office = use('App/Models/Office');
const Post = use('App/Models/Post');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const UnauthorizedException = use('App/Exceptions/UnauthorizedException.js')

class OfficeService {

    static async destroyOffice(id) {
        let office = await Office.find(id);

        if (!office) {
            throw new ResourceNotFoundException();
        }

        await office.load('users')
        const users = office.getRelated('users').toJSON()
        if(users && users.length > 0) {
            throw new UnauthorizedException('You cannot remove an office with users inside.')
        }

        return await office.delete();
    }

    static async addOffice({provincia}) {
        const office = new Office();
        office.provinciaId = provincia.id;
        await office.save();

        return await Office.getOffice(office.id);
    }

    static async setOffice(id, {provincia}) {
        const office = await Office.findOrFail(id);
        office.provinciaId = provincia.id;
        await office.save();

        return await Office.getOffice(id);
    }
}

module.exports = OfficeService;
