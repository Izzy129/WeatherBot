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
			console.log(`[${ts.getMonth() + 1}/${ts.getDate()}/${ts.getFullYear()} | ${ts.getHours()}:${ts.getMinutes()}:${ts.getSeconds()}] ${interaction.user.tag} (${interaction.user.id}) in #${interaction.channel.name} (${interaction.guild}) requested: ${interaction.commandName}`);
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};