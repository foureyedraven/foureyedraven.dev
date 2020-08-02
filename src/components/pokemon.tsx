/*
  Uses an updated Terminal module (react-bash-typescript)[https://github.com/foureyedraven/react-bash-typescript]
  to interact with PokeAPI (https://pokeapi.co/) and deliver
  an interactive Pokemon battle game in the client.
*/

/*
  Gives sense of accomplishment (addictive).
  (Report overall stats each game, desire to round up numbers
  (use larger increments, challenge people to reach a level)).
  Should give pointers on what to do at the beginning to accomplish some goal.
  Gives sense of adventure. (Maybe add regions you can go to. Or restrict V1 to certain region)
  The more you play, the higher your XP, and higher the range of pokemon you can choose.
  Or, you capture who you defeat. (desire to save progress, or accomplish more, ability to see accomplishments (battles, captured pokemon))
  randomize commentary, and get more complex and comedic/weirdly personal as things go on, a la warcraft npcs
  save progress in cache? initial state will pull from cache

  what's to stop ppl just using the best attack each time?
  can use the pp. or, inverse of their power
  but then we have to track the moves used. Which may be ok...
  Or, make the power of their move porportional to their hp: weaker they are, less powerful move they can use.
  User starts with a single pokemon - pikachu?
*/

/*
  TODO
  add loading animation command
  test serving content split at \n in terminal
  update terminal README
  add win magikarp animation (maybe do reverse magikarp on lose)
  add message if loading fails? test offline, add msg to Terminal
  consider limiting opponent pokemon to a ratio of user's available pokemon (still could have charizard etc...)
  add github inset text for demo
  consider adding an ascii art for pokemon per move played (get from fiikus? via crawling?)
  add increase in base HP depending on user XP level
*/

import * as React from 'react'
import Terminal from 'react-bash-typescript'
import { isEmpty } from 'lodash'
import { toCapitalCase, getRandomInteger } from '../utils'
import { pokemonRules, history, structure, extensions, SUCCESS } from './pokemon/data'
import { getPokemon, getMove } from './pokemon/api'
import {
  returnError,
  returnUnavailable,
  returnReport,
  formatPokemonResponse,
  formatMoveResponse,
  formatGameResponse,
  calculateDamage
} from './pokemon/functions'

interface Props {}

interface State {
  input: string
  message: string
  currPlayer: "user" | "opponent"
  players: {
    user: PokemonProps | undefined
    opponent: PokemonProps | undefined
  }
  report: ReportProps
}

interface ReportProps {
  userXP: number
  availablePokemon?: string[],
  wins: object[] // { pokemon:number, opponent:number }
  losses: object[]
}

interface PokemonProps {
  id: number
  abilities: []
  moves: {}
  name: string
  types: []
  stats: {
    hp: number
    attack: number
    defense: number
    speed: number
  },
  base_experience: number
  height: number // decimetres
  weight: number // hectograms
}

export class Pokemon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      input: '',
      message: '',
      currPlayer: "user",
      players: {
        user: undefined,
        opponent: undefined
      },
      report: {
        userXP: 150,
        availablePokemon: ['Pikachu'],
        // Limit the available pokemon for a new player,
        // add defeated pokemon. "Sorry, you don't have access to that Pokemon!"
        wins: [],
        losses: [],
      },
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Commands as "input" are coming from Terminal to operate gameplay:
    if (prevState.input !== this.state.input && this.state.message === '') {
      const inputArr = this.state.input.toLowerCase().split(' ')
      const cmd = inputArr[0]
      const arg = inputArr[1]

      if (cmd === 'play') {
        if (arg === 'random') {
          // This is a hidden cheat
          this.returnPokemon(getRandomInteger(0, 129))
        } else if (arg) {
          if (!this.state.report.availablePokemon.includes(toCapitalCase(arg))) {
            this.setState({ message: returnUnavailable(this.state.report.availablePokemon)})
            return
          } else {
            this.returnPokemon(arg)
          }
        } else {
          this.setState({ message: pokemonRules })
        }
      } else if (cmd === 'report') {
        this.setState({ message: returnReport(this.state.report) })
      } else if (cmd === 'battle') {
        // maybe have opponent return most similar move,
        // or do that half the time to appear smart
        if (!isEmpty(this.state.players.user)) {
          this.returnOpponent()
        } else if (!isEmpty(this.state.players.opponent)) {
          this.setState({
            message: 'You\'re already in a battle! You can\'t get a new opponent.\nYou can \'forfeit\' to battle someone new.'
          })
        } else {
          this.setState({
            message: 'You need to pick a Pokemon before battling'
          })
        }
      } else if (cmd === 'forfeit') {
        const opponentName = toCapitalCase(this.state.players.opponent.name)
        this.setState({
          players: {
            ...this.state.players,
            opponent: undefined
          },
          message: `\n${opponentName} has left the ring. How about someone a little easier?\n\n`
          })
      } else if (cmd === 'use') {
        if (arg) {
          this.returnMove(arg)
        } else {
          this.setState({
            message: 'Use what?'
          })
        }
      }
      this.setState({ input: '' })
    }

    // Have to check if currPlayer change is caused by
    // ending a battle (deleting players) or switching turns
    if (prevState.currPlayer !== this.state.currPlayer && this.state.players.opponent) {
      if (this.state.players.user.stats.hp <= 0) {
        this.endBattle(false)
      } else if (this.state.players.opponent.stats.hp <= 0) {
        this.endBattle(true)
      } else if (this.state.currPlayer === "opponent") {
        const randomMove = this.state.players.opponent.moves[getRandomInteger(0, 9)]
        this.returnMove(randomMove)
      }
    }

    // Something Special
    if (prevState.report.userXP !== this.state.report.userXP && this.state.report.userXP >= 500) {
      SUCCESS.split('\n').forEach(line => setTimeout(() => {
        this.setState({message: line})
      }, 500))
    }
  }

  returnPokemon = (monster:string | number) => {
    getPokemon(monster).then(res => {
      this.setState({
        message: formatPokemonResponse(res)['pokemon'],
        players: {
          ...this.state.players,
          user: res
        }
      })
    }).catch(err => this.setState({
      message: returnError(monster, 'pokemon'),
    }))
  }

  returnOpponent = () => {
    getPokemon(getRandomInteger(1, 129)).then(res => {
      this.setState({
        message: formatPokemonResponse(res)['opponent'],
        players: {
          ...this.state.players,
          opponent: res
        },
      })
    }).catch(err => this.setState({
      message: 'Looks like that opponent is busy. Try again later!'
    }))
  }

  returnMove = (move:string) => {
    const attackerKey = this.state.currPlayer
    const defenderKey = this.state.currPlayer === "user" ? "opponent" : "user"
    // The more you play and gain XP, the more effect your attacks are,
    // no matter what pokemon you use (but pokemon matters, too)
    const level = Math.floor(this.state.report.userXP/10)
    // Get move data and display its message
    getMove(move).then((res) => {
      if (!res) { throw new Error }
      const damage = this.applyDamage({
        move: res,
        level,
        attackerKey,
        defenderKey
      })
      this.setState({
        currPlayer: this.state.currPlayer === "user" ? "opponent" : "user",
        message: formatMoveResponse({
          move: res,
          damage,
          attacker: this.state.players[attackerKey],
          defender: this.state.players[defenderKey]
        })['attack'],
      })
    }).catch(err => this.setState({
      message: returnError(move, 'move'),
    }))
  }

  endBattle = (win:boolean) => {
    const { user, opponent } = this.state.players
    var report
    if (win) {
      report = {
        ...this.state.report,
        availablePokemon: !this.state.report.availablePokemon.includes(opponent.name) ? this.state.report.availablePokemon.concat(opponent.name) : this.state.report.availablePokemon,
        userXP: this.state.report.userXP + opponent.base_experience,
        wins: this.state.report.wins.concat({
          user: user.name,
          opponent: opponent.name
        })
      }
    } else {
      report = {
        ...this.state.report,
        losses: this.state.report.losses.concat({
          user: user.name,
          opponent: opponent.name
        })
      }
    }
    setTimeout(() => {
      this.setState({
        message: formatGameResponse({ opponent, user })[win ? "win" : "loss"].concat(returnReport(report)),
        report,
        players: {
          user: undefined,
          opponent: undefined
        },
        currPlayer: 'user'
      })
    }, 1000)
  }

  applyDamage = ({ move, level, attackerKey, defenderKey }) => {
    const damage = calculateDamage({
      move,
      level,
      attacker: this.state.players[attackerKey],
      defender: this.state.players[defenderKey]
    })
    const hp = this.state.players[defenderKey].stats.hp - damage
    this.setState({
      players: {
      ...this.state.players,
      [defenderKey]: {
        ...this.state.players[defenderKey],
        stats: {
          ...this.state.players[defenderKey].stats,
          // Never register negative hp
          hp: hp > 0 ? hp : 0
        }
      }
    }})
    return damage
  }

  render() {
    return (
      <div>
        <Terminal
          extensions={extensions}
          structure={structure}
          history={history}
          prefix="player1@pokemaster"
          message={this.state.message}
          getTerminalInput={input => this.setState({ input })}
          resetMessage={() => this.setState({ message: '' })}
          currentPokemon={this.state.players.user} // <-- what are these for? need to keep terminal light
          currentOpponent={this.state.players.opponent} // <-- what are these for? need to keep terminal light
        />
      </div>
    )
  }
}

export default Pokemon
