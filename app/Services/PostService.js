'use strict'

const Post = use('App/Models/Post');
const Image = use('App/Models/Image');
const Variable = use('App/Models/Variable');
const PostVariable = use('App/Models/PostVariable');
const Database = use('Database');
const PostPlace = use('App/Models/PostPlace')
const Owner = use('App/Models/Owner')
const Plan = use('App/Models/Plan')
const Address = use('App/Models/Address')
const NotificationService = use('App/Services/NotificationService')
const AddressService = use('App/Services/AddressService')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')

class PostService {

    static async addPost(
        {
            plan,
            address,
            price = null,
            area,
            bedrooms,
            bathrooms,
            homeType,
            summary,
            postPlaces,
            owner,
            activeMonths
        },
        auth) {
        const addressObj = await AddressService.addAddress(address)
        let post = new Post();

        post = Object.assign(post, {
            managedById: auth.user.id,
            addressId: addressObj.id,
            planId: plan ? plan.id : null,
            price,
            area,
            bedrooms,
            bathrooms,
            homeTypeId: homeType.id,
            summary
        });

        await post.save();

        await Owner.addOwner({
            postId: post.id,
            userId: auth.user.id,
            email: owner.email,
            fullname: owner.fullname,
            telephone: owner.telephone
        });

        if (plan && activeMonths) {
            // Add expiration date to post
            await this.setExpirationDate(post.id, activeMonths);
        }

        await this.initPostVariable(post);
        await this.setAu(post, postPlaces);

        await post.calculateOpdo();
        post = await Post.getPost(post.id, auth);

        return post;
    }

    static async addFreePost(
        {
            address,
            price,
            area,
            bedrooms,
            bathrooms,
            homeType,
            summary,
            postPlaces,
            owner,
            images
        },
        auth
    ) {
        const freePlan = await Plan.findBy('type', Plan.TYPES().FREE)
        const activeMonths = 1;

        //Begin Transaction to save a Post
        const trx = await Database.beginTransaction()
        try {
            // Store Address
            let addressObj = new Address();
            addressObj.localidadId = address.localidad.id
            addressObj.description = address.description
            addressObj.coordinates = address.coordinates
            await addressObj.save(trx);

            // Store post
            let post = await addressObj.post()
                .create({
                    planId: freePlan.id,
                    price,
                    area,
                    bedrooms,
                    bathrooms,
                    homeTypeId: homeType.id,
                    summary,
                    publishedAt: new Date()
                }, trx);

            // Store owner
            await post.owner().create({
                fullname: owner.fullname,
                email: owner.email,
                telephone: owner.telephone,
                userId: auth.user.id
            }, trx);

            // Store images
            if (images && images.length) {
                const hasDefaultImage = images.find(img => img.default)
                if (!hasDefaultImage) {
                    images[0].default = true
                }

                await post.images()
                    .createMany(images, trx)
            }

            // End transaction
            await trx.commit();

            // Define post close date
            await this.setExpirationDate(post.id, activeMonths);

            await this.initPostVariable(post);
            if (postPlaces) {
                await this.setAu(post, postPlaces);
            }

            await post.calculateOpdo();
            post = await Post.getPost(post.id, auth);

            return post;
        } catch (e) {
            console.log(e)
            trx.rollback();
            throw new Error(e.message)
        }
    }

    static async setFreePost(postId, {
        price,
        area,
        bedrooms,
        bathrooms,
        homeType,
        summary,
        postPlaces,
        address = null,
        owner = null,
        images = null
    }, auth) {
        let post = await Post.find(postId);
        if (!post) {
            throw new ResourceNotFoundException();
        }

        //Begin Transaction to save a Post
        const trx = await Database.beginTransaction()
        try {
            post = Object.assign(post, {
                price,
                area,
                bedrooms,
                bathrooms,
                homeTypeId: homeType.id,
                summary
            });

            // Edit Owner
            if (owner) {
                await post.load('owner');
                const ownerObj = await post.getRelated('owner');
                ownerObj.fullname = owner.fullname;
                ownerObj.telephone = owner.telephone;
                ownerObj.email = owner.email;
                await ownerObj.save(trx)
            }

            // Edit address
            if (address) {
                await post.load('address');
                const addressObj = await post.getRelated('address');

                if (address.description) {
                    addressObj.description = address.description;
                }
                if (address.coordinates) {
                    addressObj.coordinates = address.coordinates;
                }

                await addressObj.save(trx)
            }

            // Store images
            if (images && images.length > 0) {
                await post.load('images')
                const currentImages = (await post.getRelated('images')).toJSON();
                console.log('news', images)
                console.log('current', currentImages)

                if (currentImages) {
                    const deprecatedImages = currentImages.filter(c => !images.find(i => c.id === i.id))
                    if (deprecatedImages) {
                        // Remove deprecated images.
                        const ids = []
                        deprecatedImages.map(img => {
                            ids.push(img.id)
                        });
                        console.log(ids)
                        await Image
                            .query()
                            .whereIn('id', ids)
                            .transacting(trx)
                            .delete()
                    }
                }

                // Check for default image
                const hasDefaultImage = images.find(img => img.default)
                if (!hasDefaultImage) {
                    images[0].default = true
                }

                let defaultFlag = false;
                images.forEach(async (img) => {
                    // Validate only one image by default
                    if (defaultFlag) img.default = false
                    else if (img.default) defaultFlag = true

                    if (img.id) {
                        await Image
                            .query()
                            .where('id', img.id)
                            .update({
                                url: img.url,
                                default: img.default,
                            }, trx)
                    } else {
                        await post
                            .images()
                            .create(img, trx)
                    }
                })
            }

            await this.setAu(post, postPlaces);

            await post.calculateOpdo();
            post = await Post.getPost(post.id, auth);

            // End transaction
            await trx.commit();

            return post;
        } catch (e) {
            console.log(e)
            trx.rollback();
            throw new Error(e.message)
        } finally {
        }
    }

    static async setPost(
        postId,
        {
            address,
            price,
            area,
            bedrooms,
            bathrooms,
            homeType,
            summary,
            postPlaces,
            owner,
        }) {
        let post = await Post.find(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        post.price = price;
        post.area = area;
        post.bedrooms = bedrooms;
        post.bathrooms = bathrooms;
        post.homeTypeId = homeType.id;
        post.summary = summary;

        await post.load('owner');

        const ownerObj = await post.getRelated('owner');
        ownerObj.fullname = owner.fullname;
        ownerObj.telephone = owner.telephone;
        ownerObj.email = owner.email;
        await ownerObj.save()

        await post.load('address');
        const addressObj = await post.getRelated('address');
        addressObj.description = address.description;
        if (address.coordinates) {
            addressObj.coordinates = address.coordinates;
        }
        await addressObj.save()

        await this.setAu(post, postPlaces);

        post = await post.calculateOpdo();
        return post;
    }

    static async destroyPost(postId) {
        let post = await Post.find(postId);
        if (post) {
            await Image.removeAllImgOnDrive(post.id);
            // This destroy the address and automatically destroy in cascade the post
            return await AddressService.destroyAddress(post.addressId)
        } else {
            throw new Error('Post not found');
        }
    }

    static async initPostVariable(post) {
        let variables = await Variable.getVariables();
        variables = variables.toJSON();
        let postVariables = new Array();

        for (let variable of variables) {
            postVariables.push({
                variableId: variable.id
            });
        }
        await post
            .postVariables()
            .createMany(postVariables);

        // Calcula automaticamente la variable Pu
        await PostVariable.calculatePu(post.id)
    }

    static async setAu(post, postPlaces) {
        await PostPlace
            .query()
            .where('postId', post.id)
            .delete();

        await post
            .postPlaces()
            .createMany(postPlaces);

        // Calcula automaticamente la variable Au
        await PostVariable.calculateAu(post.id, post.bedrooms, post.bathrooms, postPlaces);
    }

    static async publishPost(postId) {
        let post = await Post.find(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        post.publishedAt = new Date();

        if (!post.planId) {
            // Case when is an appraisal set plan to premium
            const premiumPlan = await Plan.findBy('type', Plan.TYPES().PREMIUM)
            post.planId = premiumPlan.id;
            const activeMonths = 3;
            await this.setExpirationDate(post.id, activeMonths);
        }
        await post.save();

        const publishedPost = await Post.getPost(postId);
        const postObj = publishedPost.toJSON();

        // TODO dispatch event to notify subscriptors about the new created post
        // Notify subscriptors about the new property
        // await NotificationService.dispatchSubscriptorNotification(postObj);

        return publishedPost;
    }

    static async setExpirationDate(postId, months) {
        await Database
            .raw(`UPDATE posts SET closed_at = (now() + interval '${months} month') WHERE id = ?`,
                [postId]);
    }

    static async calculatePrice(postId) {
        const post = await Post.find(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        if (!post.planId) {
            await post.calculatePrice();
        }

        return await Post.getPost(postId);
    }

    static async markAsSold(postId) {
        let post = await Post.find(postId);
        if (!post) {
            throw new ResourceNotFoundException();
        }

        post.sold = true;
        post.soldAt = new Date();
        ;
        await post.save();

        return await Post.getPost(postId);
    }

}

module.exports = PostService;
