/*
  Uses an updated Terminal module (react-bash-typescript)[https://github.com/foureyedraven/react-bash-typescript]
  to interact with PokeAPI (https://pokeapi.co/) and deliver
  an interactive Pokemon battle game in the client.
*/
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
  calculateDamage,
  score
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
  private inputRef: React.RefObject<HTMLInputElement>;
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
        wins: [],
        losses: [],
      },
      loading: false
    }
    this.inputRef = React.createRef()
  }

  componentDidUpdate(prevProps, prevState) {
    // Fix for Chrome, which likes to control/twitch the body scroll height.
    // which ruins the UX. Below forces users to play game with terminal scrolled
    // to either "top", "center", or "bottom" on Chrome.
    this.inputRef.current.scrollIntoView({ behavior: "auto", block: "center" })

    // Commands as "input" are coming from Terminal to operate gameplay:
    if (prevState.input !== this.state.input && this.state.message === '') {
      const inputArr = this.state.input.toLowerCase().split(' ')
      const cmd = inputArr[0]
      const arg = inputArr[1]

      if (cmd === 'play') {
        if (arg === 'random') {
          // This is a hidden cheat for now
          this.returnPokemon(getRandomInteger(0, 129))
        } else if (arg) {
          if (!this.state.report.availablePokemon.includes(toCapitalCase(arg))) {
            this.setState({ message: returnUnavailable(this.state.report.availablePokemon)})
          } else if (!isEmpty(this.state.players.opponent)) {
            this.setState({ message: '\nYou can\'t select a new player during a battle!\n\n'})
          } else {
            this.returnPokemon(arg)
          }
        } else {
          this.setState({ message: pokemonRules })
        }
      } else if (cmd === 'report') {
        this.setState({ message: returnReport(this.state.report) })
      } else if (cmd === 'battle') {
        // First opponent should be easy
        if (!isEmpty(this.state.players.user)) {
          this.returnOpponent()
        } else if (!isEmpty(this.state.players.opponent)) {
          this.setState({
            message: '\nYou\'re already in a battle! You can\'t get a new opponent.\nYou can \'forfeit\' to battle someone new.\n'
          })
        } else {
          this.setState({
            message: `\nYou need to pick a Pokemon before battling. Try: play pikachu\n\n`
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
          if (!isEmpty(this.state.players.user)) {
            if (!isEmpty(this.state.players.opponent)) {
              if (this.state.players.user.moves.includes(arg)) {
                this.returnMove(arg)
              } else {
                this.setState({ message: '\nYour Pokemon doesn\'t have that move!\n\n'})
              }
            } else {
              this.setState({ message: `\nYou need to battle before using a move.\n\n`})
            }
          } else {
            this.setState({
              message: returnError(arg, 'move'),
            })
          }
        } else {
          this.setState({
            message: '\nUse what?\n\n'
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
        // Runs . . . animation in terminal
        this.setState({ loading: true})
        setTimeout(() => {
          const randomMove = this.state.players.opponent.moves[getRandomInteger(0, 9)]
          this.returnMove(randomMove)
          this.setState({ loading: false})
        }, 2000)
      } else if (this.state.currPlayer === "user") {
        this.setState({ message: '\nUse another move!\n\n'})
      }
    }

    // Something Special
    if (prevState.report.userXP !== this.state.report.userXP
      && this.state.report.userXP >= 500 && prevState.report.userXP < 500
    ) {
      SUCCESS.split('\n').forEach(line => setTimeout(() => {
        this.setState({message: line})
      }, 1000))
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
    const opponentId = this.state.report.wins.length ? getRandomInteger(1, 129) : 50
    getPokemon(opponentId).then(res => {
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
    const level = Math.floor(this.state.report.userXP/15)
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
        })['attack'] + score(this.state.players),
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
        availablePokemon: !this.state.report.availablePokemon.includes(opponent.name) ?
          this.state.report.availablePokemon.concat(opponent.name)
          : this.state.report.availablePokemon,
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
        message: formatGameResponse({ opponent, user })[win ? "win" : "loss"]
          .concat(returnReport(report)
          .concat(`\nPlay an AVAILABLE POKEMON for another battle!\n\n`)),
        report,
        players: {
          user: undefined,
          opponent: undefined
        },
        currPlayer: 'user'
      })
    }, 2000)
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
      <div ref={this.inputRef}>
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
