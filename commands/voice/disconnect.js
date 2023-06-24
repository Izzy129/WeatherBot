const {SlashCommandBuilder, ChannelType} = require('discord.js');
const { joinVoiceChannel, getVoiceConnections, getVoiceConnection } = require('@discordjs/voice');

const data = new SlashCommandBuilder()
    .setName('disconnect')
    .setDescription('Disconnects the bot from its current voice channel');
module.exports = {
    data: data,
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guildId);
        if (connection) {
            connection.destroy();
            await interaction.reply('Disconnected!');
        } else {
            await interaction.reply('Bot is not in a voice channel!');
        }
    }
};