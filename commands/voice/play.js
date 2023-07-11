const {SlashCommandBuilder} = require('discord.js');
const {joinVoiceChannel, getVoiceConnections, createAudioPlayer, NoSubscriberBehavior, createAudioResource  } = require('@discordjs/voice');

const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play some music! 🎶')
    .addStringOption(option =>
         option.setName('song')
        .setDescription('The link of the song to play (must be a raw .mp3 file)')
        .setRequired(true)
    );

        
module.exports = {
    data: data,
    async execute(interaction) {
        if (!interaction.member.voice.channelId) {
            await interaction.reply('You must be in a voice channel to use this command!');
            return;
        } 

        const resource = createAudioResource(interaction.options.getString('song'));
        resource.metadata = {
            title: interaction.options.getString('song').split('/').pop(),
            url: interaction.options.getString('song'),
        };
        if (!resource.metadata.title.includes('.mp3')) {
            await interaction.reply('Please provide a raw .mp3 file!');
            return;
        }

        if (!getVoiceConnections().has(interaction.guildId)) { // if bot is not in a voice channel
            joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator
            });
        }


        const player = createAudioPlayer({
            behaviors: { // music will pause if nobody is in channel
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        const connection = getVoiceConnections().get(interaction.guildId);
        connection.subscribe(player); // 
        player.play(resource);

        await interaction.reply('Playing ' + resource.metadata.title + '!');
    }
};
