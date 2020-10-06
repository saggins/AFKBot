var mineflayer = require('mineflayer')
var notifier = require('node-notifier');
var bloodhoundPlugin = require('mineflayer-bloodhound')(mineflayer);
var { pathfinder, Movements } = require('mineflayer-pathfinder');
const mineflayerDashboard = require('mineflayer-dashboard');
var { GoalNear, GoalBlock, GoalXZ, GoalY, GoalInvert, GoalFollow } = require('mineflayer-pathfinder').goals
var incomingnotification

if (process.argv.length < 6 || process.argv.length > 8) {
  console.log('Usage : AFK.js \x1b[31m<host>\x1b[0m')
  console.log('               \x1b[31m<port>\x1b[0m')
  console.log('               \x1b[31m<choose from yes/no if you want or not Windows notifications for commands like /tell or events>\x1b[0m')
  console.log('               \x1b[31m<username of the owner of the bot, so the bot replies only to him>\x1b[0m')
  console.log('               \x1b[32m[<name, email in case the account is premium>]\x1b[0m')
  console.log('               \x1b[32m[<password, ignore in case the account is cracked>]\x1b[0m')
  console.log('')
  console.log('               \x1b[31mRed\x1b[0m: Needed, \x1b[32mGreen\x1b[0m: Optional')
  console.log('')
  console.log('               \x1b[36mExample: node AFK.js localhost 25565 no DrMoraschi\x1b[0m (this makes a cracked account bot')
  console.log('                                                                   that connects to localhost and does\x1b[0m')
  console.log('                                                                   not send you desktop notifications)\x1b[0m')
  process.exit(1)
}

startBot()

function startBot() {
  var bot = mineflayer.createBot({
    host: process.argv[2],
    port: parseInt(process.argv[3]),
    username: process.argv[6] ? process.argv[6] : 'AFKBot',
    password: process.argv[7]
  })

  //LOAD PLUGIN, FUNCTIONS
  bot.loadPlugin(pathfinder)
  
  var incomingnotification = process.argv[4]
  var owner = process.argv[5]

  bot.on('login', function() {
    bot.loadPlugin(require('mineflayer-dashboard'))
  })



  //LOOKING
  bot.once('login', function () {
    setInterval(() => {
        const entity = bot.nearestEntity()
          if (entity !== null) {
            if (entity.type === 'player') {
            bot.lookAt(entity.position.offset(0, 1.6, 0))
            } else if (entity.type === 'mob') {
              bot.lookAt(entity.position)
            }
          }
        }, 50)
    bot.on('kicked', () => {
      return
    })
  })



  //CHAT
  bot.on('whisper', (username, message, rawMessage) => {
      if (message === 'follow me') {
        if (username === owner) {
          bot.whisper(username, 'On my way')
      }} else if (message === 'stop') {
          null
      } else {
          if (message !== 'follow me' && message !== 'stop') {
            if (username !== bot.username) {
                bot.whisper(username, 'Sorry, I am an AFK Bot')
                bot.dashboard.log('\x1b[32m<STATUS> Correctly whispered that I am a bot','\x1b[0m')
              }
          }
      }
          if (incomingnotification === 'yes') {
            if (username !== bot.username) {
              if (username !== 'You') {
                if (message !== 'follow me' && message !== 'stop') {
                  if (message !== 'Sorry, I am an AFK Bot') {
                    notifier.notify({
                      title: 'Whisper Message',
                      message: ('You have a new message'),
                      icon: 'projectlogo.jpg'
                    })
                  }
                }
              }
            }
          }    
    
  })



  //KICK & ERRORS
  bot.on('kicked', (reason, loggedIn) => {
    bot.dashboard.log('\x1b[32m<STATUS>\x1b[0m \x1b[31mI got kicked for','\x1b[0m',reason, loggedIn)
    if (incomingnotification === 'yes') {
      notifier.notify({
        title: 'Event Message',
        message: ('I got kicked!'),
        icon: 'projectlogo.jpg'
      })
      }
  })
  bot.on('kicked', () =>
    setTimeout(() => {
      startBot()
    }, 10000)
  )


  
  //EVENTS
  bot.on('death', () => {
    bot.dashboard.log(`\x1b[32m<STATUS>\x1b[0m \x1b[31mI died`,'\x1b[0m')
    if (incomingnotification === 'yes') {
          notifier.notify({
            title: 'Event Message',
            message: ('I died!'),
            icon: 'projectlogo.jpg'
          })
          }
        }
  )

  bot.once('spawn', () => {
    bot.dashboard.log(`\x1b[32m<STATUS> Correctly spawned at ${bot.entity.position}`,'\x1b[0m')
  })

  bot.on('respawn', () => {
    bot.dashboard.log(`\x1b[32m<STATUS> Correctly respawned at ${bot.entity.position}`,'\x1b[0m')
  })

  bot.on('login', () => {
    bot.dashboard.log('\x1b[32m<STATUS> Correctly logged in','\x1b[0m')
  })

  bot.once('health', () => {
    bot.dashboard.log(`\x1b[32m<STATUS> I have ${bot.health} health.`,'\x1b[0m')
  })

  bot.on('health', () => {
    if (bot.health <= 5)
      bot.dashboard.log(`\x1b[32m<STATUS> \x1b[33mMy remaining health is ${bot.health}`,'\x1b[0m')
  })



  //WORLD
  bot.once('time', () => {
    setTimeout(function() {
    bot.dashboard.log(`\x1b[36m<WORLD> \x1b[36mCurrent time: `+bot.time.timeOfDay,'\x1b[0m')
  }, 1000)})



  //PATHFIND
  bot.once('spawn', () => {
    
    const mcData = require('minecraft-data')(bot.version)

    const defaultMove = new Movements(bot, mcData)
    defaultMove.allowFreeMotion = true

    bot.on('whisper', (username, message) => {
      if (username === bot.username) return

      const target = bot.players[username].entity
      if (username === owner) {
        if (message === 'follow me') {
          bot.pathfinder.setMovements(defaultMove)
          bot.pathfinder.setGoal(new GoalFollow(target, 2), true)
        } else if (message === 'stop') {
          bot.pathfinder.setGoal(null)
        }
      }
    })
  })



  //AFK
  bot.on('spawn', () => {
    bot.dashboard.log('\x1b[32m<STATUS> Starting anti-AFK-kick sequence','\x1b[0m')
    setInterval(() => {
      setTimeout(() => {
       bot.setControlState('jump', false)
      }, 100);
      bot.setControlState('jump', true)
    }, 600000);
  })



  //BLOODHOUND
  bloodhoundPlugin(bot);

  bot.bloodhound.yaw_correlation_enabled = true;

  bot.on('onCorrelateAttack', function (attacker,victim,weapon) {
    if (bot.username === victim.username) {
      if (weapon) {
          bot.dashboard.log('\x1b[32m<STATUS>\x1b[0m \x1b[33mI got hurt by ' + (attacker.displayName|| attacker.username) + ' with a/an ' + (weapon.displayName),'\x1b[0m');
        } else {
          bot.dashboard.log('\x1b[32m<STATUS>\x1b[0m \x1b[33mI got hurt by ' + (attacker.displayName|| attacker.username),'\x1b[0m');
        }
  }});
}
