const { Discord, Client, GatewayIntentBits, PermissionsBitField, Collection, EmbedBuilder, ActivityType, Ac } = require('discord.js')
const client = require('../index')
const createCmd = client.createCmd

client.on("ready", async () => {
    console.log('Bot is ready')
    client.user.setPresence({
        activities: [{ name: `Daily Cafe`, type: ActivityType.Streaming }],

    });
    createCmd(client, client.Config.GuildId)


})
