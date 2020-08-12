import * as React from "react"
import { TabState } from "./constants"
import Pokemon from "./demos/pokemon"
import { getSourceCode } from "./demos/pokemon/api"

const styles = {
  main: {
    margin: 0,
    padding: 0,
    marginBottom: 33
  },
  tabsGroup: {
    display: 'flex',
    backgroundColor: '#111',
    paddingLeft: 33,
    paddingBottom: 10,
  },
  tab: {
    backgroundColor: '#111',
    marginRight: 20,
    marginBottom: 10,
    cursor: 'pointer',
  },
  content: {
    padding: '33px',
    paddingBottom: '0px',
    backgroundColor: '#fff',
    border: '2px',
    borderColor: '#111',
    alignSelf: 'flex-start',
    height: 'inherit'
  },
  textBody: {
    paddingRight: '20px',
    maxWidth: '550px'
  },
  a: {
    color: '#111',
    fontSize: '16px',
    textDecoration: 'underline',
    width: 'fit-content'
  },
  p: {
    margin: 0,
    padding: 0,
    borderBottom: '1px solid #111',
    width: 'fit-content'
  },
  textTab: {
    color: '#fff',
    fontSize: '18px',
    margin: 0,
    textDecoration: 'none',
    paddingBottom:5,
    borderBottom: '2px solid #666',
  },
  activeTab: {
    color: '#4e4',
    borderBottom: '2px solid #4e4'
  },
  demoWell: {
    height: 550,
    width: 600,
    padding: 15,
    marginBottom: 30,
    border: '2px solid #111',
    boxShadow: '8px 6px rgba(40, 150, 60, 0.7)',
  }
}

const Tab = ({ text, selected, selectFn }) => {
  return (
    <div style={styles.tab} onClick={() => selectFn(text)}>
      <p style={selected ? { ...styles.textTab, borderBottom: '2px solid #4e4'} : styles.textTab }>{text}</p>
    </div>
  )
}

const Tabs = ({ tabs, selected, selectFn }) => {
  return (
    <div style={styles.tabsGroup}>
      {Object.keys(tabs).map((tab, i) => <Tab key={i} text={tab} selected={selected === tab} selectFn={selectFn}/>)}
    </div>
  )
}

const Profile = () => {
  return (
    <div style={styles.textBody}>
        I'm a fullstack web developer who loves backend development and learning hardware.
        <br/><br/>
        My tech experience includes:<br/>
        <ul>
          <li>
            building web apps from scratch using node.js, CSS, HTML, React, and Typescript,
          </li>
          <li>implementing UX/UI designs with Flex Box or Bootstrap,</li>
          <li>
            API development with node.js,
          </li>
          <li>
            PostgreSQL for queries, migrations and db management,
          </li>
          <li>integrating 3rd party APIs,</li>
          <li>BLE device and message management,</li>
          <li>scripting and library implementation with Python 3, notably openCV.</li>
        </ul>
        <div style={{ width: 'fit-content' }}>
          <a style={styles.a} target="_blank" href="https://docs.google.com/document/d/1SNIqC6LjeXw5NvsxRQd6JKZxAlE6pKgrGa_xc7sfs1I/?usp=sharing">Check out my resume &#x21E8;</a>
        </div>
        <br/><br/>
        {/* I learned most of this from scratch on the job in my first 6 months. Before my Jr Dev job, I learned MVC architecture with Ruby on Rails and HTML and CSS from many 90s Geocities sites. I also developed the majority of the consumer and educational coding content for <a style={styles.a} href='https://ozobot.com' target='_blank'>Ozobot's</a> robots using Blockly. */}
        Some fun facts! My Master's degree is in Archaeology and Arabic from the University of Edinburgh in Scotland, and after that I was a grade school teacher for 5+ years. I've lived on four continents and have 2.5 passports. I started using MS-DOS for playing computer games as a kid in the mid-90s. These days, I do small-scale farming and aquaponics at home, and translate medieval Arabic poetry and science treatises for fun.
        <br/><br/>
        The best future is one where we build and support community. Here are some great tech initiatives helping their communities right now:
        <ul>
          <li>
            <a style={styles.a} target="_blank" href="https://codecooperative.org/">Code Cooperative mentors people affected by incarceration &#x21E8;</a>
          </li>
          <li>
            <a style={styles.a} target="_blank" href="https://elpha.com/">Elpha provides a social network to women and femmes in tech &#x21E8;</a>
          </li>
        </ul>
    </div>
  )
}

const DemoCodeIFrame = (code) => {
  console.log("TEST", code)
  return (
    <div style={{ height: 400, overflow: 'scroll', width: '100%'}}>
      <pre>{code}</pre>
    </div>
    // <iframe
    //   frameBorder={0}
    //   style={{width: "100%", height: "425px"}}
    //   scrolling="no"
    //   seamless={false}
    //   srcDoc={`<html><body><style type="text/plain">{ height: 370px; }</style><script src=${data.sourceCode}></script></body></html>`}>
    // </iframe>
  )
}

const Demo = ({ data, viewCode, code }) => {
  return (
    <div style={styles.demoWell} key={data.title}>
      <div>
        <h2>{data.title}</h2>
      </div>
      <p style={{ fontWeight: 400 }}>{data.subtitle}</p>
      <div style={{ margin: 33 }}>
        {viewCode ? DemoCodeIFrame(code) : !!data.component ? React.createElement(data.component) : <p style={{ fontSize: 16, color: '#444' }}>Coming Soon...</p>}
      </div>
    </div>
  )
}

const Demos = (data) => {
  return (
    Object.values(data.demos).map(demo => Demo({ data: demo, viewCode: true, code:data.source }))
  )
}

const Contact = () => {
  return (
    <div>

    </div>
  )
}

const demos = {
  pokemon: {
    key: 'pokemon',
    title: 'Pokemon API Battle Game',
    subtitle: 'play a terminal Pokemon game that uses a Pokedex API',
    start: 'type \'help\' into the terminal to start',
    component: Pokemon, // shows github code, and links
    // maybe saving high scores? which db? mongodb?
    // websocket to play against another player? (sign in code?)
  },
  // userData: {
  //   title: 'You on the Web',
  //   subtitle: 'what web browsers see when you use them',
  //   start: 'We\'ve already grabbed some data from your browser, take a look.',
  //   url: '',
  //   // system details, geolocation, wifi? signed-in accounts? fb data, ad data?
  // },
  satellites: {
    title: 'What\'s Above You',
    subtitle: 'watch an animation of the satellites in your current sky',
    start: 'Accept your location, or enter your coordinates',
    url: '',
  },
  opencv: {
    title: 'Transliterate A Photo',
    subtitle: 'use computer vision to transliterate text from a photo to a chosen alphabet',
    start: 'Choose a language to transliterate to, and upload a photo with another alphabet\'s text',
    url: '',
    // google translate voice api? to read out response (native accent)
  },
  webble: {
    title: 'What\'s in Your Bluetooth Device',
    subtitle: 'poke around your bluetooth device using the web-ble library',
    start: 'Click on Connect To BLE Device',
    url: '',
  }
}

const tabs =  {
  'Demos': {
    component: Demos,
    data: demos,
  },
  'Profile': {
    component: Profile
  },
  // 'Contact': {
  //   component: Contact
  // },
}

interface NavTabsState {
  tabState: TabState
  sourceCode: any
}

export class Content extends React.Component<{}, NavTabsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tabState: "Demos",
      sourceCode: ""
    };
  }

  componentDidMount() {
    setTimeout(() => { window.scrollTo(0, 0) }, 100)
    getSourceCode().then(data => this.setState({ sourceCode: data.data }))
  }

  render() {
    return (
      <div style={styles.main}>
        <Tabs tabs={tabs} selected={this.state.tabState} selectFn={val => this.setState({ tabState: val })} />
        <div style={styles.content}>
          {React.createElement(tabs[this.state.tabState].component, Object.assign({ demos: tabs[this.state.tabState].data }, { source: this.state.sourceCode }))}
        </div>
      </div>
    )
  }
}
