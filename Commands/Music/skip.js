export const name = 'skip';
export const aliases = ['s'];
export const execute = async (message, args, client) => {
    try {
        const queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send('❌ Không có bài nào để bỏ qua.');

        try {
            await client.distube.skip(message);
            message.channel.send('⏭️ Đã chuyển sang bài tiếp theo.');
        } catch (error) {
            console.error(error);
            message.channel.send('⚠️ Không thể skip, có thể không còn bài nào tiếp theo.');
        };
    } catch (error) {
        console.error(`[Command Error] ${error.message} (skip.js)`);
        message.channel.send("❌ Bot gặp lỗi khi xử lý lệnh này. Hãy thử lại.");
    };
};
