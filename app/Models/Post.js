'use strict'

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
const User = use('App/Models/User')
const Plan = use('App/Models/Plan')
const Address = use('App/Models/Address')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const CurrencyService = use('App/Services/CurrencyService')
const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)

function strToBool(s) {
    const regex = /^\s*(true|1)\s*$/i
    return regex.test(s)
}

class Post extends Model {
    static boot() {
        super.boot()
        this.addTrait('@provider:SerializerExtender')
        this.addTrait('Opdo')
        this.addTrait('CastDate')
        this.addTrait('Auth')
    }

    static get Serializer() {
        return 'App/Models/Serializers/PostSerializer'
    }

    static get hidden() {
        return ['planId', 'homeTypeId', 'addressId', 'managedById', 'updatedAt', 'expired'];
    }

    static get computed () {
        return ['expired']
    }

    getExpired ({ closedAt }) {
        const now = moment();
        return closedAt && moment(closedAt).isBefore(now) ?  true : false
    }

    static BUILD_STATUS_TYPES() {
        return {
            EXCELENT: 'EXCELLENT',
            VERY_GOOD: 'VERY_GOOD',
            GOOD: 'GOOD',
            REGULAR: 'REGULAR',
            BAD: 'BAD',
            VERY_BAD: 'VERY_BAD',
            DEMOLITION: 'DEMOLITION'
        }
    }

    /**
     * Return price as object
     * @param price
     * @returns {{currency: string, value: number}}
     */
    getPrice(price) {
        return {
            value: CurrencyService.transform(price, CurrencyService.BASE_CURRENCY(), CurrencyService.DEFAULT_CURRENCY()),
            currency: CurrencyService.DEFAULT_CURRENCY(),
        }
    }

    /**
     * Price setter
     * @param price
     * @returns {*}
     */
    setPrice(price) {
        return price ? CurrencyService.transform(price.value, price.currency, CurrencyService.BASE_CURRENCY()) : null;
    }

    static async getPost(id, auth) {
        let post = await Post
            .query()
            .with('plan')
            .with('managedBy')
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

        const user = await this.authUser(auth)
        return post.toJSON(user ? user.toJSON(): null)
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
            .whereRaw('posts.closed_at > now()')
            .where('plans.id', 1)
            .where('posts.sold', '<>', true)
            .orderBy('posts.opdo', 'desc')
            .limit(3);

        return posts;
    }

    static async getFeaturedPosts(page = 1, limit = 3, auth) {
        const query = Post
            .query()
            .with('managedBy')
            .with('address.localidad.municipio.provincia')
            .with('images', (builder) => {
                builder.where('default', true)
            })
            .where('planId', 1)
            .whereNotNull('publishedAt')
            .whereRaw('EXTRACT(month FROM posts.published_at) in (EXTRACT(month FROM now()), EXTRACT(month FROM now())-1) AND closed_at > now()')
            .whereNull('soldAt')
            .orderBy('posts.opdo', 'desc');

        let posts = await query.paginate(page, limit)

        const user = await this.authUser(auth)
        return posts.toJSON(user ? user.toJSON() : null)
    }

