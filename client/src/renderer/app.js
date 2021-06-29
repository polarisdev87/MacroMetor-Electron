/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bootcamp from './component/bootcamp/Bootcamp'

class App extends Component {
  render () {
    return (
      <Bootcamp />
    )
  }
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps, null)(App)
