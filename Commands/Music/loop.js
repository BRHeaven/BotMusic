import { createEmbedContent } from "../../Helper/embed.js";

export const name = 'loop';
export const aliases = ['repeat', 'lp'];
export const execute = async (message, args, client) => {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply({ embeds : [createEmbedContent(`#ffc563`,`Không có bài hát nào đang được phát`)]});
  queue.setRepeatMode(1);
  message.reply({ embeds: [createEmbedContent(`#19F400`,`:repeat: Đã bật chế độ lặp lại bài hát hiện tại`)]})
};
