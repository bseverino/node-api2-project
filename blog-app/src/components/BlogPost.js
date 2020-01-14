import React from 'react'
import { Media } from 'reactstrap'

const BlogPost = props => {
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
        </Media>
        </Media>
    )
}

export default BlogPost