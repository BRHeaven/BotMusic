import { createEmbedTitle } from "../../Helper/embed.js";
import { getSpotifyTrackLinks } from "../../Helper/fetchSpotifyPlaylist.js";
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
      return message.reply({ embeds: [createEmbedTitle(`#fc0303`, `Hãy vào kênh thoại trước khi dùng bot để phát nhạc :eyes:`)] });
    };
    if (!query) {
      return message.reply({ embeds: [createEmbedTitle(`#ffc563`, `Nhập tên bài hát hoặc link :rightwards_pushing_hand:`)] });
    };
    if (query.includes('open.spotify.com/playlist')) {
      try {
        const links = await getSpotifyTrackLinks(query);
        if (!links.length) throw new Error("Playlist rỗng");
        await message.reply({ embeds: [createEmbedTitle(`#19F400`, `Đang thêm ${links.length} bài từ Spotify`)] });
        for (const url of links) {
          await client.distube.play(voiceChannel, url, {
            textChannel,
            member
          });
        }
        return;
      } catch (e) {
        console.error("[Spotify Playlist Error]", e);
        return message.channel.send({ embeds: [createEmbedTitle('#fc0303', '❌ Không thể xử lý playlist Spotify này.')]});
      };
    };
    await client.distube.play(voiceChannel, query, {
      textChannel,
      member,
    });
  } catch (error) {
    //console.error(`[Command Error] ${error.message} (play.js)`);
    message.channel.send({
      embeds: [createEmbedTitle(`#fc0303`, `Không phát được bài hát này`)]
    });
  };
};