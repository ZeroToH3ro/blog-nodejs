const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('', async (req, res) => {
    const locals = {
        title: 'Nodejs Blog',
        description: 'Simple blog create with nodejs, express, mongo'
    };

    try {
        let page = req.query.page || 1;
        let perPage = 10;
        const data = await Post.aggregate([{$sort: {createdAt: -1}}])
            .skip(page * perPage - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
        });
    } catch (e) {
        console.log('Error:', e);
    }
});

router.get('/post/:id', async (req, res) => {
    const locals = {
        title: 'Nodejs Blog',
        description: 'Simple blog create with nodejs, express, mongo'
    };

    try {
        const slug = req.params.id;
        const data = await Post.findById({_id: slug});

        res.render('post', {locals, data});
    } catch (e) {
        console.log(e);
    }
});

router.post('/search', async (req, res) => {
    const locals = {
        title: 'Nodejs Blog',
        description: 'Simple blog create with nodejs, express, mongo'
    };
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
        const data = await Post.find({
            $or:[
                {title: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
                {body: {$regex: new RegExp(searchNoSpecialChar, 'i')}}
            ]
        });

        res.render('search', {locals, data});
    } catch (e) {
        console.log(e);
    }
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;
