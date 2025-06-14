import { createEmbedTitle } from "../Helper/embed.js";

export const handlePlaySong = (queue, song, timeoutMap) => {
    if (timeoutMap.has(queue.id)) {
        clearTimeout(timeoutMap.get(queue.id));
        timeoutMap.delete(queue.id);
        queue.textChannel.send({ embeds: [createEmbedTitle(`#0x00ff00`, `Đang phát: **${song.name}** - \`${song.formattedDuration}\``)] });
    };
};

export const handleAddSong = (queue, song, timeoutMap) => {
    if (timeoutMap.has(queue.id)) {
        clearTimeout(timeoutMap.get(queue.id));
        timeoutMap.delete(queue.id);
        queue.textChannel.send({ embeds: [createEmbedTitle(`#0x00ff00`, `Đã thêm: **${song.name}** - \`${song.formattedDuration}\``)] });
    };
};