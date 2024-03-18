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
    const resource = createAudioResource('https://icecast-qmusicnl-cdp.triple-it.nl/Qmusic_nl_live.mp3?aw_0_1st.playerId=nederlandfm_mob');


     player.play(resource);
    connection.subscribe(player);

    

    const embed = new EmbedBuilder()
        .setTitle(`Ik speel nu Qmusic `)
        .setDescription(`Qmusic aangezet \n\nin kanaal <#${message.member.voice.channel.id}>`)
        .setColor(client.Config.embedColor)
    message.channel.send({embeds: [embed]})
}

module.exports.help = {
    name: 'radio-qmusic',
    aliases: [],
    timeout: 2000
}