import * as React from "react"
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Content } from './components/Content'

class App extends React.Component<{}, any> {
	render() {
		return (
      <div style={{
        overflow: 'scroll',
        paddingBottom: '88px',
      }}>
        <Header />
        <Content />
        <Footer />
			</div>
		)
	}
}

export default (App)
