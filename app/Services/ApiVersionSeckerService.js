'use strict'
const {version} = require('../../package.json');

class ApiVersionSeckerService {

    static isValidVersion(pVersion) {
        const regExp = new RegExp("^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$");

        if (regExp.test(pVersion)) {
            const major = version.split('.', 1)[0]
            const pMajor = pVersion.split('.', 1)[0]

            return major === pMajor
        }

        return false;
    }
}

module.exports = ApiVersionSeckerService;
