import React from 'react'
import { Container } from 'reactstrap'

import PostList from './components/PostList'

function App() {
  return (
    <Container style={{ marginBottom: 100 }}>
      <PostList />
    </Container>
  )
}

export default App