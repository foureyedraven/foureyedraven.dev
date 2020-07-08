import React, { Component } from 'react'

const header = {
  // display: 'flex',
  // alignItems: 'center',
  padding: '33px',
  backgroundColor: '#111',
  alignSelf: 'flex-start',
}

const h1 = {
  color: '#ffffff',
  fontFamily: 'monospace',
  marginBottom: 10,
  fontSize: 30
}

const h2 = {
  color: '#eee',
  fontFamily: 'sans-serif',
  fontSize: 14,
  fontWeight: 300,
  // textTransform: 'uppercase',
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
      <div style={header}>
        <div>
          <h1 style={h1}>
            Theresa Rapior
          </h1>
          <h2 style={h2}>
            Software Engineer, Fullstack
          </h2>
        </div>

      </div>
    )
  }
}
