export const name = 'play';
export const aliases = ['p'];

export const execute = async (message, args, client) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.reply('❗ Bạn phải vào voice channel trước.');
    }

    const query = args.join(' ');
    if (!query) return message.reply('❗ Vui lòng nhập tên bài hát hoặc link.');

    client.distube.play(voiceChannel, query, {
        textChannel: message.channel,
        member: message.member
    });
    message.channel.send(`🎶 Đang phát: \`${query}\``);
};