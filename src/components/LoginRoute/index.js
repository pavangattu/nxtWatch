import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', isChecked: false, errorMsg: ''}

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFormSubmit = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const details = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }

    console.log(data)
  }

  onCheckBoxChange = () => {
    this.setState(prev => ({isChecked: !prev.isChecked}))
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  renderShoePassword = () => {
    const {isChecked} = this.state
    return (
      <div>
        <input
          type="checkbox"
          id="checkbox"
          value={isChecked}
          onChange={this.onCheckBoxChange}
        />
        <label htmlFor="checkbox">Show Password</label>
      </div>
    )
  }

  renderPassword = () => {
    const {password, isChecked} = this.state
    console.log(password)

    const change = isChecked ? 'text' : 'password'

    return (
      <>
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          type={change}
          id="password"
          placeholder="Password"
          className="username-input-field"
          onChange={this.onPasswordChange}
          value={password}
        />
      </>
    )
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="username-input-field"
          onChange={this.onUsernameChange}
          value={username}
        />
      </>
    )
  }

  render() {
    const {errorMsg} = this.state
    return (
      <div className="bg-container-login">
        <form className="form-container" onSubmit={this.onFormSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="web-logo-login"
          />
          {this.renderUsername()}
          {this.renderPassword()}
          {this.renderShoePassword()}
          <button type="submit" className="login-button">
            Login
          </button>
          {errorMsg !== '' ? <p className="error-message">*{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default LoginRoute
