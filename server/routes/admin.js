const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;
//hello world
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({message: 'Unknown Authorize'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch(error) {
        res.status(401).json( { message: 'Unauthorized'} );
    }
}

router.get('/admin', async(req, res) => {
    try {
        const locals = {
            title: 'NodeJS Blog',
            description: 'Simple blog create with nodejs, express, mongo'
        };

        res.render('admin/index', {locals, layout: adminLayout});
    } catch (e) {
        console.log(e);
    }
});

router.post('/admin', async(req, res) => {
    try {
        const locals = {
            title: 'NodeJS Blog',
            description: 'Simple blog create with nodejs, express, mongo'
        };

        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const token = jwt.sign({userId: user._id}, jwtSecret);
        res.cookie('token', token, {httpOnly: true});
        res.redirect('/dashboard');
    } catch (e) {
        console.log(e);
    }
});

router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Dashboard',
            description: 'Simple Blog created with NodeJs, Express & MongoDb.'
        }

        const data = await Post.find();
        res.render('admin/dashboard', {
            locals,
            data,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
    }
})

router.post('/register', async(req, res) => {
    try {
        const locals = {
            title: 'NodeJS Blog',
            description: 'Simple blog create with nodejs, express, mongo'
        };

        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const user = await User.create({username, password: hashedPassword});
            res.status(200).json({message: 'Create Data Success', user});
        } catch (e) {
            if(e === 11000){
                res.status(11000).json({message: 'User Is Already Created'});
            }
            console.log(e);
        }

    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
