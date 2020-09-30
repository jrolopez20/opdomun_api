'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
const PostPlace = use('App/Models/PostPlace')
const NomSegCiudadana = use('App/Models/NomSegCiudadana')
const InfUrbana = use('App/Models/InfUrbana')
const EnvElement = use('App/Models/EnvElement')
const EstConstructiva = use('App/Models/EstConstructiva')
const ServPublico = use('App/Models/ServPublico')
const Riesgo = use('App/Models/Riesgo')
const VarConforEficiencia = use('App/Models/VarConforEficiencia')
const VarMenaje = use('App/Models/VarMenaje')
const Municipio = use('App/Models/Municipio')
const User = use('App/Models/User')

function strToBool(s) {
    const regex=/^\s*(true|1)\s*$/i
    return regex.test(s)
}

class Post extends Model {
    static boot() {
        super.boot()
        this.addTrait('Opdo')
        this.addTrait('CastDate')
    }

    static get hidden() {
        return ['updated_at'];
    }

    static async getPost(id) {
        const post = await Post
            .query()
            .with('user')
            .with('address.localidad.municipio.provincia')
            .with('homeType')
            .with('postPlaces')
            .with('owner.user')
            .with('images', (builder) => {
                builder.orderBy('default', 'DESC')
            })
            .with('postVisit')
            .where('id', id)
            .firstOrFail();

        return post;
    }

    static async getBestPosts() {
        const posts = Database
            .from('posts')
            .select(
                'posts.id', 'posts.opdo', 'posts.price', 'posts.address', 'images.url as image',
                'municipios.title as municipio', 'provincias.cod as provincia'
            )
            .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
            .innerJoin('provincias', 'provincias.id', 'municipios.provincia_id')
            .innerJoin('plans', 'plans.id', 'posts.plan_id')
            .leftJoin('images', function () {
                this
                    .on('posts.id', 'images.post_id')
                    .andOn('images.default', true)
            })
            .whereNotNull('posts.published_at')
            .where('plans.id', 1)
            .where('posts.sold', '<>', true)
            .orderBy('posts.opdo', 'desc')
            .limit(3);

        return posts;
    }

    static async getFeaturedPosts(page = 1, limit = 3) {
        const query = Post
            .query()
            .with('user')
            .with('municipio.provincia')
            .with('images', (builder) => {
                builder.where('default', true)
            })
            .where('plan_id', 1)
            .whereNotNull('published_at')
            .whereRaw('EXTRACT(month FROM posts.published_at) in (EXTRACT(month FROM now()), EXTRACT(month FROM now())-1) AND closed_at >= now()')

            .where('posts.sold', 0)
            .orderBy('posts.opdo', 'desc');

        const posts = await query.paginate(page, limit);
        return posts;
    }

    static async getPosts(plan_id = null, page = 1, limit = 20, filter, user) {
        const query = Post
            .query()
            .setVisible(['id', 'price', 'published_at', 'closed_at', 'sold'])
            .with('plan', (builder) => {
                builder.setVisible(['id', 'title'])
            })
            .with('address.localidad.municipio.provincia')
            .with('images', (builder) => {
                builder.where('default', true)
            })
            .orderBy('updated_at', 'DESC')

        if (user.role === User.roles().MANAGER) {
            query.whereRaw(
                `posts.id IN (SELECT posts.id FROM posts 
                INNER JOIN users ON users.id = posts.user_id WHERE users.office_id = ${user.office_id})`
            );
        }

        if (user.role === User.roles().AGENT) {
            query.andWhere('posts.user_id', user.id);
        }

        if (user.role === User.roles().CLIENT) {
            query.whereRaw(
                `posts.id IN (SELECT posts.id FROM posts 
                INNER JOIN owners ON owners.post_id = posts.id WHERE owners.user_id = ${user.id})`
            );
        }

        if (strToBool(filter.my_posts)) {
            query.whereRaw(
                `posts.user_id = ${user.id} OR posts.id IN (SELECT posts.id FROM posts
                INNER JOIN owners ON owners.post_id = posts.id WHERE owners.user_id = ${user.id})`
            );
        }

        if (plan_id) {
            if (parseInt(plan_id) === -1) {
                query.whereNull('posts.plan_id')
            } else {
                query.andWhere('posts.plan_id', parseInt(plan_id));
            }
        } else {
            query.whereIn('posts.plan_id', [1, 4])
        }

        if (filter.municipio_id) {
            query.andWhere('posts.municipio_id', filter.municipio_id);
        }
        if (filter.home_type_id) {
            query.andWhere('posts.home_type_id', filter.home_type_id);
        }
        if (filter.bedrooms) {
            query.andWhere('posts.bedrooms', filter.bedrooms);
        }
        if (filter.bathrooms) {
            query.andWhere('posts.bathrooms', filter.bathrooms);
        }
        if (filter.minPrice) {
            query.andWhere('posts.price', '>=', filter.minPrice);
        }
        if (filter.maxPrice) {
            query.andWhere('posts.price', '<=', filter.maxPrice);
        }

        if (filter.provincia_id) {
            query.whereRaw(
                `posts.id IN (SELECT posts.id FROM posts 
                INNER JOIN addresses ON addresses.id = posts.addresses_id 
                INNER JOIN localidads ON localidads.id = addresses.localidad_id 
                INNER JOIN municipios ON municipios.id = localidads.municipio_id 
                WHERE municipios.provincia_id = ${filter.provincia_id})`
            );
        }

        const posts = await query.paginate(page, limit);
        return posts.toJSON();
    }

    static async getPublishedPosts(plan_id = null, page = 1, limit = 20, filter) {
        const query = Post
            .query()
            .setVisible(['id', 'address', 'price', 'opdo', 'area', 'bedrooms', 'bathrooms', 'published_at', 'sold'])
            .with('plan', (builder) => {
                builder.setVisible(['id', 'title'])
            })
            .with('address.localidad.municipio.provincia')
            .with('images', (builder) => {
                builder.where('default', true)
            })
            .whereNotNull('posts.published_at')
            .andWhere('posts.closed_at', '>=', new Date())
            .orderBy('posts.plan_id', 'ASC')
            .orderBy('posts.opdo', 'DESC');


        if (plan_id) {
            if (parseInt(plan_id) === -1) {
                query.whereNull('posts.plan_id')
            } else {
                query.andWhere('posts.plan_id', parseInt(plan_id));
            }
        } else {
            query.whereIn('posts.plan_id', [1, 4])
        }

        if (filter.municipio_id) {
            query.andWhere('posts.municipio_id', filter.municipio_id);
        }
        if (filter.home_type_id) {
            query.andWhere('posts.home_type_id', filter.home_type_id);
        }
        if (filter.bedrooms) {
            query.andWhere('posts.bedrooms', filter.bedrooms);
        }
        if (filter.bathrooms) {
            query.andWhere('posts.bathrooms', filter.bathrooms);
        }
        if (filter.minPrice) {
            query.andWhere('posts.price', '>=', filter.minPrice);
        }
        if (filter.maxPrice) {
            query.andWhere('posts.price', '<=', filter.maxPrice);
        }

        if (filter.provincia_id) {
            query.whereRaw(
                `posts.id IN (SELECT posts.id FROM posts 
                INNER JOIN addresses ON addresses.id = posts.addresses_id 
                INNER JOIN localidads ON localidads.id = addresses.localidad_id 
                INNER JOIN municipios ON municipios.id = localidads.municipio_id 
                WHERE municipios.provincia_id = ${filter.provincia_id})`
            );
        }

        const posts = await query.paginate(page, limit);
        return posts.toJSON();
    }

