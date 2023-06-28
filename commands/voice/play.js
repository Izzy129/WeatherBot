const {SlashCommandBuilder} = require('discord.js');
const {joinVoiceChannel, getVoiceConnections, createAudioPlayer, NoSubscriberBehavior, createAudioResource  } = require('@discordjs/voice');

const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play some music! 🎶')
    .addStringOption(option =>
         option.setName('song')
        .setDescription('The link of the song to play (must be a raw .mp3 file)')
        .setRequired(true));

        
module.exports = {
    data: data,
    async execute(interaction) {
        if (!getVoiceConnections().has(interaction.guildId)) { // if bot is not in a voice channel
            joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator
            });
        } else if (!interaction.member.voice.channelId) {
            await interaction.reply('You must be in a voice channel to use this command!');
            return;
        }


        const player = createAudioPlayer({
            behaviors: { // music will pause if nobody is in channel
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });

        const resource = createAudioResource(interaction.options.getString('song'));
        const connection = getVoiceConnections().get(interaction.guildId);
        
        connection.subscribe(player); // 
        player.play(resource);

        await interaction.reply('Playing audio.mp3!');
    }
};
