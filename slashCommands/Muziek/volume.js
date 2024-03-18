const Discord = require('discord.js');

module.exports.run = async (client, interaction) => {

    const member = interaction.member.voice.channel
    const queue = client.DisTube.getQueue(member)

    if (!queue) return interaction.reply(`❌ | er zit niks in de wachtrij nu`)
    
    
    const Volume = interaction.options.get("procent").value
    if(Volume > 100 || Volume < 1) return interaction.reply(` ❌ | gelieve een geldig nummer op te geven (1 - 100 %)`)

    queue.setVolume(Volume)

    interaction.reply(` 🔊 | Volume gezet tot \`${Volume}\` %`)


}



module.exports.help = {
    name: 'volume'
}
