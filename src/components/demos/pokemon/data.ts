// Flat data for the Pokemon API Battle Game demo
// If in backticks, probably ends up in <pre> tag,
// so preserving whitespace is important


/*  - - - - - - - - - - - - -  */
/*  Pokemon Ascii Art          */
/*  - - - - - - - - - - - - -  */

export const PIKACHU_V2 =`
         /\\  /\\                              /\\________     \\\\\\\\\\
        / /  )/                             / /         \\\\\\\\\\\\\\\\
       / /     ______   ______   ______    / /          \\\\\\\\\\\\\\
      / /     /_____/  /_____/  /_____/   / /           \\\\\\\\\\
     / /                                 / /     _______\\\\\\\\
     \\/                                  \\/     /
       /\\      ___            ___              /\\
      / /     /  /           /  /             / /
     / /     /  /           /  /             / /
    / /     (  (           (  (             / /
   / /       \\  \\    /\\     \\  \\           / /
   \\/         \\__\\   \\/      \\__\\          \\/
  /\\                                        /\\
  \\ \\      ____                ____        / /
   \\ \\    /====\\   ______     /====\\      / /
    \\ \\  (===*==) \\      /   (===*==)    / /
     \\ \\  \\====/   \\____/     \\====/    / /
      \\/                                \\/                         \n
`
export const MAGIKARP_V1 = `
                                __.--.._,-'""-.
                            ,-' .' ,'  .-"''-.\`.       .--.
                          ,'    |  |  '\`-.    \\ \\       \`-.|
                          /       .   /    \`.   \\ \\        ||
                        /         \`..\`.    \`.   \\ .       ||
                        /        . .    \`.    \\   . .      '.
              ."-.    .  ,""'-. | |      \\    \\   \`.\`.__,'.'
                \`. \`. .   |     \`. |       \\    .    \`-..-'
      _______     .  \`|   |   '   .'        .   |...--._
      \`.     \`"--.'   '    .      | .        .  |""''"-._"-._
        \`.             \\    \`-._..'. .       |  |---.._  \`-.__"-..
  -.     \`.           |\\           \`.\`      |  |'\`-.  \`-._   +"-'
  \`.\`.     \`-.        | \`            .\`.       | \`. \`.    \`,"
    \`.\`.      \`.      |  '.           \` \`      \`.  \\  \`   /
    | \`.\`.    __\`.    |\`/  \`.     ...  \`.\`.     |   \`.   .
    |   \\ .  \`._      | \`. / \`. .'.' |   \\ \\    |     \\  |
    |.   \` \\    \`-.   |   \\   .'.'/' |    \\ \\   |      ._'
    | \`.  \`.\\      \`. |    \\ / , '.  |_    . \\  '-.
    ,     .  .\\       \`|     . ' / |  | \`-...\\ \\'   \`._
    \`.     \`.  \\       |.    '/ .  |  |       ' .      \`-.
    .\`._    \\\` \\      | \`. /'  '  |  |       | |       ,.'
      .  \`-.  \\\`.\\    ,|   //  '   |  |__  .' | |      |
      |     \`._\`| \`--' \`  //  .    |  '  \`"  /| |   . -'
      '        \`|       \`//   '    |   .    / | |   |
    /....._____|       //   .  ___|   |   /  | |  ,|
    .         _.'      /, _.--"'-._ \`".| ,'   | |.'
    |      _,' / ___   \`-'.        \`. _|'     |,
    |  _,-"  ,'.'   \`-.._  \`.      _,'         \`
    '-"   _,','          "- ....--'
  /  _.-"_.'
  /_,'_,-'
.'_.-'
'"
`

export const SUCCESS = MAGIKARP_V1.concat(`\n
            #########                    #########
              #######  CONGRATS  500 XP  #######
                #####                    #####
                  ###                    ###
                    #                    #
\n\n`)

/*  - - - - - - - - - - - - -  */
/*  Pokemon Gameplay Text      */
/*  - - - - - - - - - - - - -  */

export const  pokemonRules = `
##### COMMANDS ####

play            Shows you the rules & commands
report          Shows your Pokemon, experience, & history
play {name}     Chooses Pokemon and shows its stats
battle          Begins battle with random Pokemon
use {move}      Uses a move seen in play {name}
forfeit         Ends battle with no penalties
help            See other commands available


###################
### HOW TO PLAY ###
###################

1.  Type \'play {name}\' to play a Pokemon.
    Your first Pokemon is Pikachu, so, play pikachu

2.  When you're ready, type \'battle\'
    A random Pokemon will appear to fight!

3.  Use your Pokemon's moves ['use {move}'] against
    your opponent until you win or lose.

4.  Sick of fighting? Type \'forfeit\' to end the
    battle with no penalties.

TIPS: • Your battle move effect and Pokemon HP go up
        with your Player XP!
      • Something special happens when you reach 500 XP!

##### FORGOT? #####
TYPE \'play\' TO SEE THESE RULES.
\n`

const credits = `
API data provided by https://pokeapi.co/
Magikarp ASCII art created by fiikus http://www.fiikus.net/asciiart/pokemon/129.txt
Damage formula from the games, via https://bulbapedia.bulbagarden.net/wiki/Damage
`


/*  - - - - - - - - - - - - -  */
/*  Default Terminal Data      */
/*  - - - - - - - - - - - - -  */

const baseCommand = {
  exec: (state) => {
    return Object.assign({}, state, {
      loading: true,
    })
  },
}

export const extensions = {
  play: baseCommand,
  use: baseCommand,
  battle: baseCommand,
  forfeit: baseCommand,
  report: baseCommand,
}

const newDir = {
  README: { content: pokemonRules },
  newFile: { content: "I'm Empty" }
}

export const history = [
  { value: PIKACHU_V2 },
  { value: `>> PIKACHU SAYS: ` },
  { value: '>> "PIKA PIKA!"' },
  { value: '>> TYPE play TO START' },
]

export const structure = { newDir }


// IDEA BANK

/*
  TODO
  test serving content split at \n in terminal
  update terminal README
  add message if loading fails? test offline, add msg to Terminal
  add github inset text for demo
  add autocomplete to moves and pokemon
  add randomized commentary (increasingly personal or odd)
  let user save progress in cache += save leaderboard on some server
  add regions and weather
*/
