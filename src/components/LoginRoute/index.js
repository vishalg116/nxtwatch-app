import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import NxtWatchContext from '../../Context/NxtWatchContext'

import {
  LoginPage,
  LoginCard,
  LogoImage,
  Label,
  InputField,
  ShowPassword,
  LoginButton,
} from './StyledComponents'

class LoginRoute extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showPasswordStatus: false,
    errorMessage: '',
    showErrorMessage: false,
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  changeShowPasswordStatus = () => {
    this.setState(prevState => ({
      showPasswordStatus: !prevState.showPasswordStatus,
    }))
  }

  loginCredentialSubmission = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })

    const data = response.json()

    if (response.ok) {
      Cookies.set('jwt-token', data.jwt_token, {expires: 1})
      const {history} = this.props
      history.replace('/')
    }
    if (!response.ok) {
      this.setState({showErrorMessage: true, errorMessage: data.error_msg})
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme, changedAttributesOnThemeChange} = value

          const {
            showPasswordStatus,
            showErrorMessage,
            errorMessage,
          } = this.state

          const {
            watchLogoImage,
            watchLogoImageAlt,
          } = changedAttributesOnThemeChange()

          const passwordType = showPasswordStatus ? 'text' : 'password'

          return (
            <LoginPage value={lightTheme}>
              <LoginCard>
                <LogoImage src={watchLogoImage} alt={watchLogoImageAlt} />
                <Label value={lightTheme} htmlFor="usernameInputField">
                  USERNAME
                </Label>
                <InputField
                  type="text"
                  id="usernameInputField"
                  onChange={this.onChangeUsernameInput}
                />
                <Label value={lightTheme} htmlFor="passwordInputField">
                  PASSWORD
                </Label>
                <InputField
                  type={passwordType}
                  id="passwordInputField"
                  onChange={this.onChangePassword}
                />
                <div>
                  <input
                    type="checkbox"
                    id="showPasswordInputField"
                    onChange={this.changeShowPasswordStatus}
                  />
                  <ShowPassword>Show Password</ShowPassword>
                </div>
                <LoginButton type="submit">Login</LoginButton>
                {showErrorMessage && <p>*{errorMessage}</p>}
              </LoginCard>
            </LoginPage>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default LoginRoute
