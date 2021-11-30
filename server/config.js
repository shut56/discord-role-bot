require('dotenv').config()

module.exports = {
  port: process.env.PORT,
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID
}