    static async getPosts(planId = null, page = 1, limit = 20, filter, auth) {
        const query = Post
            .query()
            .setVisible(['id', 'price', 'area', 'bedrooms', 'bathrooms', 'publishedAt', 'closedAt', 'sold', 'expired'])
            .with('plan', (builder) => {
                builder.setVisible(['id', 'type'])
            })
            .with('address.localidad.municipio.provincia')
            .with('owner')
            .with('images', (builder) => {
                builder.where('default', true)
            })
            .orderBy('updatedAt', 'DESC')

        if (auth.user.role === User.roles().MANAGER) {
            query.whereRaw(
                `posts.id IN (SELECT posts.id FROM posts 
                INNER JOIN users ON users.id = posts.managed_by_id WHERE users.office_id = ${auth.user.officeId}) OR
                posts.id IN (SELECT posts.id FROM posts 
                INNER JOIN owners ON owners.post_id = posts.id WHERE owners.user_id = ${auth.user.id})`
            );
        }

        if (auth.user.role === User.roles().AGENT) {
            query.whereRaw(
                `posts.managed_by_id = ${auth.user.id} OR
                posts.id IN (SELECT posts.id FROM posts 
                INNER JOIN owners ON owners.post_id = posts.id WHERE owners.user_id = ${auth.user.id})`
            );
        }

        if (auth.user.role === User.roles().CLIENT) {
            query.whereRaw(
                `posts.id IN (SELECT posts.id FROM posts 
                INNER JOIN owners ON owners.post_id = posts.id WHERE owners.user_id = ${auth.user.id})`
            );
        }

        if (strToBool(filter.myPosts)) {
            query.whereRaw(
                `posts.managed_by_id = ${auth.user.id} OR posts.id IN (SELECT posts.id FROM posts
                INNER JOIN owners ON owners.post_id = posts.id WHERE owners.user_id = ${auth.user.id})`
            );
        }

        if (planId) {
            if (parseInt(planId) === -1) {
                query.whereNull('posts.planId')
            } else {
                query.andWhere('posts.planId', parseInt(planId));
            }
        }

        if (filter.homeTypeId) {
            query.andWhere('posts.homeTypeId', filter.homeTypeId);
        }
        if (filter.bedrooms) {
            query.andWhere('posts.bedrooms', filter.bedrooms);
        }
        if (filter.bathrooms) {
            query.andWhere('posts.bathrooms', filter.bathrooms);
        }
        if (filter.minPrice) {
            // Get the current currency
            const currentCurrency = auth.user ? auth.user.preferredCurrency : CurrencyService.DEFAULT_CURRENCY()
            // Transform price to base currency
            const value = CurrencyService.transform(filter.minPrice, currentCurrency, CurrencyService.BASE_CURRENCY())
            query.andWhere('posts.price', '>=', value);
        }
        if (filter.maxPrice) {
            // Get the current currency
            const currentCurrency = auth.user ? auth.user.preferredCurrency : CurrencyService.DEFAULT_CURRENCY()
            // Transform price to base currency
            const value = CurrencyService.transform(filter.maxPrice, currentCurrency, CurrencyService.BASE_CURRENCY())
            query.andWhere('posts.price', '<=', value);
        }

        if (filter.localidadId) {
            query.whereRaw(
                `posts.address_id IN (SELECT addresses.id FROM addresses 
                WHERE addresses.localidad_id = ${filter.localidadId})`
            );
        }

        if (filter.municipioId) {
            query.whereRaw(
                `posts.address_id IN (SELECT addresses.id FROM addresses 
                INNER JOIN localidads ON localidads.id = addresses.localidad_id 
                WHERE localidads.municipio_id = ${filter.municipioId})`
            );
        }

        if (filter.provinciaId) {
            query.whereRaw(
                `posts.address_id IN (SELECT addresses.id FROM addresses 
                INNER JOIN localidads ON localidads.id = addresses.localidad_id 
                INNER JOIN municipios ON municipios.id = localidads.municipio_id 
                WHERE municipios.provincia_id = ${filter.provinciaId})`
            );
        }

        let posts = await query.paginate(page, limit)

        try {
            const user = await auth.getUser();
            posts = posts.toJSON(user.toJSON())
        } finally {
            return posts
        }
    }

