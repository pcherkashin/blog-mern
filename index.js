import express from 'express';
import multer from 'multer';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import { checkAuth, handleValidationErrors } from './utils/index.js'; 

import User from './models/User.js';
import Post from './models/Post.js';

import { UserController, PostController } from './controllers/index.js';

import dotenv from 'dotenv';


dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB Error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_,__,cb) => {
        cb(null, 'uploads');
    },
    filename: (_,file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: '/uploads/${req.file.originalname}',
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.listen(4444,(err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});