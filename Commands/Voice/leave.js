import { getVoiceConnection } from '@discordjs/voice';

export const name = 'leave';
export const aliases = ['l'];
export const execute = async (message, args) => {
  try {
    const connection = getVoiceConnection(message.guild.id);
    if (!connection) {
      return message.reply('❗ Bot chưa vào voice channel nào.');
    }

    connection.destroy();
    message.reply('👋 Đã rời khỏi voice channel.');
  } catch (error) {
    console.error(`[Command Error] ${error.message} (leave.js)`);
    message.channel.send("❌ Bot gặp lỗi khi xử lý lệnh này. Hãy thử lại.");
  }
};