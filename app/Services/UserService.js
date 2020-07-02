'use strict'

const User = use('App/Models/User');
const Database = use('Database');
const Drive = use('Drive');
const Helpers = use('Helpers');
const Hash = use('Hash');

class UserService {

    static async addUser(request) {
        const numid = request.input("numid")
        const fullname = request.input("fullname")
        const email = request.input("email")
        const password = request.input("password")
        const telephone = request.input("telephone")
        const address = request.input("address")
        const provincias = request.input("provincias")

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

        if (password === request.input("repassword")) {
            user.password = password;
        } else {
            throw new Error('Password do not match!');
        }
        await user.save();

        if (provincias) {
            let userProvincias = [];
            if (!isNaN(provincias)) {
                userProvincias.push({
                    provincia_id: provincias,
                    user_id: user.id
                })
            } else if (provincias.length > 0) {
                for (let provincia of provincias) {
                    userProvincias.push({
                        provincia_id: provincia,
                        user_id: user.id
                    })
                }
            }

            await user
            .userProvincias()
            .createMany(userProvincias);
        }

        user.opnum = user.id;
        await user.save();

        return user;
    }

    static async setUser(userId, request) {
        const numid = request.input("numid")
        const fullname = request.input("fullname")
        const email = request.input("email")
        const telephone = request.input("telephone")
        const address = request.input("address")
        let provincias = request.input("provincias")

        const userPicture = request.file('picture', {
            types: ['image'],
            extnames: ['jpg', 'jpeg', 'png'],
            size: '1mb'
        });

        let user = await User.find(userId)

        user.numid = numid;
        user.fullname = fullname;
        user.email = email;
        user.telephone = telephone;
        user.address = address;

        await Database
        .table('user_provincias')
        .where('user_id', userId)
        .delete()

        if (provincias) {
            let userProvincias = [];
            if (!isNaN(provincias)) {
                userProvincias.push({
                    provincia_id: provincias,
                    user_id: userId
                })
            } else if (provincias.length > 0) {
                for (let provincia of provincias) {
                    userProvincias.push({
                        provincia_id: provincia,
                        user_id: userId
                    })
                }
            }

            await user
            .userProvincias()
            .createMany(userProvincias);
        }

        if (userPicture) {
            const pictureName = new Date().getTime() + '.jpg';
            await userPicture.move(Helpers.publicPath('images/user_pictures'), {
                name: pictureName
            });

            if (!userPicture.moved()) {
                throw new Error(userPicture.error());
            }

            if (user.picture) {
                const actualPicturePath = Helpers.publicPath('images/user_pictures/') + user.picture
                const exists = await Drive.exists(actualPicturePath)
                if (exists) {
                    await Drive.delete(actualPicturePath)
                }
            }

            user.picture = pictureName
        }

        await user.save();

        return user;
    }

    static async destroyUser(userId) {
        let user = await User.find(userId);
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
            throw new NotFou
        } else {
            throw new Error('Password cannot be null')
        }
    }

}

module.exports = UserService;
