const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clean")
    .setDescription("Effacer la totalité du chat"),
  async execute(interaction) {
    interaction.channel.bulkDelete(100, true)
    await interaction.reply("Les 100 derniers messages ont été supprimé")
  },
};
