const Discord = require('discord.js');

module.exports.run = async (client, interaction) => {

    const voiceChannel = interaction.member.voice.channel
    const queue = client.DisTube.getQueue(voiceChannel)
    if (!queue) return interaction.reply(`❌ | Er staat nu niets in de wachtrij!`)
    queue.shuffle()
   interaction.reply('heb de nummers door elkaar gehusseld')


}



module.exports.help = {
    name: 'shuffle'
}