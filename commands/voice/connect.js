const {SlashCommandBuilder} = require('discord.js');
const { joinVoiceChannel, getVoiceConnections } = require('@discordjs/voice');

const data = new SlashCommandBuilder()
    .setName('connect')
    .setDescription('Connects the bot to a voice channel');        
module.exports = {
    data: data,
    async execute(interaction) {        
        if (getVoiceConnections().has(interaction.guildId)) {
            await interaction.reply('Bot is already in a voice channel! \nPlease disconnect before requesting!');
            return;
        } else if (!interaction.member.voice.channelId) {
            await interaction.reply('You must be in a voice channel to use this command!');
            return;
        }
        
        joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        await interaction.reply('Connected to <#' + interaction.member.voice.channelId + '>!');
        
    }
};