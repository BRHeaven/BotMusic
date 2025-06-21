import { createEmbedTitle } from "../Helper/embed.js";

export const handleFinish = (queue, timeoutMap) => {
    console.log('📌 handleFinish CALLED for guild:', queue.id);
    if (timeoutMap.has(queue.id)) return;
    const timeout = setTimeout(() => {
        const connection = queue.voice?.connection;
        console.log('🔌 Destroying connection:', connection);
        if (connection) {
            connection.destroy();
            queue.textChannel.send({
                embeds: [createEmbedTitle('#fc0303', '⏹️ Không có bài mới trong 10 phút, Bot đã thoát kênh đàm thoại.')]
            });
        };
        timeoutMap.delete(queue.id);
    }, 10 * 60 * 1000);
    timeoutMap.set(queue.id, timeout);
    queue.textChannel.send({
        embeds: [createEmbedTitle('#ffc563', '⚠️ Hết danh sách phát. Bot sẽ thoát sau 10 phút nếu không có bài mới.')]
    });
};
export const timeouts = new Map();
