export const name = 'queue';
export const aliases = ['q'];
export const execute = async (message, args, client) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send('📭 Không có bài nào trong hàng chờ.');

    const list = queue.songs
        .map((song, index) => `${index === 0 ? '🎶 Đang phát:' : `${index}.`} ${song.name} - ${song.formattedDuration}`)
        .join('\n');

    message.channel.send(`📜 Danh sách phát:\n${list}`);
};
