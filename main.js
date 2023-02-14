// Import the discord.js module
const discord = require('discord.js');

// Create an instance of a Discord client
const client = new discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', (message) => {
    console.log('I am ready!');
    client.channels.cache.get('1075095286554308649').send('Hello here!')
});


let output
let player
let onlinePlayer
let statusOutput

let history = []

getStatus()

async function getStatus() {
    console.log('fetching')
    let response = await fetch('https://api.mcsrvstat.us/2/kiraserver.thddns.net:7000')
        .then((response) => response.json())
        .then((data) => output = data);
    player = output.players?.list.join(', ')
    onlinePlayer = output.players?.online
    statusOutput = output.online? 'Available' : 'Unavailable'
    return output
}


client.on('message',  message => {
    history.push(message)
    console.log(message)
    let output = getStatus()
    if (message.content === 'status') {
        message.channel.send('> status-server: ' + statusOutput)
        setTimeout(() => {
           history =  history.filter(e => e != message)
            message.delete(message)
        }, 1000)
    } else if (message.content === 'player') {
        message.channel.send('> online: ' + onlinePlayer)
        message.channel.send('> player: ' + player)
        setTimeout(() => {
            history =  history.filter(e => e != message)
            message.delete(message)
        }, 1000)
    } else  if (message.content === '_clear') {
        history.forEach(e => {
            e.delete(e)
            history = history.filter(msg => e!=msg)
        })
    }

});

// Create an event listener for messages


// Log our bot in using the token from https://discord.com/developers/applications
client.login('MTA3NDkzODMzOTMxODMwMDc0NA.G3bLtA.gpOrh2qr2V6lsv67Pd4o7nFKz9HH982MvIc2OM');