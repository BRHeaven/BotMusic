import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';

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
            queue.textChannel?.send(`🎶 **Đang phát:** \`${song.name}\` (${song.formattedDuration})`);
        });

        client.distube.on('addSong', (queue, song) => {
            queue.textChannel?.send(`➕ **Đã thêm:** \`${song.name}\` (${song.formattedDuration})`);
        });

        client.distube.on('error', (channel, error) => {
            channel?.send(`❌ **Lỗi:** \`${error.message}\``);
            console.error(`[Distube Error]`, error);
        });
        // Logic timeout 10min
        client.distube.on('finish', (queue) => {
            const timeout = timeoutBot(queue);
            // Nếu có bài mới, hủy timeout
            const cancelTimeout = () => clearTimeout(timeout);
            client.distube.once('addSong', cancelTimeout);
            client.distube.once('playSong', cancelTimeout);
        });

    } catch (error) {
        console.error(`[Command Error] ${error.message} (distubeClient.js)`);
        //message.channel.send("❌ Bot gặp lỗi khi xử lý. Hãy thử lại.");
    };
};
const timeoutBot = (queue) => {
    const channel = queue.textChannel;
    if (!channel) return;
    channel.send("📃 **Đã phát hết danh sách.** Bot sẽ tự thoát khỏi voice sau 10 phút nếu không có bài nhạc mới.");
    // Hẹn giờ 10 phút
    const timeout = setTimeout(() => {
        if (!queue.songs || queue.songs.length === 0) {
            try {
                queue.connection?.disconnect(); // hoặc client.distube.voices.leave(queue)
                channel.send("👋 **Bot đã thoát khỏi voice vì không có bài hát mới sau 10 phút.**");
            } catch (err) {
                console.error("❌ Lỗi khi thoát voice:", err);
            }
        }
    }, 600_000); // 10 phút
    return timeout;
};