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

// posts a comment, returns an id
router.post('/:id/comments', (req, res) => {
    const id = req.params.id
    
    if (!req.body['text']) {
        res.status(400).json({
            message: 'Please provide text for the comment.'
        })
    } else {
        // check if post exists
        Posts.findById(id)
            .then(post => {
                if (post.length === 0) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist.'
                    })
                } else {
                    Posts.insertComment(req.body)
                        .then(comment => {
                            res.status(201).json(comment)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                message: 'There was an error while saving the comment to the database.'
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

// return comments by id of post
router.get('/:id/comments', (req, res) => {
    const id = req.params.id

    // check if post exists
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

// deletes a post by id and returns the number of posts deleted
router.delete('/:id', (req, res) => {
    const id = req.params.id

    // check if post exists
    Posts.findById(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                })
            } else {
                Posts.remove(id)
                    .then(post => {
                        res.status(200).json(post)
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'The post could not be removed.'
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

// updates a post by id and returns 1 if successful
router.put('/:id', (req, res) => {
    const id = req.params.id

    if (req.body['title'] && req.body['contents']) {
        Posts.findById(id)
            .then(post => {
                if (post.length === 0) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist.'
                    })
                } else {
                    Posts.update(id, req.body)
                        .then(post => {
                            res.status(201).json(post)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                message: 'The post information could not be modified.'
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
    } else {
        res.status(400).json({
            message: 'Please provide title and contents for the post.'
        })
    }
})

module.exports = router