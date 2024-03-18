const { Discord, ApplicationCommandOptionType } = require('discord.js');

module.exports.run = async (client, interaction) => {

    
    const voiceChannel = interaction.member.voice.channel
    const queue = client.DisTube.getQueue(voiceChannel)

    if (!queue) return interaction.reply(`${client.emotes.error} | er is niks in de queue`)
  
    const song = queue.songs[0]
    
    interaction.reply(`\▶ | Ik speel **\`${song.name}\`**,`)


}



module.exports.help = {
    name: 'nowplaying'
}