export const name = 'stop';
export const execute = async (message, args, client) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send('❌ Không có bài nào đang phát.');

    await client.distube.stop(message);
    message.channel.send('⏹️ Đã dừng nhạc.');
};
