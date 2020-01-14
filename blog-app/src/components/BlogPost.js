import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Media } from 'reactstrap'

const BlogPost = props => {
    const [comments, setComments] = useState([])

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
        <Media>
            <Media left href="#">
                <Media object src="https://picsum.photos/64" alt="Generic placeholder" />
            </Media>
            <Media body>
                <Media heading>
                {props.post.title}
                </Media>
                {props.post.contents}
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
            </Media>
        </Media>
    )
}

export default BlogPost