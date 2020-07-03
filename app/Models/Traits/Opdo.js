'use strict'
const PostVariable = use('App/Models/PostVariable');
const Database = use('Database')

class Opdo {

    register(Model, customOptions = {}) {
        const defaultOptions = {}
        const options = Object.assign(defaultOptions, customOptions)

        // Add an instance method
        Model.prototype.calculateOpdo = async function () {
            const postVariable = await PostVariable
                .query()
                .where('post_id', this.id)
                .fetch();

            const listVar = postVariable.toJSON();
            let sum = 0;
            for (const postVar of listVar) {
                if (postVar.points && postVar.points !== null && postVar.points !== '') {
                    sum += parseFloat(postVar.points);
                }
            }
            this.evi = parseFloat(this.area) * 12.33 * sum;
            if (this.plan) {
                this.opdo = parseFloat(this.evi / parseFloat(this.price));
            }
            await this.save();
            return this;
        }

        /**
         * Devuelve el promedio opdo a usar
         * @param municipio
         * @returns {Promise<number>}
         */
        Model.prototype.getAvgOpdo = async function (municipio, provincia) {
            let queryMunicipio = Database
                .select('posts.opdo')
                .from('posts')
                .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
                .whereNotNull('posts.published_at')
                .whereNotNull('posts.opdo')
                .whereIn('posts.plan', [1, 2, 3])
                .andWhere('municipios.id', municipio)
                .orderBy('opdo', 'DESC')
                .limit(5);

            let queryProvincia = Database
                .select('posts.opdo')
                .from('posts')
                .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
                .innerJoin('provincias', 'provincias.id', 'municipios.provincia_id')
                .whereNotNull('posts.published_at')
                .whereNotNull('posts.opdo')
                .whereIn('posts.plan', [1, 2, 3])
                .andWhere('municipios.provincia_id', provincia)
                .orderBy('opdo', 'DESC')
                .limit(5);

            const queryCountry = Database
                .select('posts.opdo')
                .table('posts')
                .whereNotNull('posts.published_at')
                .whereNotNull('posts.opdo')
                .whereIn('posts.plan', [1, 2, 3])
                .orderBy('opdo', 'desc')
                .limit(5);

            const breakPointArea = 150;
            if (this.area <= breakPointArea) {
                queryMunicipio.andWhere('posts.area', '<=', breakPointArea);
                queryProvincia.andWhere('posts.area', '<=', breakPointArea);
                queryCountry.andWhere('posts.area', '<=', breakPointArea);
            } else {
                queryMunicipio.andWhere('posts.area', '>', breakPointArea);
                queryProvincia.andWhere('posts.area', '>', breakPointArea);
                queryCountry.andWhere('posts.area', '>', breakPointArea);
            }


            let avg = 0;
            const postsByMunicipio = await queryMunicipio;
            // Verifica que existan 5 anuncios en el municipio
            if (postsByMunicipio.length === 5) {
                for (const post of postsByMunicipio) {
                    avg += post.opdo
                }
                avg = avg / 5;
            } else {
                const postsByProvincia = await queryProvincia;
                // Verifica que existan 5 anuncios en la provincia
                if (postsByProvincia.length === 5) {
                    for (const post of postsByProvincia) {
                        avg += post.opdo
                    }
                    avg = avg / 5;
                } else {
                    // Si no tomaria los del país
                    const postsByCountry = await queryCountry;
                    for (const post of postsByCountry) {
                        avg += post.opdo
                    }
                    avg = avg / postsByCountry.length;
                }
            }

            return avg;
        };

        /**
         * Devuelve el promedio opdo de la provincia a partir de un rango
         * @param provincia
         * @returns {Promise<void>}
         */
        Model.parsePrice = function (value) {
            if (value) {
                value = value.toString();
                let price = ' CUC';
                let miles = 0;
                for (let i = value.length - 1; i >= 0; i--) {
                    if (miles % 3 == 0 && miles !== 0) {
                        price = ' ' + price
                    }
                    price = value[i] + price
                    miles++
                }
                return price
            }
            return '';
        }
    }
}

module.exports = Opdo
