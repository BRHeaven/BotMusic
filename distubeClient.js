import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { handleAddlist, handleAddSong, handlePlaySong } from './Events/playEvents.js';
import { handleFinish } from './Events/timeoutEvents.js';
import { handleDistubeError } from './Events/errorEvents.js';
import { config } from "dotenv";
import { YouTubePlugin } from '@distube/youtube';

config();
export let timeoutMap = new Map();

export function setupDistube(client) {
    client.distube = new DisTube(client, {
        plugins: [
            new YouTubePlugin(),
            new SpotifyPlugin({
                api: {
                    clientId: process.env.SPOTIFY_ID,
                    clientSecret: process.env.SPOTIFY_SECRET
                }
            }),
            new SoundCloudPlugin(),
            new YtDlpPlugin(),
        ],
    });

    client.distube
        .on('playSong', (queue, song) => handlePlaySong(queue, song, timeoutMap))
        .on('addSong', (queue, song) => handleAddSong(queue, song, timeoutMap))
        .on('addList', (queue, playList) => handleAddlist(queue, playList))
        .on('finish', (queue) => handleFinish(queue, timeoutMap))
        .on("error", (channel, error) => handleDistubeError(channel, error));
};
