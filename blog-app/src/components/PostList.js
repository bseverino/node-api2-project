import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'reactstrap'

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
        <div>
            {posts.map(post => (
                <Row style={{ margin: '50px 0' }} key={post.id}>
                    <Col>
                        <BlogPost post={post} />
                    </Col>
                </Row>
            ))}
        </div>
            
    )
}

export default PostList