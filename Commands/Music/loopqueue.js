import { createEmbedContent } from "../../Helper/embed.js";
export const name = 'loopqueue';
export const aliases = ['repeatqueue', 'lq'];
export const execute = async (message, args, client) => {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply({ embeds : [createEmbedContent(`#ffc563`,`Không có bài hát vào đang được phát`)]});
  queue.setRepeatMode(2); 
  message.reply({ embeds : [createEmbedContent(`#19F400`,`:repeat: Đã bật chế độ lặp lại toàn bộ hàng chờ.`)]});
};

