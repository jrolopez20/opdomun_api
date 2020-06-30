'use strict'

class DictamenTecnico {
    register(Model, customOptions = {}) {
        const defaultOptions = {}
        const options = Object.assign(defaultOptions, customOptions)

        Model.prototype.exportDictamenTecnico = async function () {
            await this.load('postPlaces');
            let places = this.getRelated('postPlaces');
            places = places.toJSON();

            let content = [
                {text: 'Prueba'},
                {text: this.address},
                {text: places[0].title}
            ];

            return content;
        }
    }
}

module.exports = DictamenTecnico
