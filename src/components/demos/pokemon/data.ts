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
\n\n\n`)

/*  - - - - - - - - - - - - -  */
/*  Pokemon Gameplay Text      */
/*  - - - - - - - - - - - - -  */

export const  pokemonRules = `
######################
##  POKEMON BATTLE! ##
######################

###  COMMANDS  ###

play            Shows you these rules & commands
play {name}     Chooses an available Pokemon & shows its moves
battle          Begins battle with random Pokemon
use {move}      Uses a move shown in play {name}
report          Shows your Pokemon, experience, & history
forfeit         Ends battle with no penalties
help            See other commands available

### HOW TO PLAY ###

1.  Start with your first Pokemon by typing \'play pikachu\'.
2.  Type \'battle\' to begin a battle with a random Pokemon.
3.  During battle, type \'use {move}\'. Your moves show on Step 1.
4.  If you win, you keep the Pokemon and gain XP!

TIPS: • Your attack power and Pokemon HP go up with your XP.
      • Something special happens when you reach 500 XP!
      • You can play a Pokemon after you beat them.\n\n`

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
  // { value: `>> PIKACHU SAYS: ` },
  // { value: '>> "PIKA PIKA!"' },
  { value: '>> TYPE play TO START' },
]

export const structure = { newDir }

export const asciiNumbers = {
  0: `  ##
 #  #
 #  #
 #  #
  ##  `,
  1: `   #
   #
   #
   #
   #  `,
  2: `  ##
 #  #
   #
  #
 #### `,
  3: ` ####
    #
  ###
    #
 ###  `,
  4: ` #  #
 #  #
 ####
    #
    # `,
  5: ` ####
 #
 ###
    #
 ###  `,
  6: `  ###
 #
 ####
 #  #
 #### `,
  7: ` ####
    #
   #
  #
 #    `,
  8: ` ####
 #  #
 ####
 #  #
 #### `,
  9: ` ####
 #  #
 ####
    #
 ###  `

}

// IDEA BANK

// USER TESTING
// X make points in battle clearer
// X make first opponent always easy (diglett?)
// make the moves easier to use (autocomplete?)
// X make instructions from step to step clearer
// only show report on a win?
// X only show wins in report

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
  add skill to using an attack based on last player's attack
*/
