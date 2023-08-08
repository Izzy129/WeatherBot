# Barabot - A multipurpose Discord.JS V14 bot.

**Invite Link**: none atm as I sort out hosting the bot and releasing a proper version.

**Features include**: 
- Telling jokes with the use of Joke REST API.
- Minigames like Rock Paper Scissors.
- Retrieving weather via a Weather REST API based on user input.
- Play music/videos over voice channels from sources like YouTube, Spotify, SoundCloud, Apple Music, and Vimeo.
- Slash command support

**Planned features**:
- [ ] Fully music support with a queue, volume control, overlay effects, and more.
- [ ] Basic moderation commands.
- [ ] Image manipulation.
- [ ] More minigames.
- [ ] Possibly GPT-3.5 chatting if I sort out a proper host.
 

## Installation
1. Install [Node.JS](https://nodejs.org/en/download). I use v16.13.0, so if the bot isn't working and you are on another version try that version.
2. Install compiled [FFmpeg](https://ffmpeg.org/download.html) for your system. The latest version should work fine.
3. Clone the repository via `git clone https://github.com/Izzy129/barabot.git` or downloading ZIP through GitHub
5. Extract/Open the project, and do `npm install` to install the required dependencies 
6. Make a file named `.env`  using `.env.sample` for the required values. Fill in the required values (tokens, api keys, etc.)
7. Make a file named `config.json` using `config.json.sample` for the required values. Fill in the required values (client id (application id on [developer portal](https://discord.com/developers/applications)), color for error, etc)
8. Deploy slash commands to your bot by doing `node deploy-commands.js`
9. Run the bot using `node .`