    static async getPublishedPosts(planId = null, page = 1, limit = 20, filter, auth) {
        const query = Post
            .query()
            .setVisible(['id', 'price', 'opdo', 'area', 'bedrooms', 'bathrooms', 'publishedAt', 'sold'])
            .with('plan', (builder) => {
                builder.setVisible(['id', 'type'])
            })
            .with('address.localidad.municipio.provincia')
            .with('images', (builder) => {
                builder.where('default', true)
            })
            .whereNotNull('posts.publishedAt')
            .whereRaw('closed_at > now()')
            .orderBy('posts.planId', 'ASC')
            .orderBy('posts.opdo', 'DESC');

        if (planId) {
            query.andWhere('posts.planId', planId);
        }

        if (filter.homeTypeId) {
            query.andWhere('posts.homeTypeId', filter.homeTypeId);
        }
        if (filter.bedrooms) {
            query.andWhere('posts.bedrooms', filter.bedrooms);
        }
        if (filter.bathrooms) {
            query.andWhere('posts.bathrooms', filter.bathrooms);
        }

        let user = null;
        try {
            user = await auth.getUser();
        } catch (e) {
        }

        if (filter.minPrice) {
            // Get the current currency
            const currentCurrency = user ? user.preferredCurrency : CurrencyService.DEFAULT_CURRENCY()
            // Transform price to base currency
            const value = CurrencyService.transform(filter.minPrice, currentCurrency, CurrencyService.BASE_CURRENCY())
            query.andWhere('posts.price', '>=', value);
        }
        if (filter.maxPrice) {
            // Get the current currency
            const currentCurrency = user ? user.preferredCurrency : CurrencyService.DEFAULT_CURRENCY()
            // Transform price to base currency
            const value = CurrencyService.transform(filter.maxPrice, currentCurrency, CurrencyService.BASE_CURRENCY())
            query.andWhere('posts.price', '<=', value);
        }

        if (filter.localidadId) {
            query.whereRaw(
                `posts.address_id IN (SELECT addresses.id FROM addresses 
                WHERE addresses.localidad_id = ${filter.localidadId})`
            );
        }

        if (filter.municipioId) {
            query.whereRaw(
                `posts.address_id IN (SELECT addresses.id FROM addresses 
                INNER JOIN localidads ON localidads.id = addresses.localidad_id 
                WHERE localidads.municipio_id = ${filter.municipioId})`
            );
        }

        if (filter.provinciaId) {
            query.whereRaw(
                `posts.address_id IN (SELECT addresses.id FROM addresses 
                INNER JOIN localidads ON localidads.id = addresses.localidad_id 
                INNER JOIN municipios ON municipios.id = localidads.municipio_id 
                WHERE municipios.provincia_id = ${filter.provinciaId})`
            );
        }

        let posts = await query.paginate(page, limit)

        if (user) {
            return posts.toJSON(user.toJSON())
        } else {
            return posts.toJSON()
        }
    }

    static async getRecommendedPost(limit = 6, auth) {
        const posts = await Post
            .query()
            .setVisible(['id', 'price', 'opdo', 'area', 'bedrooms', 'bathrooms', 'publishedAt', 'sold'])
            .with('plan', (builder) => {
                builder.setVisible(['id', 'type'])
            })
            .with('address.localidad.municipio.provincia')
            .with('images', (builder) => {
                builder.where('default', true)
            })
            .whereNotNull('posts.publishedAt')
            .where('posts.closedAt', '>=', new Date())
            .where('posts.planId', 1)
            .whereNull('soldAt')
            .whereRaw('EXTRACT(month FROM posts.published_at) in (EXTRACT(month FROM now()), EXTRACT(month FROM now())-1)')
            .whereRaw('closed_at > now()')
            .orderBy('posts.planId', 'ASC')
            .orderBy('posts.opdo', 'DESC')
            .limit(limit)
            .fetch();

        const user = await this.authUser(auth)
        return posts.toJSON(user ? user.toJSON() : null)
    }

