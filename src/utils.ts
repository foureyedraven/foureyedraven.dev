// General use utility functions

export const toCapitalCase = (name: string) => {
  return name[0].toUpperCase() + name.slice(1)
}

export const getRandomInteger = () => {
  return Math.floor(Math.random() * Math.floor(129)) + 1
}

export const getCorrectParticle = (string: string) => {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  return (vowels.includes(string[0]) ? `an ` : 'a ') + string
}
