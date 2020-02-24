import React, { Component } from 'react'

const header = {
  display: 'flex',
  //justifyContent: 'center',
  alignItems: 'center',
  height: 'fit-content',
  paddingTop: '33px',
  paddingBottom: '33px',
  backgroundColor: '#000',
  maxWidth: '850px',
  alignSelf: 'flex-start',
}

const h1 = {
  color: '#ffffff',
  fontFamily: 'monospace'
}

class Item extends Component {
  render() {
    return (
      <div></div>
    )
  }
}

class ExpandingContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }

  toggle(value) {
    this.setState(state => {
      return { [value]: !this.state[value] }
    })
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default class Header extends Component {
  render() {

    return (
      <div style={header} className="col-lg-6">
        <div>
          <h1 style={h1}>
            foureyedraven
          </h1>
        </div>
      </div>
    )
  }
}