    static async getAppraisals(page = 1, limit = 20, filter, orderBy = 'updated_at', auth) {
        const query = Database
            .from('posts')
            .select(
                'posts.id', 'posts.plan_id', 'posts.opdo', 'posts.price', 'posts.area',
                'posts.address', 'posts.created_at', 'posts.bedrooms', 'posts.bathrooms',
                'municipios.title as municipio', 'provincias.cod as provincia'
            )
            .leftJoin('owners', 'owners.post_id', 'posts.id')
            .innerJoin('users', 'posts.user_id', 'users.id')
            .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
            .innerJoin('provincias', 'provincias.id', 'municipios.provincia_id')
            .whereNull('posts.plan_id')
            .orderBy(`posts.${orderBy}`, 'DESC');

        if (auth.user.role === User.roles().AGENT) {
            query.andWhere('posts.user_id', auth.user.id);
        }
        if (auth.user.role === User.roles().MANAGER) {
            query.andWhere('users.office_id', auth.user.office_id);
        }

        if (filter) {
            if (filter.provincia) {
                query.andWhere('provincias.id', filter.provincia)
            }
            if (filter.municipio) {
                query.andWhere('municipios.id', filter.municipio)
            }
            if (filter.homeType) {
                query.andWhere('posts.home_type_id', filter.homeType);
            }
            if (filter.bedrooms) {
                query.andWhere('posts.bedrooms', filter.bedrooms);
            }
            if (filter.bathrooms) {
                query.andWhere('posts.bathrooms', filter.bathrooms);
            }
            if (filter.minPrice) {
                query.andWhere('posts.price', '>=', filter.minPrice);
            }
            if (filter.maxPrice) {
                query.andWhere('posts.price', '<=', filter.maxPrice);
            }
        }

        const posts = await query.paginate(page, limit);
        return posts;
    }

    static async getRecommendedPost(limit = 6) {
        const query = Database
            .from('posts')
            .select(
                'posts.id', 'posts.plan_id', 'plans.type as plan_title', 'posts.opdo', 'posts.price', 'posts.area',
                'posts.address', 'posts.published_at', 'posts.bedrooms', 'posts.bathrooms', 'images.url as image',
                'municipios.title as municipio', 'provincias.cod as provincia'
            )
            .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
            .innerJoin('provincias', 'provincias.id', 'municipios.provincia_id')
            .innerJoin('plans', 'plans.id', 'posts.plan_id')
            .innerJoin('images', function () {
                this
                    .on('posts.id', 'images.post_id')
                    .andOn('images.default', true)
            })
            .whereNotNull('posts.published_at')
            .andWhere('posts.plan_id', 1)
            .andWhere('posts.sold', '<>', true)
            .whereRaw('EXTRACT(month FROM posts.published_at) in (EXTRACT(month FROM now()), EXTRACT(month FROM now())-1)')
            .orderBy(`posts.opdo`, 'DESC')
            .limit(limit)

        const posts = await query;
        // const posts = await query.paginate(1, limit);
        return posts;
    }

    static async getPostsAux(request) {
        const provincia = request.input('provincia');
        const municipio = request.input('municipio');
        const homeType = request.input('homeType');
        const plan_id = request.input('plan_id');
        const bedrooms = request.input('bedrooms');
        const bathrooms = request.input('bathrooms');
        const minPrice = request.input('minPrice');
        const maxPrice = request.input('maxPrice');
        const page = request.input('page') ? request.input('page') : 1;

        const query = Database
            .from('posts')
            .select(
                'posts.id', 'posts.plan_id', 'plans.type as plan_title', 'posts.opdo', 'posts.price', 'posts.area', 'posts.address',
                'posts.published_at', 'posts.bedrooms', 'posts.bathrooms', 'posts.sold', 'images.url as image',
                'municipios.title as municipio', 'provincias.cod as provincia'
            )
            .leftJoin('users', 'users.id', 'posts.user_id')
            .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
            .innerJoin('provincias', 'provincias.id', 'municipios.provincia_id')
            .innerJoin('plans', 'plans.id', 'posts.plan_id')
            .leftJoin('images', function () {
                this
                    .on('posts.id', 'images.post_id')
                    .andOn('images.default', true)
            })
            .whereNotNull('posts.published_at')
            //.whereRaw('posts.closed_at >= now()')
            .orderBy('plans.ranking', 'ASC')
            .orderBy('posts.opdo', 'DESC')
            .orderBy('posts.published_at', 'DESC');

        if (provincia) {
            query.andWhere('provincias.id', provincia)
        }
        if (municipio) {
            query.andWhere('municipios.id', municipio)
        }
        if (homeType) {
            query.andWhere('posts.home_type_id', homeType);
        }
        if (plan_id) {
            query.andWhere('posts.plan_id', plan_id);
        }
        if (bedrooms) {
            query.andWhere('posts.bedrooms', bedrooms);
        }
        if (bathrooms) {
            query.andWhere('posts.bathrooms', bathrooms);
        }
        if (minPrice) {
            query.andWhere('posts.price', '>=', minPrice);
        }
        if (maxPrice) {
            query.andWhere('posts.price', '<=', maxPrice);
        }

        const posts = await query.paginate(page, 24);
        return posts
    }

