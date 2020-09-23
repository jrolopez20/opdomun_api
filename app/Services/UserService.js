'use strict'

const User = use('App/Models/User');
const Drive = use('Drive');
const Helpers = use('Helpers');

class UserService {

    static async addUser(request) {
        const numid = request.input("numid")
        const fullname = request.input("fullname")
        const email = request.input("email")
        const password = request.input("password")
        const telephone = request.input("telephone")
        const address = request.input("address")
        const office_id = request.input("office_id")
        let role = request.input("role")

        const givenUser = await User.query().where('email', email).first();

        if (givenUser) {
            throw new Error('Ya existe un usuario con esa dirección de correo!');
        }

        let user = new User();
        user.numid = numid;
        user.fullname = fullname;
        user.email = email;
        user.telephone = telephone;
        user.address = address;
        user.office_id = office_id;
        user.role = role;

        if (password === request.input("repassword")) {
            user.password = password;
        } else {
            throw new Error('Password do not match!');
        }
        await user.save();

        return user;
    }

    static async setUser(userId, request) {
        const numid = request.input("numid")
        const fullname = request.input("fullname")
        const telephone = request.input("telephone")
        const address = request.input("address")
        const office_id = request.input("office_id")
        let role = request.input("role")

        let user = await User.find(userId)
        user.numid = numid;
        user.fullname = fullname;
        user.telephone = telephone;
        user.address = address;
        user.office_id = office_id;

        if (role) {
            user.role = role;
        }

        await user.save();

        return user;
    }

    static async destroyUser(userId, auth) {
        let user = await User.find(userId);

        if ((user.id === auth.user.id)) {
            throw new Error('The authenticated user cannot delete himself');
        }

        if (user) {
            if (user.picture) {
                const picPath = Helpers.publicPath('images/user_pictures/') + user.picture;
                await Drive.delete(picPath)
            }
            return await user.delete();
        } else {
            throw new Error('User not found');
        }
    }

    static async changePassword(userId, password) {
        if (password) {
            const user = await User.find(userId);
            user.password = password;
            await user.save();
        } else {
            throw new Error('Password cannot be null')
        }
    }

    static async toggleEnable(userId) {
        let user = await User.find(userId);
        user.closed_at = user.closed_at === null ? new Date() : null;
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
