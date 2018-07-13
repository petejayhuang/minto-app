// TODO
// validation on input (special chars etc)
// debounce on the input\
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { FACEBOOK_APP_ID } from '../../config/constants'
import {
  authenticateFacebookWithBE,
  getUsernameAvailability,
  updateUser,
  createCustomer,
  uploadImagesToS3,
  addCardToCustomer,
  createTransaction
} from '../../actions'
import ImageUpload from '../../components/ImageUpload'
import styled from 'styled-components'

const Container = styled.div`
img {
  width: 200px;
  height: 200p;x
}
`
class Login extends Component {
  state = {
    isAuthenticated: false,
    username_message: '',
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    images: [],
    changeProfileImage: false
  }

  fetchTimeout = null

  logout = () => {
    this.setState({ isAuthenticated: false })
  }

  handleChange = () => {
    this.setState({ changeProfileImage: !this.state.changeProfileImage })
  }

  facebookResponse = async fbResponse => {
    try {
      await this.props.authenticateFacebookWithBE(fbResponse.accessToken)
      this.setState({ isAuthenticated: false })
    } catch (e) {
      this.setState({
        error: 'There was a problem with your sign up, please try again'
      })
    }
  }

  handleUsernameInputChange = value => {
    this.setState({ username: value })
    if (this.fetchTimeout) {
      clearTimeout(this.fetchTimeout)
    }

    this.fetchTimeout = setTimeout(() => {
      if (value.length > 5) {
        this.props
          .getUsernameAvailability(value)
          .then(response => {
            this.setState({
              available: response.data.data.available,
              username_message: response.data.data.available
                ? 'Yes can do!'
                : "That username isn't available =("
            })
          })
          .catch(e => {
            console.log(e)
          })
      }
    }, 1000)
  }

  addImage = image => {
    this.setState({
      images: this.state.images.concat(image)
    })
  }

  removeImage = imageName => {
    const newState = this.state.images.filter(image => {
      return image.name !== imageName
    })
    this.setState({ images: newState })
  }

  handleTextInputChange = (inputName, value) => {
    this.setState({ [inputName]: value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { first_name, last_name, email, username, images } = this.state

    const image = await this.props.uploadImagesToS3({
      images,
      upload_type: 'profile_pic'
    })

    this.props.updateUser({
      first_name,
      last_name,
      email,
      username,
      profile_URL: image[0].image_URL,
      redirect_URL: '/feed'
    })
  }

  render() {
    return (
      <Container className="route-container p-3">
        {this.props.user.id ? (
          <div>
            {this.state.changeProfileImage ? (
              <div className="d-flex flex-column">
                Change your profile image
                <ImageUpload
                  addImage={this.addImage}
                  removeImage={this.removeImage}
                />
              </div>
            ) : (
              <div className="d-flex flex-column">
                <img src={this.props.user.profile_URL} />
                <button onClick={this.handleChange}>change</button>
              </div>
            )}
            <div className="d-flex flex-column">
              <label>First Name</label>
              <input
                required
                onChange={e =>
                  this.handleTextInputChange('first_name', e.target.value)
                }
                value={this.state.first_name || this.props.user.first_name}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Last Name</label>
              <input
                required
                onChange={e =>
                  this.handleTextInputChange('last_name', e.target.value)
                }
                value={this.state.last_name || this.props.user.last_name}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Email</label>
              <input
                required
                onChange={e =>
                  this.handleTextInputChange('email', e.target.value)
                }
                value={this.state.email || this.props.user.email}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Username</label>
              <input
                required
                onChange={e => this.handleUsernameInputChange(e.target.value)}
                value={this.state.username || this.props.user.username}
              />
              {this.state.username_message}
            </div>
            <button onClick={this.handleSubmit} type="submit">
              Next
            </button>
          </div>
        ) : (
          <FacebookLogin
            appId={FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.facebookResponse}
          />
        )}
      </Container>
    )
  }
}

Login.defaultProps = {}
Login.propTypes = {}

export default connect(
  ({ user }) => ({ user }),
  {
    authenticateFacebookWithBE,
    getUsernameAvailability,
    updateUser,
    createCustomer,
    uploadImagesToS3,
    addCardToCustomer,
    createTransaction
  }
)(Login)
