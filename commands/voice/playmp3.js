const {SlashCommandBuilder} = require('discord.js');
const {joinVoiceChannel, getVoiceConnections, createAudioPlayer, NoSubscriberBehavior, createAudioResource  } = require('@discordjs/voice');

const data = new SlashCommandBuilder()
    .setName('playmp3')
    .setDescription('Play some music from an .mp3 file! 🎶')
    .addAttachmentOption(option =>
        option.setName('song')
        .setDescription('The song file you want to play')
    )
    .addStringOption(option =>
        option.setName('url')
        .setDescription('The url of the song you want to play (must be .mp3 file)')
    );
     
module.exports = {
    data: data,
    async execute(interaction) {
        if (!interaction.member.voice.channelId) {
            await interaction.reply('You must be in a voice channel to use this command!');
            return;
        } 

        if (!getVoiceConnections().has(interaction.guildId)) { // if bot is not in a voice channel
            joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator
            });
        }
        
        if (interaction.options.getAttachment('song') === null) { // only url provided
            if (interaction.options.getString('url') === null) { // no user input at all
                await interaction.reply('Please provide a .mp3 file!');
                return;
            }

            const resource = createAudioResource(interaction.options.getString('url'));
            resource.metadata = {
                title: interaction.options.getString('url').split('/').pop(),
                url: interaction.options.getString('url'),
            };
            if (!resource.metadata.title.includes('.mp3')) {
                await interaction.reply('Please provide a raw .mp3 file!');
                return;
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
        } else if (interaction.options.getString('url') === null) { // only file provided
            const resource = createAudioResource(interaction.options.getAttachment('song').url);
            resource.metadata = {
                title: interaction.options.getAttachment('song').name
            };
            if (!resource.metadata.title.includes('.mp3')) {
                await interaction.reply('Please provide a raw .mp3 file!');
                return;
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
    }
};
