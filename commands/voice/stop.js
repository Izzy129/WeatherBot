const {SlashCommandBuilder} = require('discord.js');
const {getVoiceConnection, getVoiceConnections} = require('@discordjs/voice');

const data = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the current song.');
module.exports = {
    data: data,
    async execute(interaction) {
        // const connection = getVoiceConnection(interaction.member.voice.channelId)
        // connection.stop();

        const connection = getVoiceConnections().get(interaction.guildId)
        console.log(connection);
        await interaction.reply("balls");
    }
};