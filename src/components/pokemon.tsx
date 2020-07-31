// Uses an updated Terminal module (react-bash-typescript)[https://github.com/foureyedraven/react-bash-typescript]
// to interact with PokeAPI (https://pokeapi.co/) and deliver
// an interactive Pokemon battle game in the client.
// Gives sense of accomplishment. (addictive) (report overall stats each game, desire to round up numbers (use larger increments, challenge people to reach a level))
// should give pointers on what to do at the beginning to accomplish some goal.
// Gives sense of adventure. (Maybe add regions you can go to. Or restrict V1 to certain region)
// The more you play, the higher your XP, and higher the range of pokemon you can choose.
// Or, you capture who you defeat. (desire to save progress, or accomplish more, ability to see accomplishments (battles, captured pokemon))

import * as React from 'react'
import Terminal from 'react-bash-typescript'
import { isEmpty } from 'lodash'
import { toCapitalCase, getRandomInteger } from '../utils'
import { pokemonRules, history, structure, extensions } from './pokemon/data'
import { getPokemon, getOpponent, getAbility, getMove } from './pokemon/api'
import { returnError, formatResponse, transformPokemonData } from './pokemon/functions'

interface Props {}

interface State {
  input?: string
  message?: string
  currentPokemon?: PokemonProps
  currentOpponent?: PokemonProps
  report: ReportProps
}

interface ReportProps {
  userXP?: number
  availablePokemon?: [],
  wins?: []
  losses?: []
}

interface PokemonProps {
  abilities?: [],
  moves?: {},
  name?: string,
  types?: [],
  species?: string,
  stats?: {
    hp: number,
    attack: number,
    defense: number,
    speed: number,
  },
  height?: number, // decimetres
  weight?: number, // hectograms
}

export class Pokemon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      input: '',
      message: '',
      report: {},
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.input !== this.state.input) {
      const inputArr = this.state.input.toLowerCase().split(' ')
      const cmd = inputArr[0]
      const arg = inputArr[1]

      if (cmd === 'play') {
        if (arg === 'random') {
          this.returnPokemon(getRandomInteger())
        } else if (arg) {
          this.returnPokemon(arg)
        } else {
          this.setState({  message: pokemonRules })
        }
      } else if (cmd === 'battle') {
        // maybe have opponent return most similar move,
        // or do that half the time to appear smart
        if (!isEmpty(this.state.currentPokemon)) {
          this.returnOpponent()
        } else {
          this.setState({
            message: 'You need to pick a pokemon before battling'
          })
        }
      } else if (cmd === 'forfeit') {
        const opponentName = toCapitalCase(this.state.currentOpponent.name)
        this.setState({
          currentOpponent: {},
          message: `${opponentName} has left the ring. How about someone a little easier?`
          })
      } else if (cmd === 'use') {

      }
      this.setState({ input: '' })
    }
  }

  returnPokemon = (monster:string | number) => {
    getPokemon(monster).then(res => {
      const transformedData = transformPokemonData(res.data)
      console.log(transformedData)
      this.setState({
        message: formatResponse(transformedData)['pokemon'],
        currentPokemon: transformedData
      })
    }).catch(err => this.setState({
      message: returnError(monster, 'pokemon'),
    }))
  }

  returnMove = (monster:string) => {
    getPokemon(monster).then(res => {
      this.setState({
        message: formatResponse(res.data)['pokemon'],
      })
    }).catch(err => this.setState({
      message: returnError(monster, 'pokemon'),
    }))
  }

  returnOpponent = () => {
    getOpponent().then(res => {
      const transformedData = transformPokemonData(res.data)
      this.setState({
        message: formatResponse(transformedData)['opponent'],
        currentOpponent: transformedData,
      })
    }).catch(err => this.setState({
      message: 'Looks like that opponent is busy. Try again later!'
    }))
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
          currentPokemon={this.state.currentPokemon}
          currentOpponent={this.state.currentOpponent}
        />
      </div>
    )
  }
}

export default Pokemon
