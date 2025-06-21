import { createEmbedContent } from '../../Helper/embed.js';

export const name = 'unpause';
export const aliases = ['resume', 'ups'];
export const execute = async (message, args, client) => {
    const queue = client.distube.getQueue(message);
    const userChannel = message.member.voice.channel
    if (!userChannel) return message.reply({ embeds: [createEmbedContent(`#fc0303`, `Bạn cần vào một kênh thoại trước.`)] });
    if (!queue) return message.reply({ embeds: [createEmbedContent(`#fc0303`, `Không có bài hát nào trong hàng chờ.`)] });
    if (queue.voiceChannel.id !== userChannel.id) return message.reply({ embeds: [createEmbedContent(`#fc0303`, `Bạn phải cùng kênh thoại với bot để tiếp tục nhạc.`)] });
    if (!queue.paused) return message.reply({ embeds: [createEmbedContent(`#19F400`, `:arrow_forward: Nhạc đã đang phát.`)] });
    queue.resume();
    return message.reply({ embeds: [createEmbedContent(`#19F400`, `:arrow_forward: Tiếp tục phát nhạc.`)] });
};
