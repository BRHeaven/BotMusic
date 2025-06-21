import { createEmbedContent } from '../../Helper/embed.js';

export const name = 'clean';
export const aliases = ['clear', 'c'];
export const execute = async (message, args, client) => {
    const queue = client.distube.getQueue(message);
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
        return message.channel.send({embeds: [createEmbedContent('#fc0303', 'Bạn cần vào một kênh thoại để sử dụng lệnh này')]});
    };
    if (!queue) {
        return message.channel.send({embeds: [createEmbedContent('#19F400', ' Không có bài hát nào trong hàng chờ để xóa')]});
    };
    if (queue.songs.length <= 1) {
        return message.channel.send({embeds: [createEmbedContent('#19F400', 'Không có bài nào trong hàng chờ để xóa (chỉ còn bài đang phát)')]});
    };
    queue.songs = [queue.songs[0]];
    message.channel.send({embeds: [createEmbedContent('#19F400', 'Đã xoá toàn bộ bài hát trong hàng chờ')]});
};
