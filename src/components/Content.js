import React, { Component } from 'react'

const content = {
  padding: '33px',
  paddingBottom: '0px',
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
  maxWidth: '550px'
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
            Hiya! I'm a software engineer who loves scripts and backend work. I have a degree in Archaeology and Arabic, and experience as a grade school teacher for 5+ years. I'm currently learning farming and aquaponics at home.
            <br/><br/>
            So why software?
            <ol>
              <li>
                it's open-ended and allows limitless creativity, <br/>and,
              </li>
              <li>
                it's how to participate in building the future.
              </li>
            </ol>
            <br/><br/>
            The future I want to build supports community. Here are some great tech initiatives helping their communities:
            <ul>
              <li>
                <a style={a} target="_blank" href="https://codecooperative.org/"><p style={p}>Code Cooperative &#x21E8;</p></a>
              </li>
            </ul>
          </div>
          <div style={{ width: 'fit-content', marginTop: '15px' }}>
            <a style={a} target="_blank" href="https://docs.google.com/document/d/1SNIqC6LjeXw5NvsxRQd6JKZxAlE6pKgrGa_xc7sfs1I/edit?usp=sharing"><p style={p}>Check out my resume &#x21E8;</p></a>
          </div>
        </div>
      </div>
    )
  }
}
