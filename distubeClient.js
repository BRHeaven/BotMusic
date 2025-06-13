import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';

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
        .on('playSong', (queue, song) => {
            const embed = {
                color: 0x00ff00,
                description: `🎶 Đang phát: **${song.name}** - \`${song.formattedDuration}\``,
            };
            queue.textChannel.send({ embeds: [embed] });

            if (timeoutMap.has(queue.id)) {
                clearTimeout(timeoutMap.get(queue.id));
                timeoutMap.delete(queue.id);
            }
        })
        .on('addSong', (queue, song) => {
            if (timeoutMap.has(queue.id)) {
                clearTimeout(timeoutMap.get(queue.id));
                timeoutMap.delete(queue.id);
            }
        })
        .on('finish', queue => {
            const timeout = setTimeout(() => {
                if (queue.voice.channel) {
                    queue.voice.channel.leave();
                    queue.textChannel.send('⏹️ Không có bài mới trong 10 phút, Bot đã thoát voice.');
                }
                timeoutMap.delete(queue.id);
            }, 10 * 60 * 1000);

            timeoutMap.set(queue.id, timeout);
            queue.textChannel.send('📭 Hết danh sách phát. Bot sẽ thoát sau 10 phút nếu không có bài mới.');
        })
        .on("error", (channel, error) => {
            const errorMessage = `❌ Đã xảy ra lỗi: ${error.toString().slice(0, 1974)}`;
            if (channel && typeof channel.send === "function") {
                channel.send(errorMessage);
            } else {
                console.error("Distube Error:", errorMessage);
            };
        });
}