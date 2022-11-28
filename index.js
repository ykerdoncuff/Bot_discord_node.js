const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
//constante MangoDB
const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017/";
const clientdb = new MongoClient(uri);

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	//attente d'une commmande dans le chat
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Il y a un problème avec cette commande, contactez un administrateur', ephemeral: true });
	}
});
// Insert de données dans la BDD
// attend l'envois d'un formulaire
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;
	if (interaction.customId === 'form_avis') {
		//Données du formulaire avis
		const userInput = interaction.fields.getTextInputValue('userInput');
		const msgInput = interaction.fields.getTextInputValue('msgInput');
		console.log({ userInput, msgInput });
			const database = clientdb.db("discord");
			const help = database.collection("avis");
			//insert data
			var new_objet = { user: ""+userInput, message: ""+msgInput };
			await help.insertOne(new_objet);
			// Ensures that the client will close when you finish/error
			//await clientdb.close();

		await interaction.reply({ content: 'Votre avis à bien été pris en compte' });
	}
	else{await interaction.reply({ content: 'Nous avons eu un problème' });}
	
});

client.login(token);