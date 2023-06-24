const {SlashCommandBuilder, ChannelType} = require('discord.js');
const { joinVoiceChannel, getVoiceConnections } = require('@discordjs/voice');
// const { } = require('discord.js');
// const { join } = require('lodash');

const data = new SlashCommandBuilder()
    .setName('connect')
    .setDescription('Connects the bot to a voice channel')
    .addChannelOption(option => option.setName('channel')
        .setDescription('The voice channel to connect to')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice));
module.exports = {
    data: data,
    async execute(interaction) {
        // add a check to see if bot is already in a voice channel
        if (getVoiceConnections().has(interaction.guildId)) {
            await interaction.reply('Bot is already in a voice channel! \nPlease disconnect before requesting!');
            return;
        }
        const voiceConnection = joinVoiceChannel({
            channelId: interaction.options.getChannel('channel').id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        // console.log(getVoiceConnections());
        await interaction.reply('Connected!');
        
    }
};