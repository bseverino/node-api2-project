import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {
    Card,
    CardBody,
    CardTitle as ReactCardTitle,
    CardText,
    Media as ReactMedia,
    Collapse,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'

const CardTitle = styled(ReactCardTitle)`
    font-size: 1.5rem;
`

const Media = styled(ReactMedia)`
    margin-top: 10px;
`

const BlogPost = props => {
    const [comments, setComments] = useState([])
    const [commenting, setCommenting] = useState(false)
    const [commentValues, setCommentValues] = useState({ text: '', post_id: props.post.id })

    const startComment = () => setCommenting(true)
    const cancelComment = () => setCommenting(false)

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
        axios.get(`http://localhost:5000/api/posts/${props.post.id}/comments`)
            .then(res => {
                setComments(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.post])

    return (
        <Card>
            <CardBody>
                <CardTitle>{props.post.title}</CardTitle>
                <CardText>{props.post.contents}</CardText>                              
                {comments.map(comment => (
                    <Media key={comment.id}>
                        <Media left href="#">
                            <Media object src="https://picsum.photos/64" alt="Generic placeholder" />
                        </Media>
                        <Media body>
                            {comment.text}
                        </Media>
                    </Media>
                ))}
                {commenting && (
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input
                                type='text'
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