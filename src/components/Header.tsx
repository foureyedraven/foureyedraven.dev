import * as React from "react"


export const Header = () => {
  
    return (
      <div style={header}>
        <div>
          <h1 style={h1}>
            Theresa Rapior
          </h1>
          <h2 style={h2}>
            Software Engineer
          </h2>
        </div>
      </div>
    )
  }

  const h1 = {
    color: '#fff',
  }
  
  const h2 = {
    color: '#eee',
    fontWeight: 400,
  }

const header = {
  padding: '33px',
  paddingBottom: '12px',
  backgroundColor: '#111',
  alignSelf: 'flex-start',
}
