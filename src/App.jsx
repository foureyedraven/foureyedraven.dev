import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/Content'

class App extends Component {
	render() {
		return (
      <div style={{ height: '100%' }}>
        <Header />
        <Content />
        <Footer />
			</div>
		)
	}
}

export default (App)
