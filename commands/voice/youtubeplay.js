const {SlashCommandBuilder} = require('discord.js');
const {joinVoiceChannel, getVoiceConnections} = require('@discordjs/voice');

const { useMainPlayer } = require('discord-player'); // useMainPlayer is a function that returns the main player instance

const data = new SlashCommandBuilder()
    .setName('youtubeplay')
    .setDescription('Play a YouTube video! 🎶')
    .addStringOption(option =>
        option.setName('link')
            .setDescription('Link to the YouTube video or playlist to play (Live videos are not supported yet)')
            .setRequired(true)
    );

module.exports = {
    data: data,
    async execute(interaction) {
        if (!interaction.member.voice.channelId) {
            await interaction.reply('You must be in a voice channel to use this command!');
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
        const query = interaction.options.getString('link');

        const searchResult = await player.search(query, {
            requestedBy: interaction.user
        });

        if (!searchResult || searchResult.tracks.length === 0) { // no result found
            return await interaction.editReply('No results were found!');
        }

        if ( // checks if query is a youtube live video 
            searchResult.tracks[0].raw.live &&
            searchResult.tracks[0].raw.duration === 0 &&
            searchResult.tracks[0].source === 'youtube'
        ) {
            return await interaction.editReply('Youtube Live videos are not supported!');
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
            return await interaction.editReply(`**Added playlist to queue**\n${durationFormat} **[${
                track.title
            }](${track.url})**\n\nAnd **${
                searchResult.tracks.length - 1
            }** more tracks... \`/queue\` to view all.`); // /queue command not implemented yet
        }

        return await interaction.editReply( `**Added to queue**\n${durationFormat} **[${track.title}](${track.url})**`)



    }
};