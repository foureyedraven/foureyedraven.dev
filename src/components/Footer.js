import React, { Component } from 'react'


const footer = {
  display: 'flex',
  alignItems: 'center',
  height: 'fit-content',
  padding: '33px',
  backgroundColor: '#fff',
  borderWidth: '2px 0px',
  borderStyle: 'solid',
  borderColor: '#111',
  alignSelf: 'flex-start',
  width: '100%',
  position: 'fixed',
  bottom: 0,
  left: 0,
}

const text = {
  color: '#111',
  fontFamily: 'monospace',
  fontSize: '14px',
  paddingRight: '20px',
  textDecoration: 'underline',

}

export default class Footer extends Component {
  render() {
    const links = {
      'Twitter': 'https://twitter.com/tracer_reaper',
      'GitHub': 'https://github.com/foureyedraven',
      'Stack Overflow': 'https://stackoverflow.com/users/5304980/foureyedraven',
      'LinkedIn': 'https://www.linkedin.com/in/theresarapior/',
      // 'Reddit': 'https://www.reddit.com/user/foureyedraven'
    }
    return (
      <div style={footer}>
        <div>
          {Object.keys(links).map(link => (
            <a key={link} style={text} target="_blank" href={links[link]}>{link}</a>
          ))}
        </div>
      </div>
    )
  }
}
