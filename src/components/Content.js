import React, { Component } from 'react'
import { Terminal } from 'xterm';

const term = new Terminal();

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
    paddingBottom: '5px',
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
        Hiya! I'm a fullstack web developer who loves backend work and programming hardware.
        <br/><br/>
        Fun facts: My degree is in Archaeology and Arabic from the University of Edinburgh in Scotland, and after that I was a grade school teacher for 5+ years. I started using the terminal for playing computer games around 1997, and built many geocities sites as a preteen. I've lived on four continents. I'm currently trying out farming and aquaponics at home.
        <br/><br/>
        I choose to work in software because:
        <ol>
          <li>
            it's fun to manipulate data and problem solve on the fly,
          </li>
          <li>
            code is open-ended and allows limitless creativity, and,
          </li>
          <li>
            programming is how to participate in building the future.
          </li>
        </ol>
        I believe the best future is one where we support community. Here are some great tech initiatives helping their communities right now:
        <ul>
          <li>
            <a style={styles.a} target="_blank" href="https://codecooperative.org/">Code Cooperative &#x21E8;</a>
          </li>
        </ul>
      </p>
      <div style={{ width: 'fit-content', marginTop: '45px' }}>
        <a style={styles.a} target="_blank" href="https://docs.google.com/document/d/1SNIqC6LjeXw5NvsxRQd6JKZxAlE6pKgrGa_xc7sfs1I/edit?usp=sharing">Check out my resume &#x21E8;</a>
      </div>
    </div>
  )
}

const Demos = () => {
  return (
    <div>
     <h2>
      Coming Soon
     </h2>
    </div>
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

export default class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'Profile',
      tabs: {
        'Demos': {
          component: Demos
        },
        'Profile': {
          component: Profile
        },
        'Contact': {
          component: Contact
        },
      }
    }
  }
  render() {
    return (
      <div style={styles.main}>
        <Tabs tabs={this.state.tabs} selected={this.state.selected} selectFn={val => this.setState({ selected: val})} />
        <div style={styles.content}>
          {React.createElement(this.state.tabs[this.state.selected].component)}
        </div>
      </div>
    )
  }
}

term.open(document.getElementById('xterm-container'));
