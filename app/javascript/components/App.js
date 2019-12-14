import React from 'react'
import Home from './Home'
import Admin from './Admin'
import { Route, Switch } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";

class App extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/admin/" component={Admin} />
            </Switch>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
