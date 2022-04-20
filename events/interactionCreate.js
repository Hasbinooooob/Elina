const client = require("..");
const ee = require('../config/embed.json')
const {Message, MessageEmbed, CommandInteraction,} = require("discord.js")

client.on('interactionCreate', async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        if (cmd) {
            // checking user perms
            if (!interaction.member.permissions.has(cmd.memberpermissions || [])) {
                return interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`You don't Have \`${cmd.memberpermissions}\` To Run Command..`)
                    ]
                })
            }

            if(cmd) {
                if(!interaction.guild.me.permissions.has(cmd.botpermisions || [])) {
                    return interaction.followUp({
                        embeds: [
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`i don't Have \`${cmd.botpermisions}\` To Run Command..`)
                        ]
                    })
                }
            }

            cmd.run(client, interaction, args);

        }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: true });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
})