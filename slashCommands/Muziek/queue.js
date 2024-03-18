const { Discord, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports.run = async (client, interaction) => {


    const voiceChannel = interaction.member.voice.channel
    const queue = client.DisTube.getQueue(voiceChannel)
    const embed = new EmbedBuilder()
        .setColor('0059FF')
        .setTitle('Queue')
        .setDescription(`${queue.songs.map(
            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)

    interaction.reply({embeds: [embed]})
}



module.exports.help = {
    name: 'queue'
}