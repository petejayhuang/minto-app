import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import ImageIcon from '../assets/icons/feather-react/ImageIcon'

class ImageUpload extends Component {
  state = {
    imagePreviewUrl: ''
  }

  handleImageSelection = e => {
    const file = e.target.files[0]

    let reader = new FileReader()

    this.setState({ file })

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
    this.props.callbackFromParent(file)
  }

  render() {
    return (
      <div>
        {this.state.imagePreviewUrl ? (
          <div className="preview-image flex-row center-center border-all">
            <img className="preview-image" src={this.state.imagePreviewUrl} />
          </div>
        ) : (
          <div className="skeleton-image flex-row center-center border-all">
            <ImageIcon />
          </div>
        )}
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="file"
            accept="image/*"
            placeholder=""
            onChange={e => this.handleImageSelection(e)}
          />
        </form>
      </div>
    )
  }
}

export default ImageUpload
