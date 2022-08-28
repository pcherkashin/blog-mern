import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import UserModel from '../models/User.js';


export const register = async (req, res) => {

    try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        passwordHash: hash,
        fullName: req.body.fullName,
        avatarURL: req.body.avatarURL,
    });
    
const user = await doc.save();

const token = jwt.sign({
    _id: user._id,
}, 
    'secret123',
    {
        expiresIn: '30d',
    });

    const { passwordHash, ...userData } = user._doc;
    
    res.json({
        ...userData,
        token,
    });

} catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to register user',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {    
        return res.status(404).json({
            message: 'No user',
        });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData); 
    
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to access',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {    
        return res.status(404).json({
            message: 'No user',
        });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData); 
    
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to access',
        });
    }
};