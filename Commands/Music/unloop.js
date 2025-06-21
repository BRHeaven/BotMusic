import { createEmbedContent } from "../../Helper/embed.js";

export const name = 'unloop';
export const aliases = ['unrepeat', 'ulp'];
export const execute = async (message, args, client) => {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply({ embeds : [createEmbedContent(`#ffc563`,`Không có bài hát vào đang được phát`)]});
  queue.setRepeatMode(0);
  message.reply({ embeds : [createEmbedContent(`#19F400`,`:arrow_right_hook: Đã tắt chế độ lặp lại.`)]});
};