    static async getPostDetail(id) {
        const post = await Database
            .from('posts')
            .select(
                'posts.id', 'posts.plan_id', 'plans.type as plan_title', 'posts.opdo', 'posts.evi', 'posts.price', 'posts.area', 'posts.address',
                'posts.published_at', 'posts.bedrooms', 'posts.bathrooms', 'posts.built_year', 'posts.build_status',
                'posts.summary', 'home_types.title as homeType',
                'municipios.title as municipio', 'provincias.cod as provincia', 'provincias.title as provincia_title',
                'posts.user_id', 'users.fullname as agent_name', 'users.email as agent_email', 'users.telephone as agent_phone',
                'owners.fullname as owner_name', 'owners.email as owner_email', 'owners.telephone as owner_phone',
                'var_flexibilidads.area_crecimiento', 'post_visits.total as visits',
                'vde.valor_arquitectonico', 'vde.valor_urbano'
            )
            .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
            .innerJoin('provincias', 'provincias.id', 'municipios.provincia_id')
            .leftJoin('users', 'users.id', 'posts.user_id')
            .innerJoin('home_types', 'home_types.id', 'posts.home_type_id')
            .leftJoin('plans', 'plans.id', 'posts.plan_id')
            .leftJoin('owners', 'owners.post_id', 'posts.id')
            .leftJoin('post_visits', 'posts.id', 'post_visits.post_id')
            .leftJoin('var_flexibilidads', 'posts.id', 'var_flexibilidads.post_id')
            .leftJoin('var_diseno_esteticas as vde', 'posts.id', 'vde.post_id')
            .where('posts.id', id)
            .first()

        return post;
    }

