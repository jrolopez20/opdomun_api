'use strict'
const Post = use('App/Models/Post');
const EnvElement = use('App/Models/EnvElement')

class Vs {
    register(Model, customOptions = {}) {
        const defaultOptions = {}
        const options = Object.assign(defaultOptions, customOptions)

        const DICC_VISUALES = {
            hitos_arquitectonicos: 'Hitos arquitectónicos',
            obras_artisticas_urbanas: 'Obras artísticas urbanas',
            hitos_naturales: 'Hitos naturales',
            paisaje_natural: 'Paisaje natural (Valle, Sierras, Montañas, Ríos, etc)',
            paisaje_costero: 'Paisaje costero (Bahía, Playa, Costa, etc)',
            trama_hurbana: 'Trama urbana',
            paisaje_agricola: 'Paisaje agrícola'
        };

        Model.prototype.getVisualesValues = async function () {
            await this.load('envElements')
            const envElements = this.getRelated('envElements').toJSON();

            let vs = {};
            for (const visual in DICC_VISUALES) {
                const element = envElements.find(item => item.title === DICC_VISUALES[visual]);
                if(element) {
                    vs[visual] = element.value;
                }
            }

            return vs
        };

        Model.prototype.calculateVs = async function (visuales) {
            let result = 0;
            const items = Array();

            for(const visual in visuales) {
                result += visuales[visual];
                items.push({
                    post_variable_id: this.id,
                    value: visuales[visual],
                    title: DICC_VISUALES[visual]
                });
            }

            await EnvElement.removeEnvElement(this.id)
            await EnvElement.createMany(items)

            await this.load('variable');
            const variable = this.getRelated('variable');
            this.result = result;
            this.points = result * variable.influencia;
            await this.save();
            let post = await Post.find(this.post_id);
            post.calculateOpdo();
        }
    }
}

module.exports = Vs
