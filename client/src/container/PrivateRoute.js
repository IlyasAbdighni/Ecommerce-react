import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: ComposedComponent, user = null, ...rest}) => {
  class Authentication extends Component {
    // redirect if not authenticated; otherwise, return the component inputted into <PrivateRoute />

    render () {
      return (
        <Route {...rest} render={(props) => {
          if (!this.props.user) {

            return <Redirect to='/login' />
          } else if (user && user.role) {
            return null
          } else {
            return <ComposedComponent {...props} />
          }
          }} />
      )
    }
  }

  return <Authentication user={user} />
}
export default PrivateRoute;
