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
            email, password, repassword, fullname, telephone, address, office, role, picture, notificationsConsent
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
            user.fullname = fullname;
            user.telephone = telephone;
            user.picture = picture;
            user.notificationsConsent = notificationsConsent;
            if (office) {
                user.officeId = office.id;
            }
            user.role = role || User.roles().CLIENT;

            await user.save(trx);

            if (address && address.localidad && address.localidad.id && address.description) {
                let addressObj = new Address();
                addressObj.localidadId = address.localidad.id
                addressObj.description = address.description
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
        const fullname = request.input('fullname')
        const telephone = request.input('telephone')
        const address = request.input('address')
        const picture = request.input('picture')
        const office = request.input('office')
        const preferredCurrency = request.input('preferredCurrency')
        const role = request.input('role')

        const trx = await Database.beginTransaction()
        try {
            let user = await User.find(userId)
            user.fullname = fullname;
            user.telephone = telephone;

            if (picture) {
                user.picture = picture;
            }

            if (preferredCurrency) {
                user.preferredCurrency = preferredCurrency;
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
                let addressObj = await user.getRelated('address');
                if(addressObj) {
                    if (address.localidad) {
                        addressObj.localidadId = address.localidad.id;
                    }
                    if (address.description) {
                        addressObj.description = address.description;
                    }

                    await addressObj.save(trx)
                } else if(address.localidad && address.localidad.id && address.description) {
                    addressObj = await Address.create({
                        localidadId: address.localidad.id,
                        description: address.description
                    }, trx)
                    user.addressId = addressObj.id
                }
            }

            await user.save(trx);

            // End transaction
            await trx.commit();

            return await User.getUser(user.id);
        } catch (e) {
            console.log(e)
            trx.rollback();
            throw new Error(e.message)
        }
    }

    static async setProfile(auth, request) {
        const fullname = request.input('fullname')
        const telephone = request.input('telephone')
        const address = request.input('address')
        const picture = request.input('picture')
        const notificationsConsent = request.input('notificationsConsent')
        const preferredCurrency = request.input('preferredCurrency')

        const trx = await Database.beginTransaction()
        try {
            let user = await auth.getUser();
            user.fullname = fullname;
            user.telephone = telephone;
            user.notificationsConsent = notificationsConsent;

            if (picture) {
                user.picture = picture;
            }

            if (preferredCurrency) {
                user.preferredCurrency = preferredCurrency;
            }

            // Edit address
            if (address) {
                await user.load('address');
                let addressObj = await user.getRelated('address');
                if(addressObj) {
                    if (address.localidad) {
                        addressObj.localidadId = address.localidad.id;
                    }
                    if (address.description) {
                        addressObj.description = address.description;
                    }

                    await addressObj.save(trx)
                } else if(address.localidad && address.localidad.id && address.description) {
                    addressObj = await Address.create({
                        localidadId: address.localidad.id,
                        description: address.description
                    }, trx)
                    user.addressId = addressObj.id
                }
            }

            await user.save(trx);

            // End transaction
            await trx.commit();

            return await User.getUser(user.id);
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
