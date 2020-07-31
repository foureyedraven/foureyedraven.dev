// Functions for gameplay
import { toCapitalCase, getCorrectParticle } from '../../utils'
import { omit } from 'lodash'

/*  - - - - - - - - - - - - -  */
/*  Data formatting functions  */
/*  - - - - - - - - - - - - -  */


export const returnError = (val?:string | number, type?:string) => {
  return `${val} is not a real ${type}! Check your spelling?`
}

export const formatResponse = (data?) => {
  // Because responses appear in a <pre> tag, we format text exactly as desired to appear
  // Sorry for the eye strain
  return {

    pokemon: `
###################
${('###  ' + data.name.toUpperCase() + '  ').padEnd(19, '#')}
###################

${toCapitalCase(data.name)} is ${getCorrectParticle(data.types.join('- & '))}-type pokemon with ${data.abilities.length} ${data.abilities.length > 1 ? 'abilities' : 'ability' }:
${data.abilities.join(' and ')}.

#####  MOVES  #####
You can play with the following moves:
${data.moves.map(move => `    >>   ${move}`).join(', \n')}\n\n`,


//     move: `
// ###################
// ${toCapitalCase(data.name)} goes for the ${data.move.name}!

// That takes ${calculateDamage(data)} from
//     `,


    opponent: `
Your opponent is...\n
###################
${('###  ' + data.name.toUpperCase() + '  ').padEnd(19, '#')}
###################\n
${toCapitalCase(data.name)} is winding up their first move! What's yours?\n`,


  }
}

export const transformPokemonData = (data) => {
  return {
    abilities: data.abilities.map(a => a.ability.name),
    moves: data.moves.slice(0, 9).map(move => move.move.name), // Get first 10, which are listed by index # so should be basic (otherwise there are too many)
    name: data.name,
    types: data.types.map(type => type.type.name),
    stats: data.stats.reduce((acc, curr) => {
      acc[curr.stat.name] = omit(curr, '[stat]')
      return acc
    }, {}),
    height: data.weight,
    weight: data.height,
  }
}

export const calculateDamage = (data?) => {

}

export const returnReport = (data?) => {

}
