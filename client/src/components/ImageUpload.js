import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import PropTypes from 'prop-types'
import CrossIcon from '../assets/icons/feather-react/PlusSquareIcon'
import styled from 'styled-components'
import XCircleIcon from '../assets/icons/feather-react/XCircleIcon'

const Container = styled.div`
  border: 1px solid green;
  width: 150px;
  height: 150px;
  input[type='file'] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
    margin: 50px;
  }
  .preview-image {
    width: 150px;
    height: 150px;
  }
  .remove-image {
    position: absolute;
    /* z-index: 5; */
  }

  label {
    width: 150px;
    height: 150px;
    &:hover {
      cursor: pointer;
    }
  }
`

class ImageUpload extends Component {
  state = {
    imagePreviewUrl: '',
    file: null
  }

  handleSelectImage = e => {
    const file = e.target.files[0]
    let reader = new FileReader()
    this.setState({ file })
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
    this.props.addImage(file)
  }

  handleRemoveImage = name => {
    this.props.removeImage(this.state.file.name)
    this.setState({ imagePreviewUrl: '' })
  }

  render() {
    const { index } = this.props
    return (
      <Container>
        {this.state.imagePreviewUrl ? (
          <div className="preview-image border-all">
            <div
              className="remove-image"
              onClick={() => this.handleRemoveImage(this.state.file.name)}
            >
              <XCircleIcon />
            </div>
            <img className="preview-image" src={this.state.imagePreviewUrl} />
          </div>
        ) : (
          <div className="flex-row center-center border-all">
            <label className="flex-row center-center" htmlFor={`file${index}`}>
              Tap to add an image
            </label>
          </div>
        )}

        <input
          className="inputFile"
          id={`file${index}`}
          type="file"
          accept="image/*"
          placeholder=""
          onChange={e => this.handleSelectImage(e)}
        />
      </Container>
    )
  }
}

ImageUpload.propTypes = {
  addImage: PropTypes.func,
  removeImage: PropTypes.func
}

export default ImageUpload