    /**
     * Devuelve la informacion del post en formato de presentacion para Pdf
     *
     * @param id
     * @returns {Promise<Array>}
     */
    static async getPostContent(id) {
        const post = await this.getPostDetail(id)
        const postPlaces = await PostPlace.getPostPLaces(id)
        const segCiudadana = await NomSegCiudadana.getPostSegCiudadana(id)
        const itemsInfUrbana = await InfUrbana.getInfUrbana(id)
        const itemsVisuales = await EnvElement.getEnvElements(id)
        const itemsEstConstructiva = await EstConstructiva.getEstConstructiva(id)
        const itemsServPublicos = await ServPublico.getServPublicos(id)
        const riesgo = await Riesgo.getRiesgoDesastre(id)
        const confortAmbiental = await VarConforEficiencia.getConfortAmbiental(id)
        const menaje = await VarMenaje.getMenaje(id)

        try {
            let otherPlaces = ''
            for (let place of postPlaces) {
                otherPlaces += place.title + ', '
            }
            const header = [
                {
                    absolutePosition: {x: 0, y: 0},
                    canvas: [
                        {
                            type: 'polyline',
                            lineWidth: 1,
                            closePath: true,
                            hLineColor: '#efeeee',
                            color: '#efeeee',
                            points: [{x: 0, y: 0}, {x: 600, y: 0}, {x: 600, y: 90}, {x: 0, y: 90}]
                        }
                    ]
                },
                {
                    absolutePosition: {x: 0, y: 0},
                    canvas: [
                        {
                            type: 'polyline',
                            lineWidth: 1,
                            closePath: true,
                            hLineColor: '#1070af',
                            color: '#1070af',
                            points: [{x: 323, y: 0}, {x: 343, y: 0}, {x: 293, y: 90}, {x: 273, y: 90}]
                        }
                    ]
                },
                {
                    absolutePosition: {x: 0, y: 0},
                    canvas: [
                        {
                            type: 'polyline',
                            lineWidth: 1,
                            closePath: true,
                            hLineColor: '#1070af',
                            color: '#1070af',
                            points: [{x: 350, y: 0}, {x: 600, y: 0}, {x: 600, y: 90}, {x: 300, y: 90}]
                        }
                    ]
                },
                {
                    image: 'public/images/logo_blue.png',
                    width: 30,
                    margin: [0, -10, 0, 0]
                },
                {
                    absolutePosition: {x: 75, y: 30},
                    text: 'opdomun',
                    fontSize: 28,
                    bold: true,
                    color: '#1070af'
                },
                {
                    absolutePosition: {x: 380, y: 42},
                    text: 'INFORME DETALLADO',
                    fontSize: 16,
                    color: '#FFFFFF'
                },
                {
                    absolutePosition: {x: 413, y: 63},
                    text: !post.plan_id ? 'Tasación de inmueble' : '',
                    fontSize: 11,
                    color: '#FFFFFF'
                }
            ]
            const footer = [
                {
                    text: [
                        'Documento generado por ',
                        {
                            text: 'OPDOMUN',
                            link: 'https://opdomun.com',
                            bold: true
                        }
                    ],
                    absolutePosition: {x: 45, y: 755},
                    fontSize: 11,
                },
                {
                    text: 'Agente: ' + (post.user_id ? post.agent_name : '(No tiene)'),
                    absolutePosition: {x: 45, y: 770},
                    fontSize: 11,
                },
                {
                    text: 'Fecha: ' + new Date().toLocaleString(),
                    absolutePosition: {x: 45, y: 785},
                    fontSize: 11,
                },
                {
                    absolutePosition: {x: 480, y: 720},
                    qr: 'https://opdomun.com/posts/' + id,
                    fit: 90
                }
            ]
            const body = [
                {
                    text: 'DIRECCIÓN:',
                    bold: true,
                    fontSize: 13,
                    margin: [0, 50, 0, 0],
                    fontFamily: "Arial"
                },
                {
                    text: post.provincia + ', ' + post.municipio + ', ' + post.address,
                    margin: [0, 0, 0, 10],
                },
                {
                    margin: [-5, 10],
                    layout: {
                        defaultBorder: false,
                        hLineColor: '#b4b4b4',
                    },
                    table: {
                        widths: ['*', '*', 20, '*', '*'],
                        body: [
                            [
                                {
                                    text: 'Precio:',
                                    border: [false, false, false, true],
                                    bold: true
                                },
                                {
                                    text: this.parsePrice(post.price),
                                    border: [false, false, false, true],
                                    alignment: 'right',
                                    fontSize: post.plan_id ? 12 : 14,
                                    bold: !post.plan_id
                                },
                                '',
                                {
                                    text: 'Área:',
                                    border: [false, false, false, true],
                                    bold: true
                                },
                                {
                                    text: post.area + ' m2',
                                    border: [false, false, false, true],
                                    alignment: 'right'
                                }
                            ],
                            [
                                {
                                    text: 'Habitaciones:',
                                    border: [false, false, false, true],
                                    bold: true
                                },
                                {
                                    text: post.bedrooms,
                                    border: [false, false, false, true],
                                    alignment: 'right'
                                },
                                '',
                                {
                                    text: 'Baños:',
                                    border: [false, false, false, true],
                                    bold: true
                                },
                                {
                                    text: post.bathrooms,
                                    border: [false, false, false, true],
                                    alignment: 'right'
                                }
                            ],
                            [
                                {
                                    text: 'Año construcción:',
                                    border: [false, false, false, true],
                                    bold: true
                                },
                                {
                                    text: post.built_year,
                                    border: [false, false, false, true],
                                    alignment: 'right'
                                },
                                '',
                                {
                                    text: 'Estado:',
                                    border: [false, false, false, true],
                                    bold: true
                                },
                                {
                                    text: post.build_status,
                                    border: [false, false, false, true],
                                    alignment: 'right'
                                }
                            ],
                            [
                                {
                                    text: 'Tipo de vivienda:',
                                    border: [false, false, false, true],
                                    bold: true
                                },
                                {
                                    text: post.homeType,
                                    border: [false, false, false, true],
                                    alignment: 'right'
                                },
                                '',
                                {
                                    text: 'Publicado:',
                                    border: [false, false, false, true],
                                    bold: true
                                },
                                {
                                    text: post.published_at ? post.published_at.toLocaleDateString() : '',
                                    border: [false, false, false, true],
                                    alignment: 'right'
                                }
                            ],
                        ]
                    }
                },
                {
                    text: 'Otros espacios:',
                    bold: true
                },
                {
                    text: otherPlaces,
                },
                {
                    text: 'Resumen:',
                    bold: true,
                    margin: [0, 10, 0, 0]
                },
                {
                    text: post.summary,
                }
            ]
            if (post.plan_id != 4) {
                body[2].table.body.unshift([
                    {
                        text: 'Índice Op:',
                        border: [false, false, false, true],
                        bold: true
                    },
                    {
                        text: post.opdo + ' Op',
                        border: [false, false, false, true],
                        alignment: 'right'
                    },
                    '',
                    {
                        text: 'Evaluación:',
                        border: [false, false, false, true],
                        bold: true
                    },
                    {
                        text: post.evi,
                        border: [false, false, false, true],
                        alignment: 'right'
                    }
                ]);
            }

            if (itemsEstConstructiva.length > 0) {
                body.push({
                    text: 'Solución técnico constructiva:',
                    bold: true,
                    margin: [0, 15, 0, 0]
                })
                const table = {
                    layout: {
                        defaultBorder: false,
                        hLineColor: '#b4b4b4',
                    },
                    table: {
                        widths: [100, '*'],
                        body: []
                    }
                }
                for (let item of itemsEstConstructiva) {
                    table.table.body.push(
                        [
                            {
                                text: item.title,
                                border: [false, false, false, true]
                            },
                            {
                                text: item.display_value,
                                border: [false, false, false, true]
                            },
                        ]
                    )
                }
                body.push(table)
            }

            if (confortAmbiental) {
                body.push({
                    text: 'Confort ambiental y eficiencia energética:',
                    bold: true,
                    margin: [0, 15, 0, 0]
                })
                const dicc = VarConforEficiencia.getDicc()
                let windowsCategory = '';
                dicc.windows_category.forEach(item => {
                    if (item.value == confortAmbiental.window_category) {
                        windowsCategory = item.text;
                    }
                });
                let puntal = '';
                dicc.puntal.forEach(item => {
                    if (item.value == confortAmbiental.puntal) {
                        puntal = item.text;
                    }
                });
                let solarProtection = '';
                dicc.solar_protection.forEach(item => {
                    if (item.value == confortAmbiental.solar_protection) {
                        solarProtection = item.text;
                    }
                });

                body.push({
                    layout: {
                        defaultBorder: false,
                        hLineColor: '#b4b4b4',
                    },
                    table: {
                        widths: [180, '*'],
                        body: [
                            [
                                {
                                    text: 'Tipo de ventana',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: windowsCategory,
                                    border: [false, false, false, true]
                                },
                            ],
                            [
                                {
                                    text: 'Área de ventana',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: confortAmbiental.window_area + ' m2',
                                    border: [false, false, false, true]
                                },
                            ],
                            [
                                {
                                    text: 'Puntal',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: puntal,
                                    border: [false, false, false, true]
                                },
                            ],
                            [
                                {
                                    text: 'Protección solar de la cubierta',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: solarProtection,
                                    border: [false, false, false, true]
                                },
                            ],
                            [
                                {
                                    text: 'Protección de la fachada Este',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: confortAmbiental.east_protection == 100 ? 'Elemento Vertical ' : 'Sin protección',
                                    border: [false, false, false, true]
                                },
                            ],
                            [
                                {
                                    text: 'Protección de la fachada Sur',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: confortAmbiental.south_protection == 100 ? 'Elemento Horizontal ' : 'Sin protección',
                                    border: [false, false, false, true]
                                },
                            ],
                            [
                                {
                                    text: 'Protección de la fachada Oeste',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: confortAmbiental.west_protection == 100 ? 'Elemento Vertical ' : 'Sin protección',
                                    border: [false, false, false, true]
                                },
                            ]
                        ]
                    }
                })
            }

            if (itemsServPublicos.length > 0) {
                body.push({
                    text: 'Distancia de la vivienda hasta los servicios públicos:',
                    bold: true,
                    margin: [0, 15, 0, 0]
                })
                const table = {
                    layout: {
                        defaultBorder: false,
                        hLineColor: '#b4b4b4',
                    },
                    table: {
                        widths: ['*', 120],
                        body: []
                    }
                }

                for (let item of itemsServPublicos) {
                    table.table.body.push(
                        [
                            {
                                text: item.title,
                                border: [false, false, false, true]
                            },
                            {
                                text: item.display_value,
                                border: [false, false, false, true]
                            },
                        ]
                    )
                }
                body.push(table)
            }

            if (itemsVisuales.length > 0) {
                const displayValuesVisuales = {
                    '100': '1ER PLANO',
                    '80': '2DO PLANO',
                    '75': '3ER PLANO'
                }
                body.push({
                    text: 'Visuales desde la vivienda y calidad del paisaje:',
                    bold: true,
                    margin: [0, 15, 0, 0]
                })
                const table = {
                    layout: {
                        defaultBorder: false,
                        hLineColor: '#b4b4b4',
                    },
                    table: {
                        widths: ['*', 120],
                        body: []
                    }
                }
                for (let item of itemsVisuales) {
                    table.table.body.push(
                        [
                            {
                                text: item.title,
                                border: [false, false, false, true]
                            },
                            {
                                text: displayValuesVisuales[item.value],
                                border: [false, false, false, true]
                            },
                        ]
                    )
                }
                body.push(table)
            }

            if (itemsInfUrbana.length > 0) {
                const displayValuesInfUrbana = {
                    '100': 'Excelente',
                    '80': 'Bueno',
                    '60': 'Regular',
                    '40': 'Malo',
                    '0': 'No hay'
                }

                body.push({
                    text: 'Calidad de la infraestructura urbana:',
                    bold: true,
                    margin: [0, 15, 0, 0]
                })

                const table = {
                    layout: {
                        defaultBorder: false,
                        hLineColor: '#b4b4b4',
                    },
                    table: {
                        widths: ['*', 120],
                        body: []
                    }
                }
                for (let item of itemsInfUrbana) {
                    table.table.body.push(
                        [
                            {
                                text: item.title,
                                border: [false, false, false, true]
                            },
                            {
                                text: displayValuesInfUrbana[item.value],
                                border: [false, false, false, true]
                            },
                        ]
                    )
                }
                body.push(table)
            }

            if (riesgo) {
                let riskText = '';
                if (riesgo.value == 100) {
                    riskText = 'La vivienda NO se encuentra ubicada en una zona de riesgo de desastres.'
                } else {
                    const riskTypes = Riesgo.getRiskTypes();
                    riskText = 'La vivienda se encuentra ubicada en ' + riskTypes[riesgo.type] + '.';
                }
                body.push([
                        {
                            text: 'Riesgo de desastres:',
                            bold: true,
                            margin: [0, 10, 0, 0]
                        },
                        {
                            text: riskText
                        }
                    ]
                )
            }

            if (segCiudadana) {
                body.push({
                    text: [
                        {
                            text: 'Seguridad ciudadana:  ',
                            bold: true
                        },
                        segCiudadana.title
                    ],
                    margin: [0, 10, 0, 0]
                })
            }

            if (post.area_crecimiento) {
                body.push({
                    text: [
                        {
                            text: 'Área de posible crecimiento:  ',
                            bold: true
                        },
                        post.area_crecimiento + ' m2'
                    ],
                    margin: [0, 10, 0, 0]
                })
            }

            if (post.valor_arquitectonico && post.valor_urbano) {
                const scale = {
                    '100': 'Muy alto',
                    '80': 'Alto',
                    '60': 'Medio',
                    '40': 'Bajo',
                    '20': 'Muy bajo',
                }
                body.push([{
                    text: {
                        text: 'Calidad de diseño y estética:',
                        bold: true
                    },
                    margin: [0, 10, 0, 0]
                }, {
                    layout: {
                        defaultBorder: false,
                        hLineColor: '#b4b4b4',
                    },
                    table: {
                        widths: ['*', '*'],
                        body: [
                            [
                                {
                                    text: 'Valores arquitectónicos:',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: scale[post.valor_arquitectonico],
                                    border: [false, false, false, true]
                                },
                            ],
                            [
                                {
                                    text: 'Valores urbanos:',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: scale[post.valor_urbano],
                                    border: [false, false, false, true]
                                },
                            ]
                        ]
                    }
                }])
            }

            if (menaje) {
                body.push({
                    text: {
                        text: 'Menaje del hogar:',
                        bold: true
                    },
                    margin: [0, 10, 0, 0]
                });

                let moviliario = ' ';
                if (menaje.moviliario && menaje.moviliario.length > 0) {
                    for (let item of menaje.moviliario) {
                        moviliario += item.title + ', '
                    }
                    body.push({
                        text: {
                            text: moviliario,
                        }
                    });
                }

                let electrodomesticos = '';
                if (menaje.electrodomestico && menaje.electrodomestico.length > 0) {
                    for (let item of menaje.electrodomestico) {
                        electrodomesticos += item.title + ', '
                    }
                    body.push({
                        text: {
                            text: electrodomesticos,
                        }
                    });
                }
            }

            let content = []
            content.push(header)
            content.push(body)
            content.push(footer)

            return content
        } catch (e) {
            throw e
        }
    }

