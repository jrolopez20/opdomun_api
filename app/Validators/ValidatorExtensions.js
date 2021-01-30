'use strict'

const Validator = use('Validator');
const PostVariable = use('App/Models/PostVariable');
const Image = use('App/Models/Image');

const postCompleteFn = async (data, field, message, args, get) => {
    const [postId] = args;
    const postVariables = await PostVariable
        .query()
        .with('variable')
        .where('postId', postId)
        .fetch();

    for (let postVar of postVariables.toJSON()) {
        if (postVar.points === null) {
            throw message
        }
    }
}
Validator.extend('complete', postCompleteFn);

const postRequirePictureFn = async (data, field, message, args, get) => {
    const [postId] = args;
    const image = await Image
        .query()
        .where('postId', postId)
        .andWhere('default', 1)
        .first();

    if(!image) {
        throw message
    }
}
Validator.extend('pictureRequired', postRequirePictureFn);
