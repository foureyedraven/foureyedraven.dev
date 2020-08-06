// Functions for gameplay
import { isEmpty } from 'lodash'
import { toCapitalCase, getCorrectParticle, getRandomFloat } from '../../../utils'
import { asciiNumbers } from './data'
/*  - - - - - - - - - - - - -  */
/*  Data formatting functions  */
/*  - - - - - - - - - - - - -  */
// Because responses appear in a <pre> tag,
// we format text exactly as desired to appear
// Sorry for the eye strain

export const returnError = (val?:string | number, type?:string) => {
  return `\n${val} is not a ${type}! Check your spelling?\n\n`
}

export const returnUnavailable = data => {
  return `\nSorry, that Pokemon is not available to you. Try one of these:

  ${data.join('\n  ')}\n\n`
}

export const score = ({ user, opponent }) => {
  // Can only work if both Pokemon are available
  if (isEmpty(user) || isEmpty(opponent)) return

  const getAsciiHp = (hp: number) => {
    return String(hp)
      .padStart(3, '0')
      .split('')
      .map(num => asciiNumbers[num]
      .split('\n'))
  }
  const userScore = getAsciiHp(user.stats.hp)
  const opponentScore = getAsciiHp(opponent.stats.hp)

  const top = `
   ###  PLAYER 1  ###           ###  OPPONENT  ###
........................     ........................`
  const bottom = `........................     ........................`
  return`
${top}
. ${userScore[0][0].padEnd(6, ' ')} ${userScore[1][0].padEnd(6, ' ')} ${userScore[2][0].padEnd(6, ' ')} .     . ${opponentScore[0][0].padEnd(6, ' ')} ${opponentScore[1][0].padEnd(6, ' ')} ${opponentScore[2][0].padEnd(6, ' ')} .
. ${userScore[0][1].padEnd(6, ' ')} ${userScore[1][1].padEnd(6, ' ')} ${userScore[2][1].padEnd(6, ' ')} .     . ${opponentScore[0][1].padEnd(6, ' ')} ${opponentScore[1][1].padEnd(6, ' ')} ${opponentScore[2][1].padEnd(6, ' ')} .
. ${userScore[0][2].padEnd(6, ' ')} ${userScore[1][2].padEnd(6, ' ')} ${userScore[2][2].padEnd(6, ' ')} .     . ${opponentScore[0][2].padEnd(6, ' ')} ${opponentScore[1][2].padEnd(6, ' ')} ${opponentScore[2][2].padEnd(6, ' ')} .
. ${userScore[0][3].padEnd(6, ' ')} ${userScore[1][3].padEnd(6, ' ')} ${userScore[2][3].padEnd(6, ' ')} .     . ${opponentScore[0][3].padEnd(6, ' ')} ${opponentScore[1][3].padEnd(6, ' ')} ${opponentScore[2][3].padEnd(6, ' ')} .
. ${userScore[0][4].padEnd(6, ' ')} ${userScore[1][4].padEnd(6, ' ')} ${userScore[2][4].padEnd(6, ' ')} .     . ${opponentScore[0][4].padEnd(6, ' ')} ${opponentScore[1][4].padEnd(6, ' ')} ${opponentScore[2][4].padEnd(6, ' ')} .
${bottom}
  `
// need to come up with a nice algorithm for above.
// eg return
// `
//   .   ##     ##       #  .     .   ##    ####   ####  .
//   .  #  #   #  #      #  .     .  #  #      #   #  #  .
//   .  #  #     #       #  .     .  #  #   ####   ####  .
//   .  #  #    #        #  .     .  #  #      #      #  .
//   .   ##    ####      #  .     .   ##    ###    ###   .`

}

export const returnReport = data => {
  // To add WINS: ${data.wins.length ? data.wins.map(win => win.user + '  VS  ' + win.opponent).join('\n  ') : 'NONE'}
  return `\n### PLAYER 1 ######

PLAYER XP: ${data.userXP}

AVAILABLE POKEMON:

${'  ' + data.availablePokemon.map((pokemon, i, arr) =>
  pokemon + (!(i%2) ? i != arr.length - 1 ? ' \t' : '\n' : '\n  ')
).join('')}\n`
}

export const formatPokemonResponse = (data) => {
  return {

/////////////////
    pokemon: `\n###################
${('###  ' + data.name.toUpperCase() + '  ').padEnd(19, '#')}
###################

${data.name} is ${getCorrectParticle(data.types.join('- & '))}-type Pokemon with ${data.stats.hp} HP.

#####  MOVES  #####
You can battle with the following moves:
${data.moves.map(move => `    >>   ${move}`).join(', \n')}

Type battle to fight!\n\n`,

//////////////////
    opponent: `\nYour opponent is...\n
###################
${('###  ' + data.name.toUpperCase() + '  ').padEnd(19, '#')}
###################\n
${data.name} (HP: ${data.stats.hp}) is winding up their first move!

Type use {move name} with your Pokemon's move,
like: use body-slam \n\n`,
  }
}

export const formatMoveResponse = (data) => {
  return {
  attack: `\n### ${data.attacker.name} goes for ${getCorrectParticle(data.move.name)} attack!

That takes ${data.damage} HP from ${data.defender.name}.\n\n`,
  }
}

export const formatGameResponse = ({ user, opponent }) => {
  return {
    win: `\n###################
###  You won!
###  Your XP and your Pokemon's HP went up!
###################\n\n`,
    loss: `\n###################
###  You lost!
###################\n\n`
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
