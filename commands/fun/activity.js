// streaming doesn't work yet
// custom doesnt work yet
// rewrite the choice selection to be a number instead of a string
// add a custom emoji option for custom activity

const {SlashCommandBuilder, ActivityType} = require('discord.js');
require('dotenv').config();
const ownerId = process.env.OWNER_ID; 


const data = new SlashCommandBuilder()
    .setName('activity')
    .setDescription('Set the activity of the bot!')
    .addStringOption(option =>
        option.setName('type')
            .setDescription('type of activity (PLAYING, STREAMING, LISTENING, WATCHING)')
            .setRequired(true)
            .addChoices(
                {name: 'Playing', value: '0'},
                {name: 'Streaming', value: '1'},
                {name: 'Listening', value: '2'},
                {name: 'Watching', value: '3'},
                {name: 'Competing', value: '4'},
                {name: 'Custom', value: '5'}
            ) // add separate choice if custom is picked for custom emoji
    )
    .addStringOption(option =>
        option.setName('activity')
            .setDescription('activity to set')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('icon')
            .setDescription('icon to set (IDLE, DND, ONLINE, INVISIBLE)')
            .setRequired(true)
            .addChoices(
                {name: 'Idle', value: 'idle'},
                {name: 'Do Not Disturb', value: 'dnd'},
                {name: 'Online', value: 'online'},
                {name: 'Invisible', value: 'invisible'}
            )
    );
module.exports = {
    data: data,
    async execute(interaction) {
        
        if (interaction.user.id !== ownerId) {
            await interaction.reply('only master baracuda can change my activity bro'); 
            return;
        }

        const types = [
            ActivityType.Playing, // 0
            ActivityType.Streaming, // 1
            ActivityType.Listening, // 2
            ActivityType.Watching, // 3
            ActivityType.Competing, // 4
            ActivityType.Custom // 5
        ]
         

        const activity = interaction.options.getString('activity');
        const type = types[parseInt(interaction.options.getString('type'))]; // i'd rather get a number from the interaction but this works for now
        // ^^ rewrite this later!!


        if (type == ActivityType.Custom) { // special case for custom activity  
            await interaction.reply('custom activity not supported yet too bad muhahaha');
            return;
        }
        await interaction.client.user.setPresence({
            activities: [{ name: activity, type: type}],
            status: interaction.options.getString('icon')
        });
        await interaction.reply('activity set!');
        
    }
};