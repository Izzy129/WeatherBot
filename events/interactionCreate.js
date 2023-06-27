const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			var ts = interaction.createdAt;
			// format the timestamp in this format: [MM/DD/YYYY | HH:MM:SS]
			const month = (ts.getMonth() + 1).toString().padStart(2, '0');
			const day = ts.getDate().toString().padStart(2, '0');
			const year = ts.getFullYear().toString();
			
			const hours = ts.getHours().toString().padStart(2, '0');
			const minutes = ts.getMinutes().toString().padStart(2, '0');
			const seconds = ts.getSeconds().toString().padStart(2, '0');

			console.log(`[${month}/${day}/${year} | ${hours}:${minutes}:${seconds}] ${interaction.user.tag} (${interaction.user.id}) in #${interaction.channel.name} (${interaction.guild}) requested: ${interaction.commandName}`);
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};