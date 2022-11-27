const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("srt3")
    .setDescription("Vous allez être ajouter à la liste SRT3"),
  async execute(interaction) {
    // ID du role SRT4
    let role = interaction.guild.roles.cache.get("1044635413438005358");
    if (interaction.member.roles.cache.has(role.id)) {
      await interaction.reply("Tu as déjà ce role");
    } else {
      // Ajout du role SRT4
      interaction.member.roles.add(role).catch(console.error);
      await interaction.reply("Tu fait désormais parti de la liste SRT3 !");
    }
  },
};
