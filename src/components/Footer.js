import React, { Component } from 'react'


const footer = {
  display: 'flex',
  alignItems: 'center',
  height: 'fit-content',
  paddingTop: '33px',
  paddingBottom: '33px',
  backgroundColor: '#fff',
  border: '2px solid #000',
  maxWidth: '850px',
  alignSelf: 'flex-start'
}

const text = {
  color: '#000',
  fontFamily: 'monospace',
  fontSize: '14px',
  paddingRight: '20px',
  textDecoration: 'underline'

}

export default class Footer extends Component {
  render() {
    const links = {
      'Twitter': 'https://twitter.com/tracer_reaper',
      'GitHub': 'https://github.com/foureyedraven',
      'Stack Overflow': 'https://stackoverflow.com/users/5304980/foureyedraven',
      'Reddit': 'https://www.reddit.com/user/foureyedraven'
    }
    return (
      <div style={footer} className="col-lg-6">
        <div>
          {Object.keys(links).map(link => (
            <a key={link} style={text} href={links[link]}>{link}</a>
          ))}
        </div>
      </div>
    )
  }
}
