import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './app'
import { Route, BrowserRouter as Router } from 'react-router-dom'

class ViewManager extends Component {
  static Views () {
    return {
      viewA: <Provider store={store}>
        <App />
      </Provider>,
      viewB: <h1> Hey no overlay yet!!! </h1>
    }
  }

  static View (props) {
    const name = props.location.search.substr(1)
    const view = ViewManager.Views()[name]
    if (view == null) {
      throw new Error(`View ${name} is undefined`)
    }
    return view
  }

  render () {
    return (
   <Router>
   <div>
   <Route path='/' component={ViewManager.View}/>
   </div>
   </Router>
    )
  }
}
function render (Component) {
  ReactDOM.render(
    <Component />
    , document.getElementById('app')
  )
}
render(ViewManager)
