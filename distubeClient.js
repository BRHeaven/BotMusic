import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { handleAddSong, handlePlaySong } from './Events/playEvents.js';
import { handleFinish } from './Events/timeoutEvents.js';
import { handleDistubeError } from './Events/errorEvents.js';

export let timeoutMap = new Map();

export function setupDistube(client) {
    client.distube = new DisTube(client, {
        emitNewSongOnly: true,
        plugins: [
            new SpotifyPlugin(),
            new SoundCloudPlugin(),
            new YtDlpPlugin()
        ]
    });

    client.distube
        .on('playSong', (queue, song) => handlePlaySong(queue, song, timeoutMap))
        .on('addSong', (queue, song) => handleAddSong(queue, song, timeoutMap))
        .on('finish', (queue) => handleFinish(queue, timeoutMap))
        .on("error", (channel, error) => handleDistubeError(channel, error));
};
