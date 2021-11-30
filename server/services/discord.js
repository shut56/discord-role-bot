const fs = require('fs')
const { Client, Collection, Intents } = require('discord.js')

const { token } = require('../config')
const deployCommands = require('./deploy-commands')

deployCommands()

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = new Collection()

const commandFiles = fs.readdirSync('./commands')
  .filter((file) => file.endsWith('.js'))

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
})

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Role Bot ready!')
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (err) {
    console.error(err)
    await interaction
      .reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      })
  }
})

// Login to Discord with your client's token
exports.discordBotOn = function() {
  client.login(token)
}
