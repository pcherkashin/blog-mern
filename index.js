import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import checkAuth from './utils/checkAuth.js';
import User from './models/User.js';
import Post from './models/Post.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
.connect('mongodb+srv://pavel:dbz!prw7khc_YDF!wam@instance1.vthsm.mongodb.net/blog-mern?retryWrites=true&w=majority')
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB Error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', PostController.remove);
//app.patch('/posts/:id', PostController.update);

app.listen(4444,(err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});