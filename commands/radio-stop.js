const client = require('../index')
const discord = require('discord.js')
const { EmbedBuilder, VoiceChannel } = require('discord.js')
const {getVoiceConnection} = require('@discordjs/voice');
module.exports.run = async (client, message, args, prefix) => {

    const voice = message.member.voice.channel;
    if (!voice) return message.reply('❌| Je moet in een voice kanaal zitten om deze command te gebruiken!!')

    

    const embed = new EmbedBuilder()
        .setTitle(`Radio Gestopt`)
        .setDescription(`Heb de Radio gestopt \n\nen ben <#${message.member.voice.channel.id}> geleavd`)
        .setColor(client.Config.embedColor)
 
        message.channel.send({embeds: [embed]})
        getVoiceConnection(message.guild.id).disconnect();
}
module.exports.help = {
    name: 'radio-stop',
    aliases: [],
    timeout: 2000
}