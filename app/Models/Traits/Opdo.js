'use strict'
const PostVariable = use('App/Models/PostVariable');
const Plan = use('App/Models/Plan');
const Database = use('Database')

class Opdo {

    register(Model, customOptions = {}) {
        const defaultOptions = {}
        const options = Object.assign(defaultOptions, customOptions)

        // Add an instance method
        Model.prototype.calculateOpdo = async function () {
            const postVariable = await PostVariable
                .query()
                .where('postId', this.id)
                .fetch();

            const listVar = postVariable.toJSON();
            let sum = 0;
            for (const postVar of listVar) {
                if (postVar.points && postVar.points !== null && postVar.points !== '') {
                    sum += parseFloat(postVar.points);
                }
            }
            this.evi = parseFloat(this.area) * 12.33 * sum;
            if (this.planId) {
                this.opdo = parseFloat(this.evi / parseFloat(this.price));
            }
            await this.save();
            return this;
        }

        /**
         * Devuelve el promedio opdo a usar
         * @param municipioId
         * @returns {Promise<number>}
         */
        Model.prototype.getAvgOpdo = async function (municipioId, provinciaId) {
            let queryMunicipio = Database
                .select('posts.opdo')
                .from('posts')
                .innerJoin('plans', 'plans.id', 'posts.plan_id')
                .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
                .whereNotNull('posts.published_at')
                .whereNotNull('posts.opdo')
                .whereIn('plans.type', [Plan.TYPES().PREMIUM, Plan.TYPES().FREE])
                .andWhere('municipios.id', municipioId)
                .orderBy('opdo', 'DESC')
                .limit(5);

            let queryProvincia = Database
                .select('posts.opdo')
                .from('posts')
                .innerJoin('plans', 'plans.id', 'posts.plan_id')
                .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
                .innerJoin('provincias', 'provincias.id', 'municipios.provincia_id')
                .whereNotNull('posts.published_at')
                .whereNotNull('posts.opdo')
                .whereIn('plans.type', [Plan.TYPES().PREMIUM, Plan.TYPES().FREE])
                .andWhere('municipios.provincia_id', provinciaId)
                .orderBy('opdo', 'DESC')
                .limit(5);

            const queryCountry = Database
                .select('posts.opdo')
                .table('posts')
                .innerJoin('plans', 'plans.id', 'posts.plan_id')
                .whereNotNull('posts.published_at')
                .whereNotNull('posts.opdo')
                .whereIn('plans.type', [Plan.TYPES().PREMIUM, Plan.TYPES().FREE])
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
         *
         * @param value
         * @returns {string|string|string}
         */
        Model.parsePrice = function (value) {
            if (value) {
                value = value.toString();
                let price = '';
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
