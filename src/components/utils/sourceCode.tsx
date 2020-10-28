import * as React from "react"

export const sourceCode = code => {
  const lineByLineCode = code.split(/\r?\n/)
  const lineText = (line, key) => (
    <div style={{ backgroundColor: "#222", color: "#fff", fontFamily: "monospace", margin: 0, display: 'flex', flexDirection: 'row' }}>
      <div style={{ minWidth: 30 }}>
        <p style={{ margin: 0 }}>{`${key + 1}`}</p>
      </div>
      <pre style={{ color: "#fff", fontFamily: "monospace", margin: 0 }}>
        {`${` `}${line}`}
      </pre>
    </div>
  )
  return (
    <div style={{ backgroundColor: "#222", padding: 15 }}>
      {lineByLineCode.map((line, key) => lineText(line, key))}
    </div>
  )

}
