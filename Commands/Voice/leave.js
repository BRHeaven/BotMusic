import { getVoiceConnection } from '@discordjs/voice';

export const name = 'leave';
export const execute = async (message, args) => {
  const connection = getVoiceConnection(message.guild.id);
  if (!connection) {
    return message.reply('❗ Bot chưa vào voice channel nào.');
  }

  connection.destroy();
  message.reply('👋 Đã rời khỏi voice channel.');
};