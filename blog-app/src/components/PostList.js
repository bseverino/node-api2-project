import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap'

import BlogPost from './BlogPost'

const initialValues = {
    title: '',
    contents: ''
}

const PostList = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [posts, setPosts] = useState([])
    const [posting, setPosting]= useState(false)
    const [postValues, setPostValues] = useState(initialValues)

    const startPost = () => setPosting(true)
    const cancelPost = e => {
        e.preventDefault()
        setPosting(false)
    }

    useEffect(() => {
        setIsFetching(true)

        axios.get('http://localhost:5000/api/posts')
            .then(res => {
                setPosts(res.data)
                setIsFetching(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleChange = e => {
        setPostValues({
            ...postValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios.post('http://localhost:5000/api/posts', postValues)
            .then(() => {
                axios.get('http://localhost:5000/api/posts')
                    .then(res => {
                        setPosts(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })

        setPostValues(initialValues)
        setPosting(false)
    }

    return (        
        <div>            
            {posts.map(post => (
                <Row style={{ margin: '50px 0' }} key={post.id}>
                    <Col xs={{ size: 8, offset: 2 }}>
                        <BlogPost post={post} />
                    </Col>
                </Row>
            ))}
            <Row>
                <Col
                    xs={{ size: 8, offset: 2 }}
                    style={{  display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    {isFetching && <Spinner color='dark' style={{ margin: 50 }} />}
                    {!posting && <Button onClick={startPost}>Make a New Post</Button>}
                    {posting && (
                        <Form style={{ width: '90%' }} onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for='title'>Title</Label>
                                <Input
                                    type='text'
                                    name='title'
                                    id='title'
                                    value={postValues.title}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='contents'>Content</Label>
                                <Input
                                    type='textarea'
                                    name='contents'
                                    id='contents'
                                    value={postValues.contents}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button>Submit</Button>{' '}
                            <Button onClick={cancelPost}>Cancel</Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </div>
            
    )
}

export default PostList