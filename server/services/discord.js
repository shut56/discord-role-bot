const { Client, Intents } = require('discord.js')
const { token } = require('../config')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Role Bot ready!')
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) {
    return
  }

	const { commandName } = interaction

  switch (commandName) {
    case 'ping': {
      const user = interaction.options.getUser('target')
      await interaction.reply(`Pong for ${user}!`)
      break
    }
    case 'company': {
      await interaction.reply('Your company')
      break
    }
    default:
      await interaction.reply('Invalid command!')
  }
})

// Login to Discord with your client's token
exports.discordBotOn = function() {
  client.login(token)
}
