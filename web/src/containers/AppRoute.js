import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from './Home'
import Enquiry from './Enquiry'
import Location from './Location'
import RequestAgent from './RequestAgent';
import NoMatch from './NoMatch';


const mapStateToProps = (state) => {
  return {
    route: state.route
  }
}

class AppRouter extends Component {
  render() {
    switch (this.props.route.page) {
      case 'home':
        return <Home/>

      case 'enquiry':
        return <Enquiry/>

      case 'location':
        return <Location/>

      case 'request-agent':
        return <RequestAgent/>

      default:
        return <NoMatch/>
    }
  }
}

const AppRoute = connect(
  mapStateToProps
)(AppRouter)

export default AppRoute
