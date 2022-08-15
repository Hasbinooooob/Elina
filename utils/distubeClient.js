const client = require("../index");
const Distube = require("distube").default
const config = require('../config/config.json')
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp")
let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
};
let distube = new Distube(client, {
  emptyCooldown: 30,
  searchSongs: 0,
  emitAddListWhenCreatingQueue: false,
  emitAddSongWhenCreatingQueue: false,
  leaveOnStop: true,
  leaveOnEmpty: false,
  leaveOnFinish: true,
  youtubeDL: false,
  updateYouTubeDL: true,
  emitNewSongOnly: true,
  plugins: [new SpotifyPlugin(spotifyoptions), new SoundCloudPlugin(), new YtDlpPlugin()],
  savePreviousSongs: true,
  nsfw: true,
  customFilters: config.customFilters,
  ytdlOptions: {
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 64
  },
})
module.exports = distube;


