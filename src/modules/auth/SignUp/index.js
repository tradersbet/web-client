import React, { Component } from 'react'
import { TextField, Button, Snackbar } from 'react-md'
import axios from 'axios'
import config from '../../../config'

import './index.css'

const { api } = config

class SignUp extends Component {
  state = {
    autohide: true,
    toasts: [],
  }

  changeEmail = (value) => {
    this.setState({email: value})
  }

  changePass = (value) => {
    this.setState({pass: value})
  }

  addToast = (text, action, autohide = true) => {
    this.setState((state) => {
      const toasts = state.toasts.slice()
      toasts.push({ text, action })
      return { toasts, autohide }
    })
  }

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts
    this.setState({ toasts })
  }

  register = () => {
    const { addToast } = this
    const { email, pass } = this.state

    axios.post(api.register, {
      email,
      password: pass,
    })
    .then(function (response) {
      console.log(response)

    })
    .catch(function (error) {
      console.log(error)
      // addToast(error)
    })
  }

  render() {
    const { toasts, autohide } = this.state

    return (
      <div className="sign-up">
        <h2>Sign Up</h2>
        <TextField
          id="floating-center-title"
          label="Email"
          lineDirection="center"
          placeholder="Your email"
          onChange={this.changeEmail}
        />
        <TextField
          id="floating-password"
          label="Enter your password"
          type="password"
          onChange={this.changePass}
        />
        <Button flat primary swapTheming onClick={this.register}>Sign Up</Button>
        <Snackbar
          id="example-snackbar"
          toasts={toasts}
          autohide={autohide}
          onDismiss={this.dismissToast}
        />
      </div>
    )
  }
}

export default SignUp
