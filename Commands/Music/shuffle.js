import { createEmbedContent } from "../../Helper/embed.js";

export const name = 'shuffle';
export const aliases = ['mix'];
export const execute = async (message, args, client) => {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply({ embeds : [createEmbedContent(`#ffc563`,`Không có bài hát nào đang chờ`)]});

  try {
    queue.shuffle();
    message.reply({ embeds : [createEmbedContent(`#19F400`,`:twisted_rightwards_arrows: Đã xáo trộn danh sách phát`)]});
  } catch (error) {
    console.error('[Shuffle Error]', error);
    message.reply({ embeds : [createEmbedContent(`#fc0303`,`Không thể xáo trộn danh sách`)]});
  }
};