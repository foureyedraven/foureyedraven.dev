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

export default class Content extends Component {
  render() {
    return (
      <div style={content}>
        <div>
          <div style={text}>
            Cavalry's here!
          </div>
        </div>
      </div>
    )
  }
}
