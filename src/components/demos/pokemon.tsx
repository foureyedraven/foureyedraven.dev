/*
  Uses an updated Terminal module (react-bash-typescript)[https://github.com/foureyedraven/react-bash-typescript]
  to interact with PokeAPI (https://pokeapi.co/) and deliver
  an interactive Pokemon battle game in the client.
*/

// TODO
// make points in battle clearer
// make first opponent always easy (diglett?)
// make the moves easier to use (autocomplete?)
// make instructions from step to step clearer
// only show report on a win?


import * as React from 'react'
import Terminal from 'react-bash-typescript'
import { isEmpty } from 'lodash'
import { toCapitalCase, getRandomInteger } from '../../utils'
import { pokemonRules, history, structure, extensions, SUCCESS } from './pokemon/data'
import { getPokemon, getMove, getAsciiArt } from './pokemon/api'
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
  loading: boolean
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
  moves: string[]
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
      loading: false
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
          if (this.state.players.user.moves.includes(arg)) {
            this.returnMove(arg)
          } else {
            this.setState({ message: 'Your Pokemon doesn\'t have that move!'})
          }
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
        this.setState({ loading: true})
        setTimeout(() => {
          const randomMove = this.state.players.opponent.moves[getRandomInteger(0, 9)]
          this.returnMove(randomMove)
          this.setState({ loading: false})
        }, 1000)
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
      // A chosen Pokemon's HP and attack stat goes up with user XP
      const hp = res.stats.hp + Math.floor(this.state.report.userXP / 15)
      const attack = res.stats.hp + Math.floor(this.state.report.userXP / 20)
      const pokemon = {
        ...res,
        stats: {
          ...res.stats,
          hp,
          attack
        }
      }
      this.setState({
        message: formatPokemonResponse(pokemon)['pokemon'],
        players: {
          ...this.state.players,
          user: pokemon
        }
      })
    }).catch(err => this.setState({
      message: returnError(monster, 'pokemon'),
    }))
  }

  returnOpponent = () => {
    getPokemon(getRandomInteger(1, 129)).then(res => {
      // Show ASCII art of opponent
      const id = res.id + ""
      getAsciiArt(id.padStart(3, '0')).then(res => this.setState({ message: res.data }) )
        .catch(err => console.log(err))

      this.setState({
        message: formatPokemonResponse(res)['opponent'].concat(),
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
    // The more you play and gain XP, the more effect your, and your opponent's,
    // attacks are, no matter what pokemon you use (but pokemon matters, too).
    // In original game, opponents get more difficult as you progress.
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
        // Run . . . animation in terminal
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
          loading={this.state.loading}
          getTerminalInput={input => this.setState({ input })}
          resetMessage={() => this.setState({ message: '' })}
        />
      </div>
    )
  }
}

export default Pokemon
