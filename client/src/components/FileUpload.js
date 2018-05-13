import React, { Component } from "react"
import _ from "lodash"
import axios from "axios"

class FileUpload extends Component {
  state = {
    files: []
  }

  handleClick = () => {}

  handleSubmit = e => {
    e.preventDefault()
    ;("/storage/v1/b/myBucket/o")

    axios({
      method: "post",
      url: "/upload/storage/v1/b/myBucket/o",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Content-Length": 20000000
      },
      data: {}
    })
  }

  handleFiles = e => {
    e.preventDefault()
    console.log(e.target.files)

    // check if it's an existing file

    const newState = _.uniqBy(
      this.state.files.concat(e.target.files[0]),
      "name"
    )
    this.setState({ files: newState })
  }

  renderFileList = () => {
    return (
      <ul>
        {this.state.files.map(file => {
          return (
            <li key={file.name}>
              {file.name} {file.size} {file.type}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    console.log("state", this.state)

    return (
      <div>
        <h1>Upload files</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="file"
            placeholder=""
            multiple
            accept="image/*"
            onChange={event => this.handleFiles(event)}
          />
        </form>
        {this.renderFileList()}
      </div>
    )
  }
}

export default FileUpload
