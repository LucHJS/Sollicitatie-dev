const { ApplicationCommandType, ApplicationCommandOptionType, Discord, Permissions } = require("discord.js")
const client = require("./index")



async function createCmd(client, guildId) {
    const data = [

        {
            name: 'panel',
            description: 'send the ticket panel',

        },
        {
            name: 'close',
            description: 'close',

        },
        
        {
            name: 'bassboost',
            description: 'zet de bassboost aan',
        },
        {
            name: 'bassboostremove',
            description: 'zet de bassboost uit',
        },
       
        {
            name: 'play',
            description: 'speel een liedje af',
            options: [{
                name: "song",
                description: 'speel een liedje aff',
                type: ApplicationCommandOptionType.String,
                required: true,
            }]
        },
        {
            name: 'volume',
            description: 'zet de volume van het liedje',
            options: [{
                name: "procent",
                description: 'hoeveel procent moet het volume worden',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }]
        },
        {
            name: 'stop',
            description: 'stop het liedje',
        },
        {
            name: 'skip',
            description: 'skip het liedje',
        },
        {
            name: 'pause',
            description: 'pauzeer het liedje',
        },
        {
            name: 'help',
            description: 'get all commands',
        },
        {
            name: 'resume',
            description: 'Laat het liedje weer verder spelen',
        },
        {
            name: 'queue',
            description: 'Krijgt alle liedjes die in de queue zit',
        },
        {
            name: 'shuffle',
            description: 'shuffle de queue',
        },
        {
            name: 'nowplaying',
            description: 'kijk wat nu aan het spelen is',
        },
        {
            name: 'baas',
            description: 'afk',

        },
        {
            name: 'reaction-panel',
            description: 'send the reaction roles panel',

        },

        {
            name: 'add-role',
            description: 'geef een rol op die je wilt toevoegen bij de dropdown menu',
            options: [
                {
                    name: 'role',
                    description: 'geef de rol op die je wilt toevoegen',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                },
                {
                    name: "description",
                    description: 'geef de beschrijving van de rol',
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "emoji",
                    description: 'emoji voor de rol',
                    type: ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        },  
        {
            name: 'remove-role',
            description: 'geef een rol op die je wilt verwijderen bij de dropdown menu',
            options: [
                {
                    name: 'role',
                    description: 'geef de rol op die je wilt verwijderen',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                },
                
            ]
        },


    ]

    await client.guilds.cache.get(guildId)?.commands.set(data)

}

module.exports = { createCmd }


