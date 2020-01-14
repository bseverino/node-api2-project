const router = require('express').Router()
const Posts = require('../data/db.js')

router.post('/', (req, res) => {
    if (req.body['title'] && req.body['contents']) {
        Posts.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: 'There was an error while saving the post to the database.'
                })
            })
    } else {
        res.status(400).json({
            message: 'Please provide title and contents for the post.'
        })
    }
})

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error retrieving posts.'
            })
        })
})

module.exports = router