import { createEmbedTitle } from "../../Helper/embed.js";
import { validateMusicPlay } from "../../Helper/validatePlay.js";

export const name = 'play';
export const aliases = ['p'];

export const execute = async (message, args, client) => {
    const { valid, reason, query } = validateMusicPlay(args);
    const voiceChannel = message.member.voice.channel;
    const textChannel = message.channel;
    const member = message.member;

    if (!valid) {
        return message.reply({ embeds: [createEmbedTitle('#fc0303', reason)] });
    };
    try {
        if (!voiceChannel) {
            return message.reply({ embeds: [createEmbedTitle(`#fc0303`, `Hãy vào Voice trước khi dùng bot để phát nhạc :eyes:`)] });
        };
        if (!query) {
            return message.reply({ embeds: [createEmbedTitle(`#fc0320`, `Nhập tên bài hát hoặc link :rightwards_pushing_hand:`)] });
        };
        await client.distube.play(voiceChannel, query, {
            textChannel,
            member,
        });
    } catch (error) {
        console.error(`[Command Error] ${error.message} (play.js)`);
        message.channel.send({
            embeds: [createEmbedTitle(`#fc0303`, `Bot ngoài hệ thống, vui lòng chờ được sửa lỗi :pleading_face:`)]
        });
    };
};
