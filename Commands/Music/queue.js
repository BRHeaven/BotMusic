import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { createEmbedContent } from "../../Helper/embed.js";

export const name = 'queue';
export const aliases = ['q','list'];
export const execute = async (message, args, client) => {
    const queue = client.distube.getQueue(message);
    if (!queue) {
        return message.reply({
            embeds: [createEmbedContent(`#ffc563`, `Không có bài nào trong hàng chờ.`)]
        });
    }
    const songs = queue.songs;
    const songsPerPage = 10;
    const totalPages = Math.ceil((songs.length - 1) / songsPerPage);
    let currentPage = 0;
    const truncateString = (str, num) => {
        return str.length > num ? str.slice(0, num) + "..." : str;
    };
    const generatePage = (page) => {
        const start = 1 + page * songsPerPage;
        const end = start + songsPerPage;
        const list = songs.slice(start, end).map((song, i) => {
            const index = start + i;
            return `**${index}.** ${truncateString(song.name, 30)} - \`${song.formattedDuration}\``;
        });
        const description = `
            :dvd: **Đang phát:** ${truncateString(songs[0].name, 30)} - \`${songs[0].formattedDuration}\`
            :arrow_down_small: Trang ${page + 1}/${totalPages}
            ${list.join('\n')}
            `;
        return createEmbedContent(`#19F400`, description);
    };
    const createButtons = () => {
        return new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('prev')
                .setLabel(':track_previous: Trước')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(currentPage === 0),
            new ButtonBuilder()
                .setCustomId('next')
                .setLabel('Sau :track_next:')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(currentPage === totalPages - 1)
        );
    };
    const msg = await message.reply({
        embeds: [generatePage(currentPage)],
        components: [createButtons()]
    });
    const filter = i => ['prev', 'next'].includes(i.customId) && i.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 60_000 });
    collector.on('collect', async interaction => {
        if (interaction.customId === 'prev' && currentPage > 0) currentPage--;
        if (interaction.customId === 'next' && currentPage < totalPages - 1) currentPage++;
        await interaction.update({
            embeds: [generatePage(currentPage)],
            components: [createButtons()]
        });
    });
    collector.on('end', () => {
        msg.edit({ components: [] }).catch(() => { });
    });
};