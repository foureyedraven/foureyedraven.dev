// Functions for gameplay
import { toCapitalCase, getCorrectParticle, getRandomFloat } from '../../../utils'

/*  - - - - - - - - - - - - -  */
/*  Data formatting functions  */
/*  - - - - - - - - - - - - -  */


export const returnError = (val?:string | number, type?:string) => {
  return `${val} is not a real ${type}! Check your spelling?`
}

export const returnUnavailable = data => {
  return `
Sorry, that Pokemon is not available to you. Try one of these:

  ${data.join('\n')}
        `
}

export const returnReport = data => {
  return `
### PLAYER 1 ######

PLAYER XP: ${data.userXP}

AVAILABLE POKEMON:

${'  ' + data.availablePokemon.map((pokemon, i, arr) =>
  pokemon + (!(i%2) ? i != arr.length - 1 ? ' \t' : '\n' : '\n  ')
).join('')}
WINS:

  ${data.wins.length ? data.wins.map(win => win.user + '  VS  ' + win.opponent).join('\n  ') : 'NONE'}

LOSSES:

  ${data.losses.length ?  data.losses.map(loss => loss.user + '  VS  ' + loss.opponent).join('\n  ') : 'NONE'}
  `
}

export const formatPokemonResponse = (data) => {
  // Because responses appear in a <pre> tag,
  // we format text exactly as desired to appear
  // Sorry for the eye strain
  return {
    pokemon: `
###################
${('###  ' + data.name.toUpperCase() + '  ').padEnd(19, '#')}
###################

${data.name} is ${getCorrectParticle(data.types.join('- & '))}-type Pokemon with ${data.stats.hp} HP.

#####  MOVES  #####
You can battle with the following moves:
${data.moves.map(move => `    >>   ${move}`).join(', \n')}

ARE YOU READY TO battle?\n\n`,
// could add an animation to terminal that
// breaks text inputs from line breaks
// and serves them like 250ms at a time


    opponent: `
Your opponent is...\n
###################
${('###  ' + data.name.toUpperCase() + '  ').padEnd(19, '#')}
###################\n
${data.name} (HP: ${data.stats.hp}) is winding up their first move!

WHAT MOVE WILL YOU use?
\n`,
  }
}

export const formatMoveResponse = (data) => {
  return {
  attack: `
### ${data.attacker.name} goes for the ${data.move.name}!

That takes ${data.damage} HP from ${data.defender.name}.
${data.defender.name} is now at ${data.defender.stats.hp} HP!\n`,
  }
}

export const formatGameResponse = ({ user, opponent }) => {
  return {
    win: `
###################
###  You won!
###################\n`,
    loss: `
###################
###  You lost!
###################\n`
  }
}

export const transformPokemonData = (data) => {
  return {
    id: data.id,
    abilities: data.abilities.map(a => a.ability.name),
    // Get first 10 moves, which are listed by index # so
    // should be basic (otherwise there are too many (80+))
    moves: data.moves.slice(0, 9).map(move => move.move.name),
    name: toCapitalCase(data.name),
    types: data.types.map(type => type.type.name),
    stats: data.stats.reduce((acc, curr) => {
      acc[curr.stat.name] = curr.base_stat
      return acc
    }, {}),
    height: data.weight,
    weight: data.height,
    base_experience: data.base_experience
  }
}

export const transformMoveData = (data) => {
  return {
    id: data.id,
    name: data.name,
    power: data.power,
    type: data.type.name,
    accuracy: data.accuracy
  }
}

export const calculateDamage = ({ move, level, attacker, defender }) => {
  // Damage formula from the games, https://bulbapedia.bulbagarden.net/wiki/Damage
  return Math.floor(((((( 2 * level / 5) + 2) * move.power * attacker.stats.attack / defender.stats.defense)) / 50 + 2 ) * getRandomFloat())
}
