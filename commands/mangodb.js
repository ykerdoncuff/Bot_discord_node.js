const { SlashCommandBuilder, User, EmbedBuilder } = require("discord.js");
const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017/";
const clientdb = new MongoClient(uri);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mongodb")
    .setDescription("affiche la base mangodb"),
  async execute(interaction) {
    //connection mangoDB
    console.log("Connection MongoDB...")
      const database = clientdb.db("discord");
      const help = database.collection("avis");
      //insert data
      //var new_objet = { user: "Florian", message: "besoin test" };
      //help.insertOne(new_objet);
    console.log("Connecté à mongoDB")
      const help_data = await help.find({}).toArray();
      //tableau pour les futurs champ du Embed
      const data_db = [];

      help_data.forEach(function (item, i) {
        data_db.push({
          name: "De "+item.user.toString(),
          value: item.message.toString(),
        });
      });

      //console.log(data_db);
      // Ensures that the client will close when you finish/error
      //await clientdb.close();
      //console.log("Déconnecté de MangoDB");

    //Creation Embed
    const Embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Avis des utilisateurs")
      .setURL("https://polytech.univ-nantes.fr/fr/les-formations/cycle-ingenieur/srt/")
      .setAuthor({
        name: "Bot SRT",
        iconURL: "https://polytech.univ-nantes.fr/uas/polytech/LOGO/PolytechNantes.png",
        url: "https://polytech.univ-nantes.fr/fr/les-formations/cycle-ingenieur/srt/",
      })
      .setDescription("Avis enregistrés par les utilisateurs")
      .addFields(
        data_db
      )
      .setTimestamp();

    await interaction.reply({ embeds: [Embed] });
    console.log("En attente")
  },
};
