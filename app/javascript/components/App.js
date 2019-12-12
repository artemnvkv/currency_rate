import React from 'react'
import Home from './Home'
import Admin from './Admin'
import { Route, Switch } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin/" component={Admin} />
        </Switch>
      </div>
    )
  }
}

export default App
