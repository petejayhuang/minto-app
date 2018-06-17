import React from "react"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router"

const StoreDrivenRedirect = props => <Redirect to={props.ui.redirect} />

const mapState = ({ ui }) => ({ ui })

export default connect(mapState)(StoreDrivenRedirect)
