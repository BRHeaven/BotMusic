import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';

const activeTimeouts = new Map();

export const setupDistube = (client) => {
    try {
        client.distube = new DisTube(client, {
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            plugins: [
                new SpotifyPlugin(),
                new SoundCloudPlugin(),
                new YtDlpPlugin()
            ]
        });

        client.distube.on('playSong', (queue, song) => {
            // Hủy timeout nếu đang chờ thoát
            clearTimeoutIfExists(queue.id);
            queue.textChannel?.send(`🎶 **Đang phát:** \`${song.name}\` (${song.formattedDuration})`);
        });

        client.distube.on('addSong', (queue, song) => {
            // Hủy timeout nếu đang chờ thoát
            clearTimeoutIfExists(queue.id);
            queue.textChannel?.send(`➕ **Đã thêm:** \`${song.name}\` (${song.formattedDuration})`);
        });

        client.distube.on('finish', (queue) => {
            startTimeout(queue);
        });

        client.distube.on('error', (channel, error) => {
            channel?.send(`❌ **Lỗi:** \`${error.message}\``);
            console.error(`[Distube Error]`, error);
        });

    } catch (error) {
        console.error(`[Command Error] ${error.message} (distubeClient.js)`);
    }
};

// Hàm timeout 10 phút khi hết nhạc
const startTimeout = (queue) => {
    const channel = queue.textChannel;
    if (!channel) return;

    channel.send("📃 **Đã phát hết danh sách.** Bot sẽ tự thoát khỏi voice sau 10 phút nếu không có bài nhạc mới.");

    const timeout = setTimeout(() => {
        try {
            // Kiểm tra lại nếu vẫn không có bài nào
            if (!queue.songs || queue.songs.length === 0) {
                queue.client.distube.voices.leave(queue.id);
                channel.send("👋 **Bot đã thoát khỏi voice vì không có bài hát mới sau 10 phút.**");
            }
        } catch (err) {
            console.error("❌ Lỗi khi thoát voice:", err);
        } finally {
            activeTimeouts.delete(queue.id);
        }
    }, 10 * 60 * 1000); // 10 phút

    activeTimeouts.set(queue.id, timeout);
}

// Xóa timeout nếu có
const clearTimeoutIfExists = (guildId) => {
    if (activeTimeouts.has(guildId)) {
        clearTimeout(activeTimeouts.get(guildId));
        activeTimeouts.delete(guildId);
    };
};
