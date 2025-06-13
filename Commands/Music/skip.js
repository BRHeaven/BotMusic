export const name = 'skip';
export const aliases = ['s'];
export const execute = async (message, args, client) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send('❌ Không có bài nào để skip.');
    if (queue.songs.length <= 1) {message.channel.send('⏭️ Đã hết bài để phát, nếu không thêm bài mới Bot sẽ tự động thoát voice sau 10 phút.');
        if (!timeout) {
            timeout = setTimeout(() => {
                if (!client.distube.getQueue(message)) return;
                client.distube.voices.leave(message.guild);
                message.channel.send('⏱️ Không có bài mới nào được thêm. Bot đã thoát voice.');
                timeout = null;
            }, 10 * 60 * 1000); // 10 phút
        };
        return;
    };
    try {
        await client.distube.skip(message);
        message.channel.send('⏭️ Đã chuyển bài tiếp theo.');
    } catch (err) {
        console.error(err);
        message.channel.send('⚠️ Không thể skip.');
    };
};