'use strict'

const Address = use('App/Models/Address');
const User = use('App/Models/User');
const Database = use('Database');
const Drive = use('Drive');
const Helpers = use('Helpers');
const BadRequestException = use('App/Exceptions/BadRequestException');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');

class UserService {

    static async addUser(request) {
        const {
            email, password, repassword, numid, fullname, telephone, address, office, role, picture
        } = request.all()

        const givenUser = await User.query().where('email', email).first();

        if (givenUser) {
            throw new BadRequestException('There is an user with the same email address.');
        }

        if (password !== repassword) {
            throw new BadRequestException('Password do not match.');
        }

        const trx = await Database.beginTransaction()
        try {
            let user = new User();
            user.email = email;
            user.password = password
            user.numid = numid;
            user.fullname = fullname;
            user.telephone = telephone;
            user.picture = picture;
            if (office) {
                user.officeId = office.id;
            }
            user.role = role || User.roles().CLIENT;

            await user.save(trx);

            if (address) {
                let addressObj = new Address();
                addressObj.localidadId = address.localidad.id
                addressObj.description = address.description
                addressObj.coordinates = address.coordinates
                await addressObj.save(trx);

                await user.address().associate(addressObj, trx)
            }

            // End transaction
            await trx.commit();
            await user.load('address');
            await user.load('office.provincia');
            return user;
        } catch (e) {
            console.log(e)
            trx.rollback();
            throw new Error(e.message)
        }
    }

    static async setUser(userId, request) {
        const email = request.input("email")
        const numid = request.input("numid")
        const fullname = request.input("fullname")
        const telephone = request.input("telephone")
        const address = request.input("address")
        const picture = request.input("picture")
        const office = request.input("office")
        let role = request.input("role")

        const trx = await Database.beginTransaction()
        try {
            let user = await User.find(userId)
            user.email = email;
            user.numid = numid;
            user.fullname = fullname;
            user.telephone = telephone;

            if (picture) {
                user.picture = picture;
            }

            if(office) {
                user.officeId = office.id;
            }

            if (role) {
                user.role = role;
            }

            // Edit address
            if (address) {
                await user.load('address');
                const addressObj = await user.getRelated('address');

                if (address.localidad) {
                    addressObj.localidadId = address.localidad.id;
                }
                if (address.description) {
                    addressObj.description = address.description;
                }

                await addressObj.save(trx)
            }

            await user.save(trx);

            // End transaction
            await trx.commit();

            await user.load('office.provincia');
            return user;
        } catch (e) {
            console.log(e)
            trx.rollback();
            throw new Error(e.message)
        }
    }

    static async destroyUser(userId, auth) {
        let user = await User.find(userId);

        if (user) {
            if (user.picture) {
                const picPath = Helpers.publicPath('images/user_pictures/') + user.picture;
                await Drive.delete(picPath)
            }
            return await user.delete();
        } else {
            throw new ResourceNotFoundException('User not found');
        }
    }

    static async changePassword(userId, password) {
        if (password) {
            const user = await User.find(userId);
            user.password = password;
            await user.save();
        } else {
            throw new BadRequestException('Password cannot be null');
        }
    }

    static async toggleEnable(userId) {
        let user = await User.find(userId);
        user.closedAt = user.closedAt === null ? new Date() : null;
        await user.save();

        return user;
    }

    static async getRoles(user) {
        const roles = await User.roles();
        let enter = false;
        const filteredRoles = [];

        for (const key in roles) {
            if (user.role === roles[key]) {
                enter = true;
                continue;
            }
            if (enter) {
                filteredRoles.push(roles[key]);
            }
        }

        filteredRoles.unshift(roles.ADMIN);
        return filteredRoles;
    }

}

module.exports = UserService;
