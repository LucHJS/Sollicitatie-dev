const {Discord, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const cooldown = new Set();
const client = require('..');
const config = require('../config.json')

module.exports.run = async (client, message, args) => {

    if(message.channel.name.startsWith(client.Config.BeginTicketName)){
        var vragen = [

        "1 » Met welke naam moeten wij u aanspreken?",

        "2 » Wat is uw leeftijd?",

        "3 » Welke functie past het best bij u?",

        "4 » Heeft u daar al ervaring mee?",

        "5 » Hoelang kunt u gemiddeld per dag online zijn/chatten?",

        "6 » Waar bent u goed in? (Moderator of juist tickets)",

        "7 » Wanneer bent u met discord begonnen?",

        "8 » In hoeveel servers bent u al staff?",
         
        "9 » Wat zijn uw pluspunten?",

        "10 » Wat zijn uw minpunten?",

        "11 » Waarom zouden we jou aan moeten nemen en iemand anders niet?",

        "```» » Scenario’s « «``` \n\n 1 » 2 personen hebben ruzie met elkaar in de openbare chat, wat doet u?",

        "2 » Een persoon doet zelf promotie, wat doet u?",

        "3 » Iemand scheld jou uit, wat doet u?",

        "4 » Iemand joint de server die jij niet mag, wat doet u?",

        "5 » Een hoger staff lid abused zijn prems, wat doet u?"
    ]
  
   
        message.channel.send('```🌴 Daily Café | 2.0 » Staff Sollicitatie``` \n\n » Heyy, wat leuk dat je komt solliciteren! Hieronder staan 11 vragen en 5 scenario’s, kunt u deze zo snel mogelijk invullen. Alvast bedankt. \n\n ```» » Vragen « «``` ')
    
        let collectCounter = 0;
        let endCounter = 0
            

        const filter = (m) => m.author.id === message.author.id;
        
        const appStart = await message.channel.send(vragen[collectCounter])
        console.log(vragen[++collectCounter])
        const channel = appStart.channel

        const collector = channel.createMessageCollector({filter})
        
        collector.on("collect", () => {
            if(collectCounter < vragen.length){
                channel.send(vragen[collectCounter++])
                
            }else{
                channel.send('``` Dit was de sollicitatie! Het LeadTeam gaat er zo snel mogelijk naar kijken. Wij verzoeken u om geduld te hebben en tag vooral geen staff.```')
                collector.stop('gestopt')
            }
        });


        const appChannel = client.channels.cache.get(client.Config.SollicitatieLogChannel)
        collector.on('end', (collected, reason) => {
            if(reason === 'gestopt'){
                let index = 1;
                const mappedResponses = collected.map((msg) => {
                    return `${index++}) **${vragen[endCounter++]}**\n--> ${msg.content}`
                }).join(`\n\n`)
                console.log(mappedResponses)
               
               const embed =  new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle('Nieuwe Sollicitatie')
               .setDescription(mappedResponses)
                
               appChannel.send({embeds: [embed]}).then(embedMessage => {
                embedMessage.react("✅");
                embedMessage.react("❌");
            });
            }

            

            
        })

    }else {
        message.channel.send('Deze command kan je alleen gebruiken in een sollicitatie ticket')
    }

    



};

module.exports.help = {
    name: 'sollicitatie',
    aliases: [],
    timeout: 86400000 
}