// add server owner, 

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { colorSuccess } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		const embed = new EmbedBuilder()
			.setTitle('Server Info')
			.setDescription(`This server is **${interaction.guild.name}** and has **${interaction.guild.memberCount}** members.`)
			.setColor(colorSuccess)
			.setThumbnail(interaction.guild.iconURL());
		await interaction.reply({ embeds: [embed] });
	},
};
