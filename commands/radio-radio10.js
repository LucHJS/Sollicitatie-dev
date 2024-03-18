const client = require('../index')
const discord = require('discord.js')
const { EmbedBuilder, VoiceChannel } = require('discord.js')
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');
module.exports.run = async (client, message, args, prefix) => {

    const voice = message.member.voice.channel;
    if (!voice) return message.reply('❌| Je moet in een voice kanaal zitten om deze command te gebruiken!!')

    // const perms = voiceChannel.permissionsFor(message.client.user)
    // if(!perms)

    const connection = joinVoiceChannel(
        {
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

    const player = createAudioPlayer();
    const resource = createAudioResource('https://25283.live.streamtheworld.com/RADIO10.mp3?dist=nederlandfmnl_mob');


     player.play(resource);
    connection.subscribe(player);

    

    const embed = new EmbedBuilder()
        .setTitle(`Ik speel nu Radio10`)
        .setDescription(`Radio10 aangezet \n\nin kanaal <#${message.member.voice.channel.id}>`)
        .setColor(client.Config.embedColor)
    message.channel.send({embeds: [embed]})
}

module.exports.help = {
    name: 'radio-radio10',
    aliases: [],
    timeout: 2000
}