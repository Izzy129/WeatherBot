const {SlashCommandBuilder} = require('discord.js');
const { QueryType } = require("discord-player");
const { Player } = require("discord-player");
const { useMainPlayer } = require("discord-player");
const {connect} = require('C:\\Users\\Izzy\\Desktop\\WeatherBot\\commands\\voice\\connect.js');
const data = new SlashCommandBuilder()
    .setName('playyt')
    .setDescription('plays youtube')
    .addStringOption(option =>
        option.setName('link')
            .setDescription('youtube video url')
            .setRequired(true)
    );
module.exports = {
    data: data,
    async execute(interaction) {
        connect(interaction);
        
        
        
        
        // const channel = interaction.message.member.voice.channel;
        // if (!channel) return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel
        // const query = interaction.options.getString('query', true); // we need input/query to play
    
        // // let's defer the interaction as things can take time to process
        // await interaction.deferReply();
    
        // try {
        //     const { track } = await Player.play(channel, query, {
        //         nodeOptions: {
        //             // nodeOptions are the options for guild node (aka your queue in simple word)
        //             metadata: interaction // we can access this metadata object using queue.metadata later on
        //         }
        //     });
    
        //     return interaction.followUp(`**${track.title}** enqueued!`);
        // } catch (e) {
        //     // let's return error if something failed
        //     return interaction.followUp(`Something went wrong: ${e}`);
        // }
    }
};