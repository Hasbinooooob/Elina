const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { prefix, config } = require("..");
const distube = require("../utils/distubeClient");
const ee = require('../config/embed.json')
/**
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports = async (client, message, args) => {


  await distube.setMaxListeners(25)

  const status = (queue) =>
  `Volume: ${queue.volume}% • Filter: ${
    queue.filters.join(", ") || "❌"
  } • Status : ${queue.paused ? "Paused" : "Playing"} • Loop: ${
    queue.repeatMode ? (queue.repeatMode === 2 ? "Queue" : "✅") : "❌"
  } • Autoplay: ${queue.autoplay ? "✅" : "❌"}`;

  // play song



  

  let pause = new MessageButton()
  .setEmoji("⏸️")
  .setCustomId("distube_pause")
  .setStyle("SECONDARY")
  .setLabel("Pause")

  let resume = new MessageButton()
  .setCustomId("distube_resume")
  .setStyle("SECONDARY")
  .setEmoji("▶️")
  .setLabel("Resume")

  let skip = new MessageButton()
  .setCustomId("distube_skip")
  .setStyle("SECONDARY")
  .setEmoji("⏭️")
  .setLabel("Skip")

  let loop = new MessageButton()
  .setCustomId("distube_loop")
  .setEmoji("🔁")
  .setStyle("SECONDARY")
  .setLabel("Loop")

  let stop = new MessageButton()
  .setCustomId("distube_stop")
  .setEmoji("⏹️")
  .setStyle("SECONDARY")
  .setLabel("Stop")


  let shuffle = new MessageButton()
  .setEmoji("🔀")
  .setStyle("SECONDARY")
  .setCustomId("distube_shuffle")
  .setLabel("Shuffle")

  let Queue = new MessageButton()
  .setStyle("SECONDARY")
  .setCustomId("distube_queue")
  .setLabel("Queue")
  .setEmoji("📑")

  let autoplay = new MessageButton()
  .setCustomId("distube_autoplay")
  .setStyle("SECONDARY")
  .setLabel("Autoplay")
  .setEmoji("🔃")

  let previous = new MessageButton()
  .setStyle("SECONDARY")
  .setCustomId("distube_previous")
  .setLabel("Previous")
  .setEmoji("⏮️")



  let pause_2 = new MessageButton()
  .setCustomId("distube_pause_2")
  .setLabel("Pause")
  .setEmoji("⏸️")
  .setStyle("SECONDARY")
  .setDisabled(true)

  let skip_2 = new MessageButton()
  .setCustomId("distube_skip_2")
  .setStyle("SECONDARY")
  .setLabel("skip")
  .setEmoji("⏭️")
  .setDisabled(true)

  let stop_2 = new MessageButton()
  .setCustomId("distube_stop_2")
  .setLabel("stop")
  .setEmoji("⏹️")
  .setStyle("SECONDARY")
  .setDisabled(true)

  let loop_2 = new MessageButton()
  .setCustomId("distube_loop")
  .setEmoji("🔁")
  .setStyle("SECONDARY")
  .setLabel("Loop")
  .setDisabled(true)

  let Queue_2 = new MessageButton()
  .setStyle("SECONDARY")
  .setCustomId("distube_queue")
  .setLabel("Queue")
  .setEmoji("📑")
  .setDisabled(true)

  let autoplay_2 = new MessageButton()
  .setCustomId("distube_autoplay")
  .setStyle("SECONDARY")
  .setLabel("Autoplay")
  .setDisabled(true)
  .setEmoji("🔃")

  let shuffle_2 = new MessageButton()
  .setEmoji("🔀")
  .setStyle("SECONDARY")
  .setCustomId("distube_shuffle")
  .setLabel("Shuffle")
  .setDisabled(true)

  let previous_2 = new MessageButton()
  .setStyle("SECONDARY")
  .setCustomId("distube_previous")
  .setLabel("Previous")
  .setEmoji("⏮️")
  .setDisabled(true)



  



  let row = new MessageActionRow()
  .addComponents([previous, pause, stop, skip])
  

  let raw = new MessageActionRow()
  .addComponents([loop, shuffle, autoplay, Queue])




  let row_2 = new MessageActionRow()
  .addComponents([previous_2, pause_2, stop_2, skip_2])

  let raw_2 = new MessageActionRow()
  .addComponents([ loop_2,shuffle_2, autoplay_2, Queue_2])




  try {

    distube.on("playSong", async (queue, song) => {
      

      if(!queue) return


     await queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setAuthor({name: "Playing song", iconURL: "https://cdn.discordapp.com/emojis/855561346087387136.gif"})
        .setDescription(`Song: [\`${song.name}\`](${song.url})\nViews: \`${song.views}\`\nLikes: \`${song.likes}\`\nDislikes: \`${song.dislikes}\``)
        .addField("Requested by:", `>>> ${song.user}`, true)
        .addField("Duration:", `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
        .addField("Song by:", `>>> [\`${song.uploader.name}\`](${song.uploader.url})`, true)
        .setFooter({
          text: status(queue)
        })
        .setThumbnail(song.thumbnail)
      ], components: [row, raw]}).then(async (msg) => {
        

        const collector = msg.createMessageComponentCollector({filter: (i) => i.isButton() && i.user && i.message.author.id == client.user.id ,time: song.duration > 0 ? song.duration * 1000 : 600000, componentType: "BUTTON"})

        module.exports = collector;

        collector.on("collect", async (interaction) => {

          if(!interaction.member.voice.channel) return interaction.reply({content: `<@${interaction.user.id}> , you must Join voice channel to use this button`, ephemeral: true})

          if(!interaction.guild.me.voice.channel) return interaction.reply({content: "Nothing Playing yet", ephemeral: true}).then(() => {
            collector.stop()
          })

          let buttonID = interaction.customId

          switch ( buttonID ) {

            case "distube_skip":
            if(queue.songs.length === 1) {
              interaction.reply({content: "the song has been skipped", ephemeral: true})
              queue.stop()
              collector.stop()
            } else {

            interaction.reply({content: "the song has been skipped",ephemeral: true})
            queue.skip()
            collector.stop()

            }
              break;

              case "distube_pause":
                if(queue.paused) {

                  interaction.reply({content: "the song is paused", ephemeral: true})

                  msg.edit({components: [new MessageActionRow().addComponents([resume, skip, loop, stop, Queue])]})

                } else {
                  queue.pause()
                  interaction.reply({content: "the song is paused", ephemeral: true})
                  msg.edit({components: [new MessageActionRow().addComponents([resume, skip, loop, stop, Queue])]})
                }

              break;

              case "distube_resume":

              if(queue.playing) {
                interaction.reply({content: "Song has been resumed", ephemeral: true})
                msg.edit({components: [row]})
              } else {
                queue.resume()
                interaction.reply({content: "Song has been resumed", ephemeral: true})
                msg.edit({components: [row]})
              }

              break;

              case "distube_stop":

                queue.stop()
                interaction.reply({content: "the song has been stopped", ephemeral: true})
                collector.stop()
              break;

              case "distube_loop":
              
              if(queue.repeatMode === 0) {
                queue.setRepeatMode(1)
                interaction.reply({content: "Loop Mode is set to `Song`", ephemeral: true})
              } else if(queue.repeatMode === 1) {
                queue.setRepeatMode(2)
                interaction.reply({content: "Loop Mode is set to `Queue`", ephemeral: true})
              } else {
                queue.setRepeatMode(0)
                interaction.reply({content: "Loop Mode is set to `Off`",ephemeral: true})
              }


              break;

              case "distube_shuffle":
              queue.shuffle()
              interaction.reply({ephemeral: true, embeds: [new MessageEmbed().setColor(ee.color).setDescription("Shuffled!")]})
              break;

              case "distube_queue":

              interaction.reply({ephemeral: true, embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription("Current queue:\n" + queue.songs.map((song, id) => `**${id + 1}**. \`${song.name}\` - \`${song.formattedDuration}\``).slice(0, 10).join("\n"))]})

              break;

              case "distube_autoplay":

             let Autoplay = queue.toggleAutoplay()
              interaction.reply({ephemeral: true, embeds: [new MessageEmbed().setColor(ee.color).setDescription(`Autoplay:\`${Autoplay ? '✅' : '❌'}\``)]})

              break;

              case "distube_previous":
                if(!queue.previousSongs.length) return interaction.reply({ephemeral: true, embeds: [new MessageEmbed().setColor(ee.color).setDescription("Previous Song Not Found")]})
                else {
                  queue.previous()
                  collector.stop()
                interaction.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription("Playing Previous Track")], ephemeral: true})
                }
              break;


              
          
            default:
              console.log(buttonID)
              break;
          }
        })
        
        collector.on("end", async () => {

          try {
          

          msg.edit({ components: [row_2, raw_2]})
        
          setTimeout(() => {
            msg.delete()
          }, 10000);
            
          } catch (error) {
            console.log(error.stack)
          }
        })
        
      })
    })

    distube.on("addSong", async (queue, song) => {
      if(!queue) return

      queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setTitle("🎶 Added Song!")
        .setDescription(`>>> Song: [\`${song.name}\`](${song.url}) \n Duration : \`${song.formattedDuration}\` \n Song by: \`${song.uploader.name}\` \n Tracks ${queue.songs.length}`)
        .setFooter({
          text: `Requested by: ${song.user.tag} \n${status(queue)}`
        })
        .setThumbnail(song.thumbnail)
      ]}).then((msg) => {

        setTimeout(() => {
          msg.delete()
        }, 5000);


      })
    })

    distube.on("finish", async (queue) => {
      queue.textChannel.send({embeds: [new MessageEmbed()
      .setDescription("** queue has ended! No more music to play... **")
      .setColor(ee.color)
      .setTimestamp()
      ]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 30000);
      })
    })


    distube.on("initQueue", async queue => {
      queue.autoplay = false
      queue.volume = 100
    })

    distube.on("error", (channel, error) => {
      console.log(error.stack)
      channel.send({embeds: [new MessageEmbed()
      .setTitle("An error encountered")
      .setColor(ee.color)
      .setTimestamp()
      .setDescription(`${error.message}`)
    ]})
    });
    
  } catch (e) {
    console.log(e.stack)
  }
  
};
