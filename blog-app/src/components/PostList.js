import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'reactstrap'

import BlogPost from './BlogPost'

const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Container>
            {posts.map(post => (
                <BlogPost
                    key={post.id}
                    post={post}
                />
            ))}
        </Container>
    )
}

export default PostList