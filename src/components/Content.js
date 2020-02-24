import React, { Component } from 'react'


const content = {
  display: 'flex',
  paddingTop: '33px',
  paddingBottom: '33px',
  backgroundColor: '#fff',
  border: '2px',
  borderColor: '#000',
  maxWidth: '850px',
  alignSelf: 'flex-start',
  height: '100%'
}

const text = {
  color: '#000',
  fontFamily: 'monospace',
  fontSize: '14px',
  paddingRight: '20px'

}

export default class Content extends Component {
  render() {
    return (
      <div style={content} className="col-lg-6">
        <div style={text}>
          Cavalry's here!
        </div>
      </div>
    )
  }
}
