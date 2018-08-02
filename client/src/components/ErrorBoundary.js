import React, { Component } from 'react'

class ErrorBoundary extends Component {
  state = { error: null }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    if (window.Raven) {
      window.Raven.captureException(error, { extra: errorInfo })
    }
  }

  handleClick = () => {
    if (window.Raven) {
      window.Raven.lastEventId() && window.Raven.showReportDialog()
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="snap" onClick={this.handleClick}>
          <p>We're sorry — something's gone wrong.</p>
          <p>Our team has been notified, but click here fill out a report.</p>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
