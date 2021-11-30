const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('company')
    .setDescription('Sets you a role with your company name.'),
  async execute(interaction) {
    await interaction.reply('Your company name')
  }
}
