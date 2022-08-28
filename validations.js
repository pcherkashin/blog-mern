import { body } from 'express-validator';

export const loginValidation = [
    body('email','Wrong Email format').isEmail(),
    body('password','Your password must be at least 5 characters long').isLength({min: 5}),
    body('fullName','Username must be at least3 characters long').isLength({min: 3}),
    body('avatarURL','Wrong URL format').optional().isURL(),
];

export const registerValidation = [
    body('email','Wrong Email format').isEmail(),
    body('password','Your password must be at least 5 characters long').isLength({min: 5}),
    body('fullName','Username must be at least3 characters long').isLength({min: 3}),
    body('avatarURL','Wrong URL format').optional().isURL(),
];

export const postCreateValidation = [
    body('title','Enter Post Title').isLength({min: 3 }).isString(),
    body('text','Put your text').isLength({min: 3}).isString(),
    body('tags','Wrong tags format').optional().isString(),
    body('imageURL','Wrong URL format').optional().isString(),
];