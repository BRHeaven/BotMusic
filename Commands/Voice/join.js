import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';
import { createEmbedContent } from '../../Helper/embed.js';
import { joinTimeouts } from '../../Events/timeoutEvents.js';

export const name = 'join';
export const aliases = ['j'];
export const execute = async (message, args, client) => {
  const userVoiceChannel = message.member.voice.channel;
  try {
    if (!userVoiceChannel) {
      return message.reply({
        embeds: [createEmbedContent(`#fc0505`, `Bạn cần vào kênh nói chuyện trước khi gọi Bot`)]
      });
    };
    const botVoiceChannel = message.guild.members.me.voice.channel;
    if (botVoiceChannel) {
      if (botVoiceChannel.id === userVoiceChannel.id) {
        return message.channel.send({
          embeds: [createEmbedContent(`#1afc05`, `Bot đã ở trong kênh **${userVoiceChannel.name}**`)]
        });
      } else {
        return message.channel.send({
          embeds: [createEmbedContent(`#fc0505`, `Bot đang ở một kênh khác: **${botVoiceChannel.name}**`)]
        });
      };
    };
    joinVoiceChannel({
      channelId: userVoiceChannel.id,
      guildId: userVoiceChannel.guild.id,
      adapterCreator: userVoiceChannel.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false,
    });
    message.channel.send({
      embeds: [createEmbedContent(`#1afc05`, `Bot đã tham gia kênh **${userVoiceChannel.name}**`)]
    });
    if (!joinTimeouts.has(message.guild.id)) {
      ;
      const timeoutJoin = timeout(message.guild, userVoiceChannel.name, message.channel);
      joinTimeouts.set(message.guild.id, timeoutJoin);
    };
  } catch (error) {
    console.error(`[Command Error] ${error.message} (join.js)`);
    return message.channel.send("❌ Bot gặp lỗi khi xử lý lệnh này. Hãy thử lại.");
  };
};
const timeout = (voice, name, channel) => {
  const timeout = setTimeout(() => {
    const connection = getVoiceConnection(voice.id);
    if (connection) {
      connection.destroy();
      channel.send({ embeds: [createEmbedContent(`#EF0400`, `:hourglass: Sau 5 phút không phát nhạc, Bot đã rời khỏi kênh ${name}`)] });
      joinTimeouts.delete(voice.id);
    };
  }, 10 * 1000);
  return timeout;
};