'use strict'

const User = use('App/Models/User');

class EntryPointAccesService {

    static entryPoints() {
        return {
            backoffice: {
                permission: [User.roles().ADMIN, User.roles().MANAGER, User.roles().AGENT]
            },
            portal: {
                permission: [User.roles().ADMIN, User.roles().USER]
            }
        }
    }

    static checkEntryPointAccess(user, entrypoint) {
        if (!this.isValidEntryPoint(entrypoint)) {
            throw new Error('Invalid entry point.')
        }

        const result = this.entryPoints()[entrypoint].permission.find(role => role === user.role);
        if (result) {
            return true;
        }
        return false;
    }

    static isValidEntryPoint(entrypoint) {
        if (this.entryPoints()[entrypoint]) {
            return true;
        }
        return false;
    }

}

module.exports = EntryPointAccesService;
