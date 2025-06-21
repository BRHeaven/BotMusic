import { createEmbedContent } from "../../Helper/embed.js";

export const name = 'autoplay';
export const aliases = ['ap', 'auto'];
export const execute = async (message, args, client) => {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply({ embeds : [createEmbedContent(`#ffc563`,`Không có bài hát nào đang phát`)]});

  try {
    const mode = queue.toggleAutoplay();
    message.reply({ embeds : [createEmbedContent(`#19F400`,`🎶 Chế độ autoplay hiện đang: **${mode ? 'BẬT' : 'TẮT'}**.`)]});
  } catch (error) {
    console.error('[Autoplay Error]', error);
    message.reply({ embeds : [createEmbedContent(`#fc0303`,`Không thể chuyển chế độ autoplay`)]});
  }
};