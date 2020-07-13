import React, { Component } from 'react'
import github from '../../public/assets/GitHub_Logo.png'

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
  text: {
    color: '#111',
    fontSize: '16px',
    paddingRight: '20px',
    maxWidth: '550px'
  },
  a: {
    color: '#111',
    fontSize: '16px',
    marginRight: '20px',
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
    height: 450,
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
      {Object.keys(tabs).map((tab, i) => <Tab key={i} text={tab} component={tabs[tab]} selected={selected === tab} selectFn={selectFn}/>)}
    </div>
  )
}

const Profile = () => {
  return (
    <div>
      <p style={styles.text}>
        I'm a fullstack web developer who loves backend work and programming hardware.
        <br/><br/>
        My tech experience includes:<br/>
        <ul>
          <li>
            Javascript for web and native apps (React and React Native),
          </li>
          <li>CSS, HTML, Flex Box and Bootstrap,</li>
          <li>
            node.js for API development, and PostgreSQL for querying/db management,
          </li>
          <li>integrating 3rd party APIs,</li>
          <li>Linux,</li>
          <li>BLE device and message management,</li>
          <li>scripting and library implementation with Python 3, notably openCV.</li>
        </ul>
        If I can learn all this from (almost) scratch in a year, I can learn other things fast, too.
        <br/><br/>
        Some fun facts! My degree is in Archaeology and Arabic from the University of Edinburgh in Scotland, and after that I was a grade school teacher for 5+ years. I've lived on four continents and have 2.5 passports. I started using the terminal for playing computer games around 1997, and built many geocities sites as a preteen. These days, I'm trying out farming and aquaponics at home, and practice medieval Arabic translation.
        <br/><br/>
        Why switch to software engineering from Archeaology or teaching? Code is open-ended and allows limitless creativity, and, is how to participate in building the future. I've been drawn to computers since messing with MS-DOS as a kid, and creating weird websites as a teen. If I'd ever had the chance to study computers in high school, I would, without a doubt, have studied CS at university.
        <br/><br/>
        I believe the best future is one where we build and support community. Here are some great tech initiatives helping their communities right now:
        <ul>
          <li>
            <a style={styles.a} target="_blank" href="https://codecooperative.org/">Code Cooperative mentors people affected by incarceration &#x21E8;</a>
          </li>
          <li>
            <a style={styles.a} target="_blank" href="https://elpha.com/">Elpha provides a social network to women and femmes in tech &#x21E8;</a>
          </li>
        </ul>
      </p>
      <div style={{ width: 'fit-content', marginTop: '45px' }}>
        <a style={styles.a} target="_blank" href="https://docs.google.com/document/d/1SNIqC6LjeXw5NvsxRQd6JKZxAlE6pKgrGa_xc7sfs1I/?usp=sharing">Check out my resume &#x21E8;</a>
      </div>
    </div>
  )
}

const Demo = ({ data }) => {
  return (
    <div style={styles.demoWell}>
      <div>
        <h2>{data.title}</h2>
      </div>
      <p style={{ fontWeight: 400 }}>{data.subtitle}</p>
      <div style={{ margin: 33 }}>
        <p style={{ fontSize: 16, color: '#444' }}>
          {data.url.length ? data.url : "Coming Soon..."}
        </p>
      </div>
    </div>
  )
}

const Demos = (data) => {
  return (
    Object.values(data).map(demo => Demo({ data: demo }))
  )
}

const Contact = () => {
  return (
    <div>
     <h2>
      Coming Soon
     </h2>
    </div>
  )
}

const demos = {
  pokemon: {
    title: 'Pokemon API Battle Game',
    subtitle: 'play a terminal Pokemon game that uses a Pokedex API',
    start: 'type \'help\' into the terminal and send',
    url: '',
    // maybe websockets for saving high scores? or just db? mongodb?
    // websocket to play against another player? (sign in code?)
  },
  userData: {
    title: 'You on the Web',
    subtitle: 'what web browsers see when you use them',
    start: 'We\'ve already grabbed some data from your browser, take a look.',
    url: '',
    // system details, geolocation, wifi? signed-in accounts? fb data, ad data?
  },
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
    // google translate voice api?
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
  'Contact': {
    component: Contact
  },
}

export default class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'Profile'
    }
  }
  render() {
    return (
      <div style={styles.main}>
        <Tabs tabs={tabs} selected={this.state.selected} selectFn={val => this.setState({ selected: val})} />
        <div style={styles.content}>
          {React.createElement(tabs[this.state.selected].component, tabs[this.state.selected].data || undefined)}
        </div>
      </div>
    )
  }
}
