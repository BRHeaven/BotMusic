import { createEmbedTitle } from "../Helper/embed.js";
export const handleFinish = (queue, timeoutMap) => {
    const timeout = setTimeout(() => {
        if (queue.voice.channel) {
            queue.connection?.destroy();
            queue.textChannel.send({embeds : [createEmbedTitle( `#fc0303`, ':triumph: Không có bài mới trong 10 phút, Bot đã thoát voice.')]});
        };
        timeoutMap.delete(queue.id);
    }, 10 * 60 * 1000);
    timeoutMap.set(queue.id, timeout);
    queue.textChannel.send({embeds : [createEmbedTitle( `#fc5603`, ':warning: Hết danh sách phát. Bot sẽ thoát sau 10 phút nếu không có bài mới.')]});
};