    static async getMatchedPremiumPost({provinciaId, municipios, minPrice, maxPrice, homeTypes}) {
        const posts = Database
            .from('posts')
            .select(
                'posts.id', 'posts.price', 'posts.bedrooms', 'posts.bathrooms', 'posts.home_type_id',
                'posts.municipio_id', 'municipios.provincia_id', 'owners.fullname', 'owners.email', 'owners.telephone'
            )
            .innerJoin('municipios', 'municipios.id', 'posts.municipio_id')
            .innerJoin('owners', 'posts.id', 'owners.post_id')
            .whereNotNull('posts.published_at')
            .whereNotNull('owners.email')
            .whereRaw('posts.closed_at >= now()')
            .andWhere('posts.plan_id', 1)
            .andWhere('posts.sold', '<>', true);

        if (provinciaId) {
            posts.andWhere('municipios.provincia_id', provinciaId);
        }

        if (municipios) {
            posts.whereIn('posts.municipio_id', municipios.split(','))
        }

        if (homeTypes) {
            posts.whereIn('posts.home_type_id', homeTypes.split(','))
        }

        if (minPrice) {
            posts.andWhere('posts.price', '>=', minPrice);
        }

        if (maxPrice) {
            posts.andWhere('posts.price', '<=', maxPrice);
        }

        return await posts;
    }

