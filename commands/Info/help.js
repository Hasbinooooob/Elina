const { MessageEmbed, Message, Client, MessageSelectMenu, MessageButton, MessageActionRow } = require("discord.js");
const { readdirSync } = require("fs");
const ee = require("../../config/embed.json")
const prefix = require("../../config/config.json").prefix;
module.exports = {
    name: 'help',
    aliases: ["h"],
    category: 'Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show Info Of a help command',
    usage: "[command] ",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {
    try {
      if (!args[0]) {
        let categories = [];
        readdirSync("./commands/").forEach((dir) => {
          const commands = readdirSync(`./commands/${dir}/`).filter((file) => 
            file.endsWith(".js")
  
          );
          const cmds = commands.map((command) => {
            let file = require(`../../commands/${dir}/${command}`);
            if (!file.name) return "No command name.";
            let name = file.name.replace(".js", "");
            return `\`${name}\``;
          });

    let home_embed = new MessageEmbed()
    .setColor(ee.color)
    .setDescription(`**My Categories Command **\n ${dir}`)
    .setFooter({text: `requested by ${message.author.tag}`})

          let emoji = {
            "Config": "995905968258953226",
            "Fun": "995042387388809261",
            "Image": "995044291300839564",
            "Info": "995051707547529248",
            "Mini Games": "995042804759793676",
            "Moderation": "995058410879996025",
            "Music": "942335217782358026",
            "Owner": "995043689942491277",
            "Roleplay": "995910798415241267",
            "Utility": "995020063973318708",
            "Voice activities": "939931570645655634"
          }
          let data = new Object();
          data = {
            name: `${client.emojis.cache.find((e) => e.id === emoji[dir]).toString()} ${dir}`,
            value: cmds.length === 0 ? "In progress." : cmds.join(" "),
          };
          categories.push(data);
        });
        const embed = new MessageEmbed()
          .setAuthor({name: "How can i help you ?", iconURL: client.user.displayAvatarURL({dynamic: true}), url: "https://discord.com/api/oauth2/authorize?client_id=878172039171694612&permissions=1099511627775&scope=applications.commands%20bot"})
          .addFields(categories)
          .setDescription(
            `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`)
          .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
          .setTimestamp()
          .setColor(ee.color);
    let emojis = {
      "Config": "995905968258953226",
      "Fun": "995042387388809261",
      "Image": "995044291300839564",
      "Info": "995051707547529248",
      "Mini Games": "995042804759793676",
      "Moderation": "995058410879996025",
      "Music": "942335217782358026",
      "Owner": "995043689942491277",
      "Roleplay": "995910798415241267",
      "Utility": "995020063973318708",
      "Voice activities": "939931570645655634"
    }

    let button_allcommands = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("All commands")
    .setCustomId("b_all")

    let button_home = new MessageButton()
    .setDisabled(true)
    .setStyle("PRIMARY")
    .setCustomId("b_home")
    .setEmoji(" ")

    let button_support_server = new MessageButton()
    .setStyle("LINK")
    .setLabel("Support server")
    .setURL("https://discord.gg/3XQNVEmEfV")
    .setDisabled(true)

    let button_invite = new MessageButton()
    .setStyle("LINK")
    .setLabel("Invite me :)")
    .setURL("https://discord.com/api/oauth2/authorize?client_id=878172039171694612&permissions=1945627743&scope=bot%20applications.commands")
    .setDisabled(false)

    let menu = new MessageSelectMenu()
    .setPlaceholder("Click to see all category commands")
    .setMinValues(1)
    .setMaxValues(1)
    .setCustomId("help-menu")
    .addOptions([
      client.category.map((cat) => {
        return {
          label: `${cat[0].toUpperCase() + cat.slice(1)}`,
          value: `${cat}`,
          description: `click to see ${cat} commands`,
          emoji: emojis[cat]
        }
      })
    ])
    let row = new MessageActionRow().addComponents([button_home, button_allcommands, button_support_server, button_invite])
    let raw = new MessageActionRow().addComponents([menu])
    message.channel.send({embeds: [embed], components: [raw]}).then(async (msg) => {
      let filter = i => i.user.id === message.author.id
      const collerctor =  await msg.createMessageComponentCollector({filter: filter, time: 600000})
      collerctor.on("collect", async (m) => {
        if(m.isSelectMenu()){
        let [ directory ] = m.values
        let embedClick = new MessageEmbed()
        .setFooter({text: `requested by ${message.author.tag}`, iconURL: message.member.displayAvatarURL({dynamic: true})})
        .setColor(ee.color)
        .setTitle(`${client.emojis.cache.find((e) => e.id === emojis[directory]).toString()} ${directory}`)
        .setDescription(`${client.commands.filter((cmd) => cmd.category === directory).map((cmd) => {
          return [`\`${cmd.name}\``].join(" ")
        }).join(" ")}`)
        m.update({embeds: [embedClick]})
        }
      })
      collerctor.on("end", async () => {
        await msg.edit({components: [new MessageActionRow().addComponents([menu.setDisabled(true).setPlaceholder("please type E!help again")])]})
      })
    })
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("F037A5");
        return message.channel.send({embeds: [embed]});
      }
      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addFields({name: "PREFIX:", value: `\`${prefix}\``})
        .addFields({name: "COMMAND:", value: command.name ? `\`${command.name}\`` : "No name for this command."})
        .addFields({name: "ALIASES:", value: command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases for this command."})
        .addFields({name: "USAGE:", value: command.usage ? command.usage : "none usage for this command"})
        .addFields({name: "DESCRIPTION:", value: command.description ? command.description : "No description for this command."})
        .setFooter({text: `Requested by ${message.author.tag}`,iconURL: message.author.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        .setColor("F037A5");
      return message.reply({embeds: [embed]});
    }
    } catch (e) {
      console.log(e.stack)
      message.channel.send({embeds: [new MessageEmbed().setColor("F037A5").setDescription(`\`${e.message}\``)]})
    } 
  },
};