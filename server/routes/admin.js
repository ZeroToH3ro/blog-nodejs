const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminLayout = '../views/layouts/admin';

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
        if(req.body.username == 'admin' && req.body.password == '12345'){
            res.send('you are logged in');
        } else {
            res.send('username or password is incorrect');
        }
    } catch (e) {
        console.log(e);
    }
});

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
