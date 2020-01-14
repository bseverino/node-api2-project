const router = require('express').Router()
const Posts = require('../data/db.js')

// adds a post to the database and returns an id object
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

// returns an array of every post
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

// returns a specific post by id
router.get('/:id', (req, res) => {
    const id = req.params.id

    Posts.findById(id)
        .then(post => {
            // checks if the response is an empty array
            if (post.length === 0) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'The post information could not be retrieved.'
            })
        })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id

    Posts.findById(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                })
            } else {
                Posts.findPostComments(id)
                    .then(comments => {
                        res.status(200).json(comments)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            message: 'The comments information could not be retrieved.'
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'The post information could not be retrieved.'
            })
        })
    
})

module.exports = router