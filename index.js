// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN; // more secure than storing the token in plain text

// Require the necessary discord-player classes
const { Player, onBeforeCreateStream} = require('discord-player');
const { stream } = require('yt-stream');

// get some extractors if you want to handpick sources
// const { SpotifyExtractor, YouTubeExtractor } = require('@discord-player/extractor');


// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates, 
	] 
});

// begin player code
// Create a new Player, and attach it to the bot client.
const player = new Player(client);

// loads all extractors (Spotify, Youtube, Soundcloud...)
player.extractors.loadDefault();



 player.events.on('error', (queue, error) => {
    // Emitted when the player queue encounters error
    console.error(
        `${new Date()
            .toISOString()
            .substring(11, 19)}: Error: 🚨 General player error event: ${
            error.message
        }\n`
    );
    console.error(error);
});

player.events.on('playerError', (queue, error) => {
    // Emitted when the audio player errors while streaming audio track
    console.error(
        `${new Date()
            .toISOString()
            .substring(11, 19)}: Error: 🚨 Player error event: ${
            error.message
        }\n`
    );
    console.error(error);
});


 onBeforeCreateStream(async (track) => { 
    if (track.source === 'youtube') {
        return (
            await stream(track.url, {
                type: 'audio',
                quality: 'high',
                highWaterMark: 1 << 25
            })
        ).stream;
    }

    return null;
});
//end player code

// command files loaded here
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// event files loaded here
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(token);