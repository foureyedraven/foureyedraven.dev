// API calls for the Pokemon API Battle Game demo
import axios from 'axios'
import { getRandomInteger } from '../../utils'

export const getPokemon = async (monster:string | number) => {
  return await axios.get(`https://pokeapi.co/api/v2/pokemon/${monster}`)
}

export const getAbility = async (ability:string) => {
  return await axios.get(`https://pokeapi.co/api/v2/ability/${ability}`)
}

export const getMove = async (move:number) => {
  return await axios.get(`https://pokeapi.co/api/v2/move/${move}`)
}

export const getOpponent = async () => {
  return await axios.get(`https://pokeapi.co/api/v2/pokemon/${getRandomInteger()}`)
}
