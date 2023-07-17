// todo: add service image (spotify logo etc)
// add option to specific which service to search
// fix yt short support
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {joinVoiceChannel, getVoiceConnections} = require('@discordjs/voice');
const { useMainPlayer } = require('discord-player'); // useMainPlayer is a function that returns the main player instance

const {colorError, colorSuccess} = require('../../config.json');
const { YouTubeExtractor, SpotifyExtractor, AppleMusicExtractor, SoundCloudExtractor, VimeoExtractor, YoutubeExtractor } = require('@discord-player/extractor');
const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play an online song! (YouTube, Spotify, SoundCloud, etc.) 🎶')
    .addStringOption(option =>
        option.setName('query')
            .setDescription('Queue or link to song to play')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('service')
            .setDescription('Service to search (YouTube, Spotify, SoundCloud, etc.)')
            .setRequired(true)
            .addChoices(
                {name: 'YouTube', value: 'youtube'},
                {name: 'Spotify', value: 'spotify'},
                {name: 'SoundCloud', value: 'soundcloud'},
                {name: 'Apple Music', value: 'applemusic'},
                {name: 'Vimeo', value: 'vimeo'}
            )
    );

module.exports = {
    data: data,
    async execute(interaction) {
        if (!interaction.member.voice.channelId) {
            const embed = new EmbedBuilder()
                .setColor(colorError)
                .setTitle('Error')
                .setDescription('You must be in a voice channel to use this command!');
            await interaction.reply({ embeds: [embed] });
            return;
        }

        // deferring the reply since this can take a while (~10s)
        await interaction.deferReply();

        if (!getVoiceConnections().has(interaction.guildId)) { // if bot is not in a voice channel
            joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator
            });
        }
        

        const player = useMainPlayer();
        const query = interaction.options.getString('query');
        
        let service = null;
        switch (interaction.options.getString('service')) {
            case 'youtube':
                service = `ext:${YouTubeExtractor.identifier}`;
                break;
            case 'spotify':
                service = `ext:${SpotifyExtractor.identifier}`;
                break;
            case 'soundcloud':
                service = `ext:${SoundCloudExtractor.identifier}`;
                break;
            case 'applemusic':
                service = `ext:${AppleMusicExtractor.identifier}`;
                break;
            case 'vimeo':
                service = `ext:${VimeoExtractor.identifier}`;
                break;
            default:
                service = `ext:${YouTubeExtractor.identifier}`;
        }
        const searchResult = await player.search(query, {
            requestedBy: interaction.user,
            searchEngine: `ext:${YoutubeExtractor.identifier}`
        });
        
        if (!searchResult || searchResult.tracks.length === 0) { // no result found
            const embed = new EmbedBuilder()
                .setColor(colorError)
                .setTitle('Error')
                .setDescription('No results were found!');
            await interaction.editReply({ embeds: [embed] });
        }

        if ( // checks if query is a youtube live video 
            searchResult.tracks[0].raw.live &&
            searchResult.tracks[0].raw.duration === 0 &&
            searchResult.tracks[0].source === 'youtube'
        ) {
            const embed = new EmbedBuilder()
                .setColor(colorError)
                .setTitle('Error')
                .setDescription('Youtube Live videos are not supported!');
            await interaction.editReply({ embeds: [embed] });
            return;
        }

        const { track } = await player.play( 
            interaction.member.voice.channel,
            searchResult,
            {
                requestedBy: interaction.user,
                nodeOptions: {
                    leaveOnEmptyCooldown: 60000,
                    leaveOnEndCooldown: 60000,
                    leaveOnStopCooldown: 60000,
                    maxSize: 10000,
                    maxHistorySize: 100
                }
            }
        );

        let durationFormat =
            track.raw.duration === 0 || track.duration === '0:00'
                ? ''
                : `\`[${track.duration}]\``;
        
        if (searchResult.playlist && searchResult.tracks.length > 1) { 
            const embed = new EmbedBuilder()
                .setColor(colorSuccess)
                .setTitle('Added playlist to queue!')
                .setDescription(`**[${track.title}](${track.url})**\n\nAnd **${
                    searchResult.tracks.length - 1
                }** more tracks... \`/queue\` to view all.`); // /queue command not implemented yet
            await interaction.editReply({ embeds: [embed] });
            return;
        }
        const embed = new EmbedBuilder()
            .setColor(colorSuccess)
            .setTitle('Added song to queue!')
            .setDescription(`${durationFormat} **[${track.title}](${track.url})**`);
        await interaction.editReply({ embeds: [embed] });
        }       
}