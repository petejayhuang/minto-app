import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import XCircleIcon from '../assets/icons/feather-react/XCircleIcon'
import CameraIcon from '../assets/icons/feather-react/CameraIcon'
import { colors } from '../styles/styleVariables'

const Container = styled.div`
  border: 2px solid ${colors.primary};
  width: 150px;
  height: 150px;
  margin: 10px;
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
    position: relative;
    width: 146px;
    height: 146px;
  }
  .remove-image {
    position: absolute;
    z-index: 1;
    right: 5px;
    top: 5px;
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
          <div className="d-flex justify-content-center align-items-center preview-image">
            <div
              className="remove-image"
              onClick={() => this.handleRemoveImage(this.state.file.name)}
            >
              <XCircleIcon stroke={colors.primary} />
            </div>
            <img
              alt="upload"
              className="preview-image"
              src={this.state.imagePreviewUrl}
            />
          </div>
        ) : (
          <label
            className="d-flex flex-column p-2 text-center justify-content-center align-items-center"
            htmlFor={`file${index}`}
          >
            <CameraIcon stroke={colors.icon} />
            Tap here to add an image
          </label>
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