    static async getPostDetail(id) {
        const post = await Database
            .from('posts')
            .select(
                'posts.id', 'posts.plan_id as planId', 'plans.type', 'posts.opdo', 'posts.evi', 'posts.price', 'posts.area',
                'addresses.description as addressDescription', 'localidads.title as localidad',
                'municipios.title as municipio', 'provincias.cod as provincia', 'provincias.title as provinciaTitle',
                'posts.published_at as publishedAt', 'posts.bedrooms', 'posts.bathrooms', 'posts.built_year as builtYear', 'posts.build_status as buildStatus',
                'posts.summary', 'home_types.title as homeType',
                'posts.managed_by_id', 'users.fullname as agentName', 'users.email as agentEmail', 'users.telephone as agentPhone',
                'owners.fullname as owner_name', 'owners.email as owner_email', 'owners.telephone as owner_phone',
                'var_flexibilidads.area_crecimiento', 'post_visits.total as visits',
                'vde.valor_arquitectonico', 'vde.valor_urbano'
            )
            .innerJoin('addresses', 'addresses.id', 'posts.address_id')
            .innerJoin('localidads', 'localidads.id', 'addresses.localidad_id')
            .innerJoin('municipios', 'municipios.id', 'localidads.municipio_id')
            .innerJoin('provincias', 'provincias.id', 'municipios.provincia_id')
            .leftJoin('users', 'users.id', 'posts.managed_by_id')
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
        if (!post) {
            throw new ResourceNotFoundException();
        }
        const postPlaces = (await PostPlace.getPostPLaces(id)).toJSON()
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
                    text: !post.planId ? 'Tasación de inmueble' : '',
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
                    text: 'Agente: ' + (post.managed_by_id ? post.agent_name : '(No tiene)'),
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
                    text: post.provincia + ', ' + post.municipio + ', ' + post.localidad + ', ' + post.addressDescription,
                    margin: [0, 0, 0, 10]
                },
                {
                    margin: [-5, 10],
                    layout: {
                        defaultBorder: false,
                        hLineColor: '#b4b4b4'
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
                                    fontSize: post.planId ? 12 : 14,
                                    bold: !post.planId
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
                                    text: post.builtYear,
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
                                    text: post.buildStatus,
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
                                    text: post.publishedAt ? post.publishedAt.toLocaleDateString() : '',
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
                    text: otherPlaces
                },
                {
                    text: 'Resumen:',
                    bold: true,
                    margin: [0, 10, 0, 0]
                },
                {
                    text: post.summary
                }
            ]
            if (post.planId !== 2) {
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

            if (itemsEstConstructiva && itemsEstConstructiva.length > 0) {
                body.push({
                    text: 'Solución técnico constructiva:',
                    bold: true,
                    margin: [0, 15, 0, 0]
                })
                const table = {
                    layout: {
                        defaultBorder: false,
                        hLineColor: '#b4b4b4'
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
                                text: item.displayValue,
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
                dicc.windowsCategory.forEach(item => {
                    if (item.value === confortAmbiental.windowCategory) {
                        windowsCategory = item.text;
                    }
                });
                let puntal = '';
                dicc.puntal.forEach(item => {
                    if (item.value === confortAmbiental.puntal) {
                        puntal = item.text;
                    }
                });
                let solarProtection = '';
                dicc.solarProtection.forEach(item => {
                    if (item.value === confortAmbiental.solarProtection) {
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
                                    text: confortAmbiental.windowArea + ' m2',
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
                                    text: confortAmbiental.eastProtection === 100 ? 'Elemento Vertical ' : 'Sin protección',
                                    border: [false, false, false, true]
                                },
                            ],
                            [
                                {
                                    text: 'Protección de la fachada Sur',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: confortAmbiental.southProtection === 100 ? 'Elemento Horizontal ' : 'Sin protección',
                                    border: [false, false, false, true]
                                },
                            ],
                            [
                                {
                                    text: 'Protección de la fachada Oeste',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: confortAmbiental.westProtection === 100 ? 'Elemento Vertical ' : 'Sin protección',
                                    border: [false, false, false, true]
                                },
                            ]
                        ]
                    }
                })
            }

