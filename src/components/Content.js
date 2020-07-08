import React, { Component } from 'react'
import { Document } from 'react-pdf'
import resume from '../assets/resume.pdf'

const content = {
  padding: '33px',
  backgroundColor: '#fff',
  border: '2px',
  borderColor: '#111',
  alignSelf: 'flex-start',
  height: 'inherit'
}

const text = {
  color: '#111',
  fontFamily: 'monospace',
  fontSize: '14px',
  paddingRight: '20px',
}

const a = {
  color: '#111',
  fontFamily: 'monospace',
  fontSize: '14px',
  paddingRight: '20px',
  paddingBottom: '5px',
  textDecoration: 'none',
}

const p = {
  margin: 0,
  padding: 0,
  borderBottom: '1px solid #111',
  width: 'fit-content'
}

export default class Content extends Component {
  render() {
    return (
      <div style={content}>
        <div>
          <div style={text}>
            Cavalry's here!
          </div>
          <div style={{ width: 'fit-content', marginTop: '15px' }}>
            <a style={a} target="_blank" href="https://docs.google.com/document/d/1SNIqC6LjeXw5NvsxRQd6JKZxAlE6pKgrGa_xc7sfs1I/edit?usp=sharing"><p style={p}>Check out my resume &#x21E8;</p></a>
          </div>
        </div>
      </div>
    )
  }
}
