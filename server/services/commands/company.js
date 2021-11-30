const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('company')
    .setDescription('You can add the name of the company you work for.')
    .addStringOption(option =>
      option.setName('company')
        .setDescription('Input the name of the company')
        .setRequired(true)),
  async execute(interaction) {
    const companyName = interaction.options.getString('company').toLowerCase()
    const roles = await interaction.member.guild.roles
      .fetch()
      .then((r) => r.map(({ name, id }) => ({ name: name.toLowerCase(), id })))
      .catch(() => [])

    const roleNameIndex = roles.map((r) => r.name).indexOf(companyName)

    let roleId = ''

    if (roleNameIndex === -1) {
      roleId = await interaction.member.guild.roles
        .create({
          name: companyName,
          hoist: true,
          mentionable: true,
        })
        .then((r) => r.id)
        .catch(console.error)
    } else {
      roleId = roles[roleNameIndex].id
    }

    interaction.member.roles.add(roleId)

    await interaction.reply({ content: `Thank you ${interaction.user.tag}! Welcome to ${companyName}!`, ephemeral: true })
  }
}
