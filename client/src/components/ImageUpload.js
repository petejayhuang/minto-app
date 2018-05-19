import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { uploadToS3 } from "../actions"
import ImageIcon from "../assets/icons/feather-react/ImageIcon"

class FileUpload extends Component {
  state = {
    file: null,
    imagePreviewUrl: ""
  }

  handleSubmit = e => {
    // TODO - make sure a file is selected (non empty state) before allowed to submit
    e.preventDefault()
    this.props.uploadToS3(this.state.file)
  }

  handleImageSelection = e => {
    const file = e.target.files[0]

    let reader = new FileReader()

    this.setState({ file })

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  render() {
    // https://codepen.io/hartzis/pen/VvNGZP?editors=0010
    return (
      <div>
        <h1>Add files</h1>

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
          {this.state.file && <button type="submit">submit</button>}
        </form>
      </div>
    )
  }
}

export default connect(null, { uploadToS3 })(FileUpload)
