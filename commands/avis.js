const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName("avis")
      .setDescription("formulaire d'inscription"),
    async execute(interaction) {
      // Create the modal
		const modal = new ModalBuilder()
        .setCustomId('form_avis')
        .setTitle("Formulaire d'avis sur le bot SRT");

    // Add components to modal

    // Create the text input components
    const userInput = new TextInputBuilder()
        .setCustomId('userInput')
        // The label is the prompt the user sees for this input
        .setLabel("Votre nom : ")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);

    const msgInput = new TextInputBuilder()
        .setCustomId('msgInput')
        .setLabel("Donnez nous votre avis :")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(userInput);
    const secondActionRow = new ActionRowBuilder().addComponents(msgInput);

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
    },
  };
  