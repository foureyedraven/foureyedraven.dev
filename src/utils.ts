// General use utility functions

export const toCapitalCase = (name: string) => {
  return name[0].toUpperCase() + name.slice(1)
}

export const getRandomInteger = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return (Math.floor(Math.random() * (max - min)) + min)
}

export const getRandomFloat = (max = 1.0, min = 0.85) => {
  min = Math.ceil(min * 100)
  max = Math.floor(max * 100)
  return (Math.floor(Math.random() * (max - min)) + min) / 100
}

export const getCorrectParticle = (string: string) => {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  return (vowels.includes(string[0]) ? `an ` : 'a ') + string
}
