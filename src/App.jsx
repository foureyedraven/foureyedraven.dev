import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/Content'

class App extends Component {
	render() {
		return (
      <div className="container-fluid justify-content-center" style={{height: 'inherit'}}>
        <div className="row justify-content-center bg-gray--lighter">
          <Header/>
        </div>
        <div className="row justify-content-center bg-gray--lighter" style={{height: 'inherit'}}>
          <Content />
        </div>
        <div className="row justify-content-center align-content-end bg-gray--lighter">
          <Footer/>
        </div>
			</div>
		)
	}
}

export default (App)
