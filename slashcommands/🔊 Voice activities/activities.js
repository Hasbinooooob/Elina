const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const ee = require("../../config/embed.json");

const fetch = require("node-fetch");
let activities = require("../../config/activities.json");

module.exports = {
  name: "activities",
  description: "voice channel activities",
  memberpermissions: ["SEND_MESSAGES"],
  options: [
    {
      name: "channel",
      description: "choose your channel to start activities",
      type: "CHANNEL",
      channelTypes: ["GUILD_VOICE"],
      required: false,
    },
    {
      name: "type",
      description: "choose your activities!",
      type: "STRING",
      required: false,
      choices: [
        {
          name: "Betrayal.io",
          value: "betrayal",
        },
        {
          name: "Blazing 8s",
          value: "ocho",
        },
        {
          name: "Checkers",
          value: "checkers",
        },
        {
          name: "Chess",
          value: "chess",
        },
        {
          name: "Fishington.io",
          value: "fishing",
        },
        {
          name: "Land.io",
          value: "land",
        },
        {
          name: "Letter League",
          value: "letter",
        },
        {
          name: "Poker Night",
          value: "poker",
        },
        {
          name: "Putt Party",
          value: "putt",
        },
        {
          name: "Sketch Heads",
          value: "sketch",
        },
        {
          name: "Spellcast",
          value: "spellcast",
        },
        {
          name: "Watch Together",
          value: "ytt",
        },
        {
          name: "Word Snacks",
          value: "word",
        },
      ],
    },
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      let channel = interaction.options.getChannel("channel") || interaction.member.voice.channel;
      if (!channel) return interaction.followUp({ content: "choose a voice channel to run this command", ephemeral: true });
      let choices = interaction.options.getString("type");
      if (!choices) return interaction.followUp({ content: "choose the activity to be launched", ephemeral: true });

      switch (choices) {
        case "betrayal":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.betrayal,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a Betrayal.io session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Betrayal")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
              .setImage("https://play-lh.googleusercontent.com/XF_zli6s9HDA8y8CcsamOb1eJn0T2kMGbWkLb9SEDc-OSmJaN2-_yS4S_lbDgx54iIQ")
                .setDescription(
                  `Click the button below to start a Betrayal.io session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp();
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

        case "checkers":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.checkers,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a Checkers session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Checkers")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Checkers session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setImage("https://cdn.discordapp.com/attachments/959030954234621952/960687598332968970/Checkers.gif?size=4096")
                .setTimestamp();
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

        case "chess":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.chess,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a `Chess` session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Chess")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Chess session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setImage(
                  "https://cdn.discordapp.com/attachments/944800400412901377/958010728210657360/Chess.gif?size=4096"
                )
                .setTimestamp();
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });
          break;

        case "fishing":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.fishington,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a `Fishington.io` session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Fishington.io")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Fishington.io session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp()
                .setImage("https://images.crazygames.com/games/fishington-io/cover-1615371400662.png?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop")
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

          case "land":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.land,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a Land.io session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Land.io")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Land.io session in ${channel}`
                )
                .setImage("https://cdn.discordapp.com/attachments/868517016561143838/960737057376964608/Land.io.gif?size=4096")
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp();
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

        case "letter":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.letter_league,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a Letter League session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Letter League")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Letter League session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp()
                .setImage("https://cdn.discordapp.com/attachments/959030954234621952/960686523148300318/Letter_League.gif?size=4096")
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

        case "ocho":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.ocho,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a Blazing 8s session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Blazing 8s")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Blazing 8s session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setImage("https://cdn.discordapp.com/attachments/959030954234621952/960689292861128835/Blazing_8s.gif?size=4096")
                .setTimestamp();
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

        case "poker":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.poker,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a Poker Night session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Poker Night")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Poker Night session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp()
                .setImage("https://cdn.discordapp.com/attachments/959030954234621952/960742196032700506/Poker.gif?size=4096")
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

          case "putt":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.putt_party,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a Putt Party session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Putt Party")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Putt Party session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setImage("https://cdn.discordapp.com/attachments/959030954234621952/959031563578916896/Putt_Party.gif?size=4096")
                .setTimestamp();
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

        case "sketch":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.sketch_heads,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a Sketch Heads session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Sketch Heads")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setImage(
                  "https://cdn.discordapp.com/attachments/944800400412901377/958024123534180432/Sketch-Heads.gif?size=4096"
                )
                .setDescription(
                  `Click the button below to start a Sketch Heads in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp();
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

        case "spellcast":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.spellcast,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a Spellcast session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Spellcast")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Spellcast session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp()
                .setImage("https://cdn.discordapp.com/attachments/959030954234621952/960688758515179550/Spellcast.gif?size=4096")
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

        case "word":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.word_snacks,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a Word Snacks session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Word Snacks")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Word Snacks session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp()
                .setImage("https://cdn.discordapp.com/attachments/959030954234621952/960690409196101632/Word_Snack.gif?size=4096");
              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

        case "ytt":
          fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activities.youtubeTogether,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((invite) => {
              if (!invite.code)
                return interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "I was unable to start a `Watch Together` session."
                      )
                      .setColor(ee.wrongcolor),
                  ],
                });

              const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Watch Together")
                .setURL(`https://discord.com/invite/${invite.code}`);

              let row = new MessageActionRow().addComponents(button);

              const emebd = new MessageEmbed()
                .setDescription(
                  `Click the button below to start a Watch Together / Youtube Together session in ${channel}`
                )
                .setColor("F037A5")
                .setFooter({
                  text: `request by : ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp()
                .setImage(
                  "https://cdn.discordapp.com/attachments/944800400412901377/957936156199256134/Watch_together.gif?size=4096"
                );

              return interaction.followUp({
                embeds: [emebd],
                components: [row],
              });
            });

          break;

        default:
          console.log(choices);
          break;
      }
    } catch (error) {
      console.log(error.stack);
      interaction.followUp({ content: `${error.message}` });
    }
  },
};