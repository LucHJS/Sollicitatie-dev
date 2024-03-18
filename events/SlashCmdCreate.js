const client = require('../index')


client.on("interactionCreate", async (interaction, message) => {

    if (interaction.isCommand()) {
        let SlashCmd = client.SlashCmd.get(interaction.commandName)
        if (SlashCmd); SlashCmd.run(client, interaction)
    }


})