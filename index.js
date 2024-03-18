const { Discord, Client, GatewayIntentBits, PermissionsBitField, Collection, EmbedBuilder, ActivityType, Ac } = require('discord.js')
const client = new Client({

    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,

    ]
});

const fs = require("fs")
const config = require('./config.json')
const { createCmd } = require('./dataHandler')
client.commands = new Collection();
client.events = new Collection();
client.SlashCmd = new Collection();
client.Config = config
client.createCmd = createCmd
module.exports = client



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {

    const command = require(`./commands/${file}`)


    client.commands.set(command.help.name, command);


    command.help.aliases.forEach(alias => {
        client.commands.set(alias, command.help.name);
    })

    console.log(`${file}✅`)

}

//slash commands
fs.readdirSync('./slashCommands/').forEach(dir => {
    fs.readdir(`./slashCommands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js")

        jsFiles.forEach(file => {
            var fileGet = require(`./slashCommands/${dir}/${file}`);

            if (fileGet.help.name === err) {

            }

            try {
                client.SlashCmd.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});



//eventHandler
fs.readdirSync(`./events/`).forEach(dir => {
    var jsFiles = fs.readdirSync('./events/').filter(f => f.split(".").pop() === "js");
    jsFiles.forEach(event => {
        const eventGet = require(`./events/${event}`)

        try {
            client.events.set(eventGet.name, eventGet)
        } catch (err) {
            return console.log(err)
        }
    })
})

client.login(config.Token)
