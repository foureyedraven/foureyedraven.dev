import * as React from "react"

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
  position: 'fixed' as 'fixed', // TS needed prop cast to string
  bottom: 0,
  left: 0,
}

const text = {
  color: '#111',
  // fontFamily: 'monospace',
  // fontSize: '14px',
  marginRight: '20px',
  paddingBottom: '5px',
  textDecoration: 'underline',

}

export class Footer extends React.Component<{}, any> {
  render() {
    const links = {
      'GitHub': 'https://github.com/foureyedraven',
      'LinkedIn': 'https://www.linkedin.com/in/theresarapior/',
      'Twitter': 'https://twitter.com/tracer_reaper',
    }
    return (
      <div style={footer}>
        <div>
          {Object.keys(links).map(link => (
            <a key={link} style={text} target="_blank">{link}</a>
          ))}
        </div>
      </div>
    )
  }
}
