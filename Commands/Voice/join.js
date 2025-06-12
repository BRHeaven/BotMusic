import { joinVoiceChannel } from '@discordjs/voice';

export const name = 'join';
export const aliases = ['j'];
export const execute = async (message, args) => {
  try {
    console.log(`join.js `, message);
    const voiceChannel = message.member.voice.channel;
    console.log(message.member);
    if (!voiceChannel) {
      return message.reply('❗ Bạn phải vào một voice channel trước.');
    }

    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    message.reply(`✅ Đã tham gia voice channel: **${voiceChannel.name}**`);
  } catch (error) {
    console.error(`[Command Error] ${error.message} (join.js)`);
    message.channel.send("❌ Bot gặp lỗi khi xử lý lệnh này. Hãy thử lại.");
  };
};