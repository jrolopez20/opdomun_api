'use strict'
const Post = use('App/Models/Post');
const ServPublico = use('App/Models/ServPublico');

class Ds {
    register(Model, customOptions = {}) {
        const defaultOptions = {}
        const options = Object.assign(defaultOptions, customOptions)

        Model.prototype.getDiccServiciosPublicos = function () {
            const options = [
                {label: 'Hasta 500m', value: 100, id: 1},
                {label: '500m - 1100m', value: 80, id: 2},
                {label: '1100m - 2800m', value: 60, id: 3},
                {label: 'Más de 2800m', value: 40, id: 4},

                {label: 'Hasta 500m', value: 100, id: 5},
                {label: '500m - 1100m', value: 100, id: 6},
                {label: '1100m - 2800m', value: 80, id: 7},
                {label: 'Más de 2800m', value: 60, id: 8},

                {label: 'Hasta 500m', value: 100, id: 9},
                {label: '500m - 1100m', value: 100, id: 10},
                {label: '1100m - 2800m', value: 100, id: 11},
                {label: 'Más de 2800m', value: 80, id:12}
            ];

            const dicc = {
                agromercado: {
                    title: 'Agromercado',
                    options: options.slice(0,4)
                },
                productos_procesados: {
                    title: 'Mercado de productos procesados',
                    options: options.slice(0,4)
                },
                tiendas: {
                    title: 'Tiendas',
                    options: options.slice(0,4)
                },
                cafeteria: {
                    title: 'Cafeterías',
                    options: options.slice(0,4)
                },
                escuela_guardería: {
                    title: 'Escuelas / Guarderías',
                    options: options.slice(0,4)
                },
                gimnasio: {
                    title: 'Gimnasios',
                    options: options.slice(0,4)
                },
                transporte_publico: {
                    title: 'Parada de transporte público',
                    options: options.slice(0,4)
                },
                centro_salud: {
                    title: 'Centro de Salud',
                    options: options.slice(4,8)
                },
                parques: {
                    title: 'Parques',
                    options: options.slice(4,8)
                },
                farmacias: {
                    title: 'Farmacias',
                    options: options.slice(4,8)
                },
                salon_belleza: {
                    title: 'Salón de belleza',
                    options: options.slice(4,8)
                },
                agencia_bancaria: {
                    title: 'Agencia bancaria / Cajero',
                    options: options.slice(4,8)
                },
                servicentro: {
                    title: 'Servicentro',
                    options: options.slice(4,8)
                },
                cine_teatro: {
                    title: 'Cine / teatro',
                    options: options.slice(4,8)
                },
                lavanderia: {
                    title: 'Lavanderías',
                    options: options.slice(4,8)
                },

                estadio_deportivo: {
                    title: 'Estadio deportivo',
                    options: options.slice(8)
                },
                oficina_telefonica: {
                    title: 'Oficina de servicio telefónico',
                    options: options.slice(8)
                },
                hoteles: {
                    title: 'Hoteles',
                    options: options.slice(8)
                },
                restaurantes: {
                    title: 'Restaurantes',
                    options: options.slice(8)
                },
                oficina_tramites: {
                    title: 'Oficinas de trámites públicos',
                    options: options.slice(8)
                }
            };
            return dicc;
        };

        // Add an instance method
        Model.prototype.calculateDs = async function (request) {
            const items = [];
            let sum = 0;

            for(const service in request.body.services) {
                items.push({
                    post_variable_id: this.id,
                    value: request.body.services[service].value,
                    display_value: request.body.services[service].label,
                    title: this.getDiccServiciosPublicos()[service].title
                })
                sum += parseInt(request.body.services[service].value)
            }

            await ServPublico.removeServPublicos(this.id)
            await ServPublico.createMany(items)

            const result = sum / items.length;

            await this.load('variable')
            const variable = this.getRelated('variable');
            this.result = result;
            this.points = result * variable.influencia;
            await this.save();

            let post = await Post.find(this.post_id);
            post.calculateOpdo();
        }
    }
}

module.exports = Ds
