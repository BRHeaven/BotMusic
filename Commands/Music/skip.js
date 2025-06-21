import { handleFinish, timeouts } from "../../Events/timeoutEvents.js";
import { createEmbedContent } from "../../Helper/embed.js";

export const name = 'skip';
export const aliases = ['s'];
export const execute = async (message, args, client) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send({ embeds: [createEmbedContent(`#ffc563`, '❌ Không có bài nào để skip.')]});
    try {
        const songCount = queue.songs.length;
        if (songCount <= 1) {
            queue.stop();
            handleFinish(queue, timeouts);
            return;
        };
        await client.distube.skip(message);
        message.channel.send({ embeds: [createEmbedContent(`#19F400`, ':track_next: Chuyển qua bài tiếp theo')]});
    } catch (err) {
        console.error(err);
        message.channel.send({ embeds: [createEmbedContent(`#fc0303`, ':warning: Đã gặp lỗi, không thể skip')]});
    };
};
