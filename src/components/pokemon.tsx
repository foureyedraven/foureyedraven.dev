// show terminal
// create commands

import * as React from 'react';
import Terminal from 'react-bash-typescript'
import axios from 'axios';

const pikachu =`
  \u00A0\u00A0\u00A0\u00A0/\\\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\\\u00A0/\\\n
  \u00A0\u00A0\u00A0/\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0/\u00A0\\\u00A0\\\n
  \u00A0\u00A0/\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0______\u00A0\u00A0\u00A0______\u00A0\u00A0\u00A0______\u00A0\u00A0\u00A0\u00A0/\u00A0/\u00A0\u00A0\u00A0\\\u00A0\\\n
  \u00A0/\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/_____/\u00A0\u00A0/_____/\u00A0\u00A0/_____/\u00A0\u00A0\u00A0/\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\\\u00A0\\\n
  /\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\\\u00A0\\\n
  \\/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\\/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\\/\n
  \u00A0\u00A0\u00A0\u00A0\u00A0/\\\u00A0\u00A0\u00A0\u00A0\u00A0___\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0___\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\\\n
  \u00A0\u00A0\u00A0\u00A0/\u00A0/\u00A0\u00A0\u00A0\u00A0/\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0/\n
  \u00A0\u00A0\u00A0/\u00A0/\u00A0\u00A0\u00A0\u00A0/\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0/\n
  \u00A0\u00A0/\u00A0/\u00A0\u00A0\u00A0\u00A0(\u00A0\u00A0(\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0(\u00A0\u00A0(\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0/\n
  \u00A0/\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\\\u00A0\u00A0\\\u00A0\u00A0\u00A0\u00A0\u00A0/\\\u00A0\u00A0\u00A0\u00A0\\\u00A0\u00A0\\\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0/\n
  \u00A0\\/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\\__\\\u00A0\u00A0\u00A0\u00A0\\/\u00A0\u00A0\u00A0\u00A0\u00A0\\__\\\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\\/\n
  \u00A0/\\\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\\\n
  \u00A0\\\u00A0\\\u00A0\u00A0\u00A0\u00A0\u00A0/\\|\\/\\\u00A0\u00A0\u00A0__\u00A0\u00A0__\u00A0\u00A0\u00A0\u00A0\u00A0/\\|\\/\\\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0/\n
  \u00A0\u00A0\\\u00A0\\\u00A0\u00A0\u00A0_)\u00A0\u00A0\u00A0\u00A0(__\u00A0\\\u00A0\\/\u00A0\u00A0/\u00A0\u00A0\u00A0_)\u00A0\u00A0\u00A0\u00A0(__\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0/\n
  \u00A0\u00A0\u00A0\\\u00A0\\\u00A0\u00A0\\_\u00A0\u00A0\u00A0\u00A0\u00A0_/\u00A0\u00A0\\\u00A0\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\\_\u00A0\u00A0\u00A0\u00A0\u00A0_/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0/\n
  \u00A0\u00A0\u00A0\u00A0\\\u00A0\\\u00A0\u00A0\u00A0)\u00A0\u00A0\u00A0\u00A0\\\u00A0\u00A0\u00A0\u00A0\\_/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0)\u00A0\u00A0\u00A0\u00A0\\\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0/\n
  \u00A0\u00A0\u00A0\u00A0\u00A0\\/\u00A0\u00A0\u00A0\\/\\|\\/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\\/\\|\\/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\\/\n
`

const history = [
  { value: pikachu },
  { value: `>>` },
  { value: `>> PIKACHU SAYS: LET\'S PLAY` },
  { value: '>> TYPE help TO START' },
]

const newDir = {
  newFile: { content: "I'm Empty" }
}

const structure = { newDir }

interface IProps {}
interface IState {
  loading?: boolean
  result?: string
  input?: string
  apiResults?: string[]
}
export class Pokemon extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      // loading: false,
      // result: '',
      input: '',
      apiResults: []
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading) {
      console.log("loading", this.state)
    }
    if (prevState.input !== this.state.input) {
      if (this.state.input.startsWith('play')) {
        const monster = this.state.input.split(' ')[1]
        this.resolvePokemon(monster)
      }
    }
  }

  getPokemon = async (pok) => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${pok}`)
  }

  resolvePokemon = (monster) => {
    this.getPokemon(monster).then(res => {
      this.setState({
        apiResults: [`${res.data['species'].name} has ${res.data['abilities'].length} abilities: ${res.data['abilities'].map(ability => ability.ability['name']).join(' and ')}.`],
        // loading: false,
        input: '',
      })
    }).catch(err => this.setState({
      apiResults: [`${monster} is not a real pokemon! Check your spelling?`],
      input: '',
    }))
  }

  sendResults = () => {

  }

  play = {
    exec: (state) => {
      return Object.assign({}, state, {
        loading: true,
      })
    },
  }
  extensions = { play: this.play }

  render() {
    console.log("pokemon", this.state)
    return (
      <div>
        <Terminal
          extensions={this.extensions}
          structure={structure}
          history={history}
          apiResults={this.state.apiResults}
          // loading={this.state.loading}
          getTerminalInput={input => this.setState({ input })}

        />
      </div>
    )
  }
}

export default Pokemon

// export interface Props {
//   name: string;
//   enthusiasmLevel?: number;
// }

// function Pokemon({ name, enthusiasmLevel = 1 }: Props) {
//   if (enthusiasmLevel <= 0) {
//     throw new Error('You could be a little more enthusiastic. :D');
//   }

//   return (
//     <div className="hello">
//       <div className="greeting">
//         Hello {name + getExclamationMarks(enthusiasmLevel)}
//       </div>
//     </div>
//   );
// }

// export default Pokemon;
// // helpers

// function getExclamationMarks(numChars: number) {
//   return Array(numChars + 1).join('!');
// }
