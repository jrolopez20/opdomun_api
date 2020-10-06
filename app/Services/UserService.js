'use strict'

const User = use('App/Models/User');
const Drive = use('Drive');
const Helpers = use('Helpers');
const BadRequestException = use('App/Exceptions/BadRequestException');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');

class UserService {

    static async addUser(request) {
        const {
            email, password, repassword, numid, fullname, telephone, address, officeId, role
        } = request.all()

        const givenUser = await User.query().where('email', email).first();

        if (givenUser) {
            throw new BadRequestException('There is an user with the same email address.');
        }

        if (password !== repassword) {
            throw new BadRequestException('Password do not match.');
        }

        let user = new User();
        user.email = email;
        user.password = password
        user.numid = numid;
        user.fullname = fullname;
        user.telephone = telephone;
        user.address = address;
        user.officeId = officeId;
        user.role = role || User.roles().CLIENT;

        await user.save();

        return User.find(user.id);
    }

    static async setUser(userId, request) {
        const numid = request.input("numid")
        const fullname = request.input("fullname")
        const telephone = request.input("telephone")
        const address = request.input("address")
        const officeId = request.input("officeId")
        let role = request.input("role")

        let user = await User.find(userId)
        user.numid = numid;
        user.fullname = fullname;
        user.telephone = telephone;
        user.address = address;
        user.officeId = officeId;

        if (role) {
            user.role = role;
        }

        await user.save();

        return user;
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
