import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';
import { createEmbedContent } from '../../Helper/embed.js';

export const name = 'join';
export const aliases = ['j'];
const joinTimeouts = new Map();
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
      embeds: [createEmbedContent(`#1afc05`, `Bot đã tham gia kênh **${userVoiceChannel.name}**. Nếu không phát nhạc trong 5 phút, bot sẽ tự thoát.`)]
    });
    // Nếu chưa có timeout → đặt timeout 5 phút
    if (!joinTimeouts.has(message.guild.id)) {
      const timeout = setTimeout(() => {
        const connection = getVoiceConnection(message.guild.id);
        if (connection) {
          connection.destroy();
          message.channel.send({
            embeds: [createEmbedContent(`#fc0505`, `⏳ Không phát nhạc trong 5 phút, bot đã tự động thoát kênh.`)]
          });
        };
        joinTimeouts.delete(message.guild.id);
      }, 5 * 60 * 1000); // 5 phút
      joinTimeouts.set(message.guild.id, timeout);
    };
  } catch (error) {
    console.error(`[Command Error] ${error.message} (join.js)`);
    return message.channel.send("❌ Bot gặp lỗi khi xử lý lệnh này. Hãy thử lại.");
  };
};
export { joinTimeouts };