            if (itemsServPublicos && itemsServPublicos.length > 0) {
                body.push({
                    text: 'Distancia de la vivienda hasta los servicios públicos:',
                    bold: true,
                    margin: [0, 15, 0, 0]
                })
                const table = {
                    layout: {
                        defaultBorder: false,
                        hLineColor: '#b4b4b4'
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
                                text: item.displayValue,
                                border: [false, false, false, true]
                            },
                        ]
                    )
                }
                body.push(table)
            }

            if (itemsVisuales && itemsVisuales.length > 0) {
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
                        hLineColor: '#b4b4b4'
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
                            }
                        ]
                    )
                }
                body.push(table)
            }

            if (itemsInfUrbana && itemsInfUrbana.length > 0) {
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
                            }
                        ]
                    )
                }
                body.push(table)
            }

            if (riesgo) {
                let riskText = '';
                if (riesgo.value === 100) {
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

            if (post.areaCrecimiento) {
                body.push({
                    text: [
                        {
                            text: 'Área de posible crecimiento:  ',
                            bold: true
                        },
                        post.areaCrecimiento + ' m2'
                    ],
                    margin: [0, 10, 0, 0]
                })
            }

            if (post.valorArquitectonico && post.valorUrbano) {
                const scale = {
                    '100': 'Muy alto',
                    '80': 'Alto',
                    '60': 'Medio',
                    '40': 'Bajo',
                    '20': 'Muy bajo'
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
                        hLineColor: '#b4b4b4'
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
                                    text: scale[post.valorArquitectonico],
                                    border: [false, false, false, true]
                                }
                            ],
                            [
                                {
                                    text: 'Valores urbanos:',
                                    border: [false, false, false, true]
                                },
                                {
                                    text: scale[post.valorUrbano],
                                    border: [false, false, false, true]
                                }
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
                            text: moviliario
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
                            text: electrodomesticos
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

    static async getMatchedPosts({provinciaId, municipios, homeTypes, minPrice, maxPrice}) {
        const posts = Database
            .from('posts')
            .select(
                'posts.id', 'posts.price', 'posts.bedrooms', 'posts.bathrooms',
                'home_types.id as homeTypeId', 'home_types.title as homeType',
                'addresses.description as addressDescription',
                'localidads.id as localidadId', 'localidads.title as localidad',
                'municipios.id as municipioId', 'municipios.title as municipio',
                'provincias.id as provinciaId', 'provincias.title as provincia',
                'owners.fullname', 'owners.email', 'owners.telephone',
                'users.notifications_consent as notificationsConsent'
            )
            .innerJoin('plans', 'plans.id', 'posts.plan_id')
            .innerJoin('home_types', 'home_types.id', 'posts.home_type_id')
            .innerJoin('addresses', 'addresses.id', 'posts.address_id')
            .innerJoin('localidads', 'localidads.id', 'addresses.localidad_id')
            .innerJoin('municipios', 'municipios.id', 'localidads.municipio_id')
            .innerJoin('provincias', 'provincias.id', 'municipios.provincia_id')
            .innerJoin('owners', 'posts.id', 'owners.post_id')
            .innerJoin('users', 'users.id', 'owners.user_id')
            .whereNotNull('posts.published_at')
            .whereRaw('posts.closed_at > now()')
            .whereNull('posts.sold_at');

        if (provinciaId) {
            posts.andWhere('municipios.provincia_id', provinciaId);
        }

        if (municipios) {
            const ids = []
            municipios.forEach(m => {
                ids.push(m.id)
            })
            posts.whereIn('municipios.id', ids)
        }

        if (homeTypes) {
            const ids = []
            homeTypes.forEach(h => {
                ids.push(h.id)
            })
            posts.whereIn('posts.home_type_id', ids)
        }

        if (minPrice && minPrice.value) {
            posts.andWhere('posts.price', '>=', minPrice.value);
        }

        if (maxPrice) {
            posts.andWhere('posts.price', '<=', maxPrice.value);
        }

        return await posts;
    }

    async calculatePrice() {
        const address = await Address
            .query()
            .with('localidad.municipio')
            .where('id', this.addressId)
            .first();

        this.opdo = await this.getAvgOpdo(address.localidad.municipioId, address.localidad.municipio.provinciaId);
        await this.load('postVariables');
        let postVariables = await this.getRelated('postVariables');
        postVariables = postVariables.toJSON();
        let x = 0;
        for (let variable of postVariables) {
            if (variable.result != null) {
                x++;
            }
        }
        if (x === postVariables.length) {
            this.price = Math.round(this.evi / this.opdo);
            await this.save();
            return this.price;
        } else {
            return false;
        }
    }

    managedBy() {
        return this.belongsTo('App/Models/User', 'managedById', 'id');
    }

    address() {
        return this.belongsTo('App/Models/Address', 'addressId', 'id');
    }

    homeType() {
        return this.belongsTo('App/Models/HomeType', 'homeTypeId', 'id');
    }

    plan() {
        return this.belongsTo('App/Models/Plan', 'planId', 'id')
    }

    images() {
        return this.hasMany('App/Models/Image', 'id', 'postId')
    }

    postVariables() {
        return this.hasMany('App/Models/PostVariable', 'id', 'postId')
    }

    postPlaces() {
        return this.hasMany('App/Models/PostPlace', 'id', 'postId')
    }

    hisPosts() {
        return this.hasMany('App/Models/HisPost', 'id', 'postId')
    }

    varFlexibilidad() {
        return this.hasOne('App/Models/VarFlexibilidad', 'id', 'postId')
    }

    varConforEficiencia() {
        return this.hasOne('App/Models/VarConforEficiencia', 'id', 'postId')
    }

    varDisenoEstetica() {
        return this.hasOne('App/Models/VarDisenoEstetica', 'id', 'postId')
    }

    varMenaje() {
        return this.hasOne('App/Models/VarMenaje', 'id', 'postId')
    }

    owner() {
        return this.hasOne('App/Models/Owner', 'id', 'postId')
    }

    postVisit() {
        return this.hasOne('App/Models/PostVisit', 'id', 'postId')
    }
}

module.exports = Post
