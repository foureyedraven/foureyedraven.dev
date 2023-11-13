import * as React from "react"
import { TabState } from "./constants"
import Pokemon from "./demos/pokemon"

const logo = require("../../public/assets/GitHub-Mark-32px.png")

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
    maxWidth: 666
  },
  p: {
    margin: 0,
    padding: 0,
    borderBottom: '1px solid #111',
    width: 'fit-content'
  },
  textTab: {
    color: '#fff',
    fontSize: '1.2rem',
    margin: 0,
    textDecoration: 'none',
    paddingBottom: 5,
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
    <div>
    <p style={styles.textBody}>
      <h2>My CV</h2>
        I've worked as a fullstack web developer since December 2018, and I love API development and interacting with hardware.
        <br/><br/>
        My experience includes:<br/>
        <ul>
          <li>
            building SPAs and web apps from scratch using node.js, CSS, HTML, React, and Typescript,
          </li>
          <li>implementing UX/UI designs to pixel perfection from Figma and Adobe XD,</li>
          <li>
            API development with node.js and Java,
          </li>
          <li>
            PostgreSQL for queries, migrations and db management,
          </li>
          <li>integrating 3rd party APIs,</li>
          <li>integrating microservices,</li>
          <li>making the most of Cloud platforms AWS and Google Cloud Platform,</li>
          <li>BLE device and message management,</li>
          <li>scripting and library implementation with Python 3, notably openCV.</li>
        </ul><br/>
        At <a target="_blank" href="https://www.soundcloud.com">SoundCloud</a>, I helped to build <a target="_blank" href="https://artists.soundcloud.com">SoundCloud for Artists</a>, while also redesigning microservice features and the integration for asset delivery jobs, error reporting from log profiling, and connecting the Artists platform (formerly Repost) to soundcloud.com.
        <br/><br/>
        At <a target="_blank" href="https://ozobot.com/">Ozobot</a>, I created and participated in new ways to deliver educational content and assessment of student work. Classwork is more worthwhile when students are naturally engaged, and I'm proud of the work we have done to break educational moulds to benefit the student.
        <br/><br/>
        <div style={{ width: 'fit-content' }}>
          <a target="_blank" href="https://docs.google.com/document/d/1SNIqC6LjeXw5NvsxRQd6JKZxAlE6pKgrGa_xc7sfs1I/?usp=sharing">Check out my resume &#x21E8;</a>
        </div>
        <br/>
        <h2>About Me</h2>
        {/* I learned most of this from scratch on the job in my first 6 months. Before my Jr Dev job, I learned MVC architecture with Ruby on Rails and HTML and CSS from many 90s Geocities sites. I also developed the majority of the consumer and educational coding content for <a style={styles.a} href='https://ozobot.com' target='_blank'>Ozobot's</a> robots using Blockly. */}
        Some fun facts! My master's degree is in Archaeology and Arabic from the University of Edinburgh, Scotland. After that, I worked as a grade school teacher for 5 years (including in Seoul). I'm a multinational and have lived on four continents. These days, I live in Los Angeles where I garden native plants, explore fibre arts like knitting, and study Japanese towards fluency.
        <br/><br/>
        <h2>Links</h2>
        I believe nurturing community is important. Here are some great tech initiatives helping their communities right now:
        <ul>
          <li>
            <a target="_blank" href="https://codecooperative.org/">Code Cooperative mentors people affected by incarceration &#x21E8;</a>
          </li>
          <li>
            <a target="_blank" href="https://elpha.com/">Elpha provides a supportive social network to women and non-binary women in tech &#x21E8;</a>
          </li>
        </ul>
      </p>
    </div>
  )
}

const Demo = ({ data }) => {
  return (
    <div style={styles.demoWell} key={data.title}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <h2>{data.title}</h2>
          <p style={{ fontWeight: 400 }}>{data.subtitle}</p>
        </div>
        <div style={{padding: 20}}>
          <a href={`https://github.com/foureyedraven/foureyedraven.dev/tree/main/src/components/demos/${data.filename}.tsx`} target="_blank"><img src={String(logo)} alt="GitHub" width="32px" height="32px"/></a>
        </div>
      </div>
      <div style={{ margin: 33 }}>
        {!!data.component ? React.createElement(data.component) : <p style={{ fontSize: 16, color: '#444' }}>Coming Soon...</p>}
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

    </div>
  )
}

const demos = {
  pokemon: {
    title: 'Pokemon API Battle Game',
    subtitle: 'play a terminal Pokemon game that uses a Pokedex API',
    start: 'type \'help\' into the terminal to start',
    filename: 'pokemon',
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
  // satellites: {
  //   title: 'What\'s Above You',
  //   subtitle: 'watch an animation of the satellites in your current sky',
  //   start: 'Accept your location, or enter your coordinates',
  //   url: '',
  // },
  // opencv: {
  //   title: 'Transliterate A Photo',
  //   subtitle: 'use computer vision to transliterate text from a photo to a chosen alphabet',
  //   start: 'Choose a language to transliterate to, and upload a photo with another alphabet\'s text',
  //   url: '',
  //   // google translate voice api? to read out response (native accent)
  // },
  // webble: {
  //   title: 'What\'s in Your Bluetooth Device',
  //   subtitle: 'poke around your bluetooth device using the web-ble library',
  //   start: 'Click on Connect To BLE Device',
  //   url: '',
  // }
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
}

export class Content extends React.Component<{}, NavTabsState> {
  constructor(props: {}) {
    super(props);
    this.state = { tabState: "Demos" };
  }

  componentDidMount() {
    setTimeout(() => { window.scrollTo(0, 0) }, 100)
  }

  render() {
    return (
      <div style={styles.main}>
        <Tabs tabs={tabs} selected={this.state.tabState} selectFn={val => this.setState({ tabState: val })} />
        <div style={styles.content}>
          {React.createElement(tabs[this.state.tabState].component, tabs[this.state.tabState].data || undefined)}
        </div>
      </div>
    )
  }
}
