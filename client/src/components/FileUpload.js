import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { uploadToS3 } from "../actions"
class FileUpload extends Component {
  state = {
    file: null
  }

  handleSubmit = e => {
    // TODO - make sure a file is selected (non empty state) before allowed to submit
    e.preventDefault()
    this.props.uploadToS3(this.state.file)
  }

  handleFiles = e => {
    console.log(e.target.files[0])
    this.setState({
      file: e.target.files[0]
    })
  }

  render() {
    return (
      <div>
        <h1>Upload files</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="file"
            accept="image/*"
            placeholder=""
            onChange={event => this.handleFiles(event)}
          />
          {this.state.file && <button type="submit">submit</button>}
        </form>
      </div>
    )
  }
}

export default connect(null, { uploadToS3 })(FileUpload)