    async calculatePrice() {
        const municipio = await Municipio.find(this.municipio_id);
        this.opdo = await this.getAvgOpdo(this.municipio_id, municipio.provincia_id);
        await this.load('postVariables');
        let postVariables = await this.getRelated('postVariables');
        postVariables = postVariables.toJSON();
        let x = 0;
        for (let variable of postVariables) {
            if (variable.result != null) {
                x++;
            }
        }
        if (x == postVariables.length) {
            this.price = Math.round(this.evi / this.opdo);
            await this.save();
            return this.price;
        } else {
            return false;
        }
    }

    user() {
        return this.belongsTo('App/Models/User');
    }

    post() {
        return this.belongsTo('App/Models/Post');
    }

    address() {
        return this.belongsTo('App/Models/Address');
    }

    homeType() {
        return this.belongsTo('App/Models/HomeType');
    }

    plan() {
        return this.belongsTo('App/Models/Plan')
    }

    images() {
        return this.hasMany('App/Models/Image')
    }

    postVariables() {
        return this.hasMany('App/Models/PostVariable')
    }

    postPlaces() {
        return this.hasMany('App/Models/PostPlace')
    }

    hisPosts() {
        return this.hasMany('App/Models/HisPost')
    }

    varFlexibilidad() {
        return this.hasOne('App/Models/VarFlexibilidad')
    }

    varConforEficiencia() {
        return this.hasOne('App/Models/VarConforEficiencia')
    }

    varDisenoEstetica() {
        return this.hasOne('App/Models/VarDisenoEstetica')
    }

    varMenaje() {
        return this.hasOne('App/Models/VarMenaje')
    }

    owner() {
        return this.hasOne('App/Models/Owner')
    }

    postVisit() {
        return this.hasOne('App/Models/PostVisit')
    }
}

module.exports = Post
