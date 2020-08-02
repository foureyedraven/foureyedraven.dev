// API calls for the Pokemon API Battle Game demo
import axios from 'axios'
import { transformPokemonData, transformMoveData, returnError } from './functions'

export const getPokemon = async (monster:string | number) => {
  return await axios.get(`https://pokeapi.co/api/v2/pokemon/${monster}`)
    .then(res => transformPokemonData(res.data))
}

export const getAbility = async (ability:string) => {
  return await axios.get(`https://pokeapi.co/api/v2/ability/${ability}`)
}

export const getMove = async (move:string | number) => {
  return await axios.get(`https://pokeapi.co/api/v2/move/${move}`)
    .then(res => transformMoveData(res.data))
}
