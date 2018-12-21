import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { SignIn } from '../auth'
import Home from '../home'

class App extends Component {
  render() {
    return (
      <div>
        App
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/sign-in' component={SignIn}/>
        </Switch>
      </div>
    )
  }
}

export default App
