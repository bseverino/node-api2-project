import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {
    Card,
    CardBody,
    CardTitle as ReactCardTitle,
    CardText,
    Media as ReactMedia,
    Button,
    Form,
    FormGroup,
    Input,
    Spinner
} from 'reactstrap'

const CardTitle = styled(ReactCardTitle)`
    font-size: 1.5rem;
    width: 100%;
`

const Media = styled(ReactMedia)`
    margin-bottom: 10px;
`

const BlogPost = props => {
    const [isFetching, setIsFetching] = useState(false)
    const [comments, setComments] = useState([])
    const [commenting, setCommenting] = useState(false)
    const [commentValues, setCommentValues] = useState({ text: '', post_id: props.post.id })

    const startComment = () => setCommenting(true)
    const cancelComment = e => {
        e.preventDefault()
        setCommenting(false)
    }

    const handleChange = e => {
        setCommentValues({
            ...commentValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios.post(`http://localhost:5000/api/posts/${props.post.id}/comments`, commentValues)
            .then(() => {
                axios.get(`http://localhost:5000/api/posts/${props.post.id}/comments`)
                    .then(res => {
                        setComments(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
        
        setCommenting(false)
        setCommentValues({ text: '', post_id: props.post.id })
    }

    useEffect(() => {
        setIsFetching(true)
        axios.get(`http://localhost:5000/api/posts/${props.post.id}/comments`)
            .then(res => {
                setComments(res.data)
                setIsFetching(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.post])

    return (
        <Card>
            <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardTitle>{props.post.title}</CardTitle>
                <CardText style={{ width: '100%' }}>{props.post.contents}</CardText>
                {comments.length > 0 && <h5 style={{ width: '100%', marginBottom: 15 }}>Comments</h5>}                            
                {comments.map(comment => (
                    <Media key={comment.id} style={{ width: '90%' }}>
                        <Media left href="#">
                            <Media object src="https://picsum.photos/64" alt="Generic placeholder" />
                        </Media>
                        <Media body>
                            {comment.text}
                        </Media>
                    </Media>
                ))}
                {isFetching && <Spinner color='dark' style={{ margin: 50 }} />}
                {commenting && (
                    <Form onSubmit={handleSubmit} style={{ width: '80%' }}>
                        <FormGroup>
                            <Input
                                type='textarea'
                                name='text'
                                id='comment'
                                placeholder='Comment here'
                                value={commentValues.text}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button>Submit</Button>{' '}
                        <Button onClick={cancelComment}>Cancel</Button>
                    </Form>
                )}
                {!commenting && <Button onClick={startComment}>Add Comment</Button>}  
            </CardBody>
        </Card>
    )
}

export default BlogPost