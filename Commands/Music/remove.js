import { createEmbedContent } from '../../Helper/embed.js';

export const name = 'remove';
export const aliases = ['rm', 'delete'];
export const execute = async (message, args, client) => {
    const queue = client.distube.getQueue(message);
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.reply({embeds: [createEmbedContent(`#fc0303`, 'Bạn cần tham gia kênh thoại để dùng lệnh này')]});
    };
    if (!queue || queue.songs.length <= 1) {
        return message.reply({embeds: [createEmbedContent(`#ffc563`, 'Không có bài nào trong hàng chờ để xoá')]});
    };

    if (!args[0]) {
        return message.reply({embeds: [createEmbedContent(`#fc0303`, `Sai cú pháp. Dùng: \`remove <thứ tự bài>\` (ví dụ: \`remove 3\`)`)]});
    };
    const index = parseInt(args[0]);
    if (isNaN(index) || index <= 0 || index >= queue.songs.length) {
        return message.reply({embeds: [createEmbedContent(`#ffc563`, `Vui lòng nhập số thứ tự hợp lệ (1 → ${queue.songs.length - 1})`)]});
    };
    const removed = queue.songs.splice(index, 1)[0];
    return message.reply({embeds: [createEmbedContent(`#19F400`, `Đã xoá bài **${removed.name}** khỏi hàng chờ`)]});
};
