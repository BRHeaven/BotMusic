import { createEmbedContent } from '../../Helper/embed.js';

export const name = 'leave';
export const aliases = ['l'];
export const execute = async (message, args, client) => {
  const voiceChannel = message.member.voice.channel;
  const queue = client.distube.getQueue(message);
  if (!voiceChannel) {
    return message.channel.send({ embeds: [createEmbedContent(`#fc0303`, `Bạn cần vào Voice Channel trước khi dùng lệnh`)] });
  };
  try {
    const connection = client.distube.voices.get(message.guild.id);
    if (queue) {
      await client.distube.stop(message);
    };
    const timeoutMap = client.timeoutMap;
    if (timeoutMap && timeoutMap.has(message.guild.id)) {
      clearTimeout(timeoutMap.get(message.guild.id));
      timeoutMap.delete(message.guild.id);
    };
    await client.distube.voices.leave(connection);
    message.reply({ embeds: [createEmbedContent(`#19F400`, `👋 Đã rời khỏi ${connection.channel.name}`)]});
  } catch (error) {
    console.error(`[Command Error] ${error.message} (leave.js)`);
    message.channel.send({ embeds: [createEmbedContent(`#fc0303`, `Bot đang khong rời được kênh thoại`)] });
  }
};