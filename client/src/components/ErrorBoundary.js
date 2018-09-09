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
    const { error } = this.state
    const { children } = this.props
    if (error) {
      return (
        <div
          className="d-flex route-container flex-column p-4"
          onClick={this.handleClick}
        >
          <h1 className="text-center highlighted">Whoops!</h1>
          <p className="text-center">
            We're sorry — something has gone wrong, this doesn't normally
            happen.
          </p>
          <p className="text-center">
            Our team has been notified. If you have a minute to help us out,
            click <span className="highlighted">here</span> to report more
            detail.
          </p>
        </div>
      )
    } else {
      return children
    }
  }
}

export default ErrorBoundary
