const client = require('../index')
const config = require(('../config.json'))
const {Collection} = require("discord.js")
const Timeout = new Collection()
const ms = require('ms')
client.on('messageCreate', async (message) => {




    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix = config.Prefix

    if (message.author.id == client.user.id) return;

    var countingChannel = message.guild.channels.cache.get(config.counting);

    if (message.channel.id == countingChannel) {

        if (isNaN(message)) return message.reply({ content: `**${message.author} geef een getal op! \n begin weer vanaf 1 te tellen!**`, ephemeral: true });

        var test = "";

        await message.channel.messages.fetch({ limit: 2 }).then(async messages => {

            var lastMessageId = Array.from(messages.keys());

            test += lastMessageId[1];

        });

        var lastMessage1 = await message.channel.messages.fetch({ limit: 2 });
        var lastMessage = lastMessage1.last();
        var lastMessageContent = lastMessage.content;

        // Check nadat beicht van bot er is geweest

        if (lastMessage.author.id === client.user.id && lastMessageContent.endsWith("begin weer vanaf 1 te tellen!**")) {
            if (message.content === "1") {
                return message.react("✅");
            } else {
                message.react("❌");
                return message.reply({ content: `**${message.author} heeft het foute getal opgegeven! \n begin weer vanaf 1 te tellen!**` });
            }

        }
        // Check of het vorige getal + 1 = aan het huidige getal

        if (message.content == parseInt(lastMessageContent) + 1 && lastMessage.author.id !== message.author.id) {
            return message.react("✅");
        } else {
            message.react("❌");
            return message.reply({ content: `**${message.author} heeft het foute getal opgegeven! \n begin weer vanaf 1 te tellen!**` });
        }

    }



    var messageArray = message.content.split(" ")

    var cmd = messageArray[0]


    if (!message.content.startsWith(prefix)) {


    } else {

        const commandData = client.commands.get(cmd.slice(prefix.length))

        if (commandData) {
            if (commandData.help.timeout) {

                if (Timeout.has(`${commandData.help.name}${message.guild.id}${message.author.id}`)) return message.channel.send(`U bevindt zich op een \`${ms(Timeout.get(`${commandData.help.name}${message.guild.id}${message.author.id}`) - Date.now(), { long: true })}\` cooldown. wacht alstublieft voordat u ${prefix}${commandData.help.name} opnieuw gebruikt `)

                Timeout.set(`${commandData.help.name}${message.guild.id}${message.author.id}`, Date.now() + commandData.help.timeout)
                setTimeout(() => {
                    Timeout.delete(`${commandData.help.name}${message.guild.id}${message.author.id}`)
                }, commandData.help.timeout)
            }
        }
        if (!commandData) return


        var args = messageArray.slice(1);


        try {

            await commandData.run(client, message, args, prefix)

        } catch (error) {
            console.log(error)
        }
    }
})

