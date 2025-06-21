import { createEmbedContent } from "../Helper/embed.js";

export const handlePlaySong = (queue, song, timeoutMap) => {
    if (timeoutMap.has(queue.id)) {
        console.log(`[Run]: `, true);
        clearTimeout(timeoutMap.get(queue.id));
        timeoutMap.delete(queue.id);
    };
    queue.textChannel.send({ embeds: [createEmbedContent(`#19F400`, `Đang phát: **${song.name}** - \`${song.formattedDuration}\``)] });
};

export const handleAddSong = (queue, song, timeoutMap) => {
    const listMusic = queue.songs;
    console.log(`[List]: `, listMusic);
    if (listMusic.length > 1) {
        clearTimeout(timeoutMap.get(queue.id));
        timeoutMap.delete(queue.id);
        queue.textChannel.send({ embeds: [createEmbedContent(`#19F400`, `Đã thêm: **${song.name}** - \`${song.formattedDuration}\``)] });
    };
};
export const handleAddlist = (queue, playlist) => {
    console.log("[Debug] Queue initialized:", queue.songs.length);
    queue.textChannel?.send({ embeds: [createEmbedContent(`#19F400`, `Đã thêm playlist: **${playlist.name}** gồm ${playlist.songs.length} bài`)]});
};