import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageUpload from '../../../components/ImageUpload'
import { uploadSensitiveImage } from '../../../actions/user'

class BecomeASeller extends Component {
  state = {
    images: [],
    address1: '',
    address2: '',
    city: '',
    town: '',
    postcode: ''
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

  handleSubmit = () => {
    this.props.uploadSensitiveImage({
      images: this.state.images
    })
  }

  handleInputChange = (value, field) => {
    this.setState({ [field]: value })
  }

  handleAddressFormSubmit = () => {
    // update address
  }
  addressFields = ['address1', 'address2', 'city', 'town', 'postcode']

  render() {
    return (
      <div>
        <div className="route-container pl-3 pr-3">
          Upload national id
          <ImageUpload
            addImage={this.addImage}
            removeImage={this.removeImage}
          />
          <button onClick={this.handleSubmit}>Add document</button>
          Billing Address
          {this.addressFields.map(addressField => (
            <div key={addressField} className="d-flex flex-column">
              <label>{addressField}</label>
              <input
                type="text"
                value={this.state[addressField]}
                onChange={e =>
                  this.handleInputChange(e.target.value, addressField)
                }
              />
            </div>
          ))}
          <button onClick={this.handleAddressForm}>Add document</button>
        </div>
      </div>
    )
  }
}

const mapState = ({}) => ({})

export default connect(
  mapState,
  { uploadSensitiveImage }
)(BecomeASeller)
