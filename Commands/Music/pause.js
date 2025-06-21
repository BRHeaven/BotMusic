import { createEmbedContent } from '../../Helper/embed.js';

export const name = 'pause';
export const aliases = ['ps','stop'];
export const execute = async (message, args, client) => {
  const queue = client.distube.getQueue(message);
  const userChannel = message.member.voice.channel;

  if (!userChannel) return message.reply({embeds : [createEmbedContent(`#fc0303`,`Bạn cần vào một kênh thoại trước.`)]});

  if (!queue) return message.reply({embeds : [createEmbedContent(`#ffc563`,`Không có bài hát nào đang phát.`)]});

  if (queue.voiceChannel.id !== userChannel.id) return message.reply({embeds : [createEmbedContent(`#ffc563`,`Bạn phải cùng kênh thoại với bot để dừng nhạc.`)]});

  if (queue.paused) return message.reply({embeds : [createEmbedContent(`#ffc563`,`:pause_button: Nhạc đã bị dừng từ trước.`)]});

  queue.pause();
  return message.reply({embeds : [createEmbedContent(`#19F400`,`:pause_button: Đã dừng phát nhạc.`)]});
};