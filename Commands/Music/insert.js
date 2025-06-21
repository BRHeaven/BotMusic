import { createEmbedContent } from "../../Helper/embed.js";

export const name = 'insert';
export const aliases = ['addtop', 'at'];
export const execute = async (message, args, client) => {
  const voiceChannel = message.member.voice.channel;
  const query = args.join(' ');
  if (!voiceChannel) {
    return message.reply({ embeds : [createEmbedContent(`#fc0303`,`Bạn cần tham gia kênh voice trước`)]});
  };
  if (!query) {
    return message.reply({ embeds : [createEmbedContent(`#ffc563`,`Bạn cần nhập tên hoặc link bài nhạc để chèn.`)]});
  };
  try {
    const queue = client.distube.getQueue(message);
    if (!queue) {
      await client.distube.play(voiceChannel, query, {
        message,
        textChannel: message.channel,
        position: 0
      });
    } else {
      await client.distube.play(voiceChannel, query, {
        message,
        textChannel: message.channel,
        position: 1
      });
      message.reply({ embeds : [createEmbedContent(`#19F400`,` Đã chèn bài vào đầu hàng chờ`)]});
    };
  } catch (error) {
    console.error('[Insert Error]', error);
    message.reply({ embeds : [createEmbedContent(`#fc0303`,`Có lỗi khi chèn bài hát`)]});
  }
};