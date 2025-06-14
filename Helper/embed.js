import { EmbedBuilder } from "discord.js";
export const createEmbedTitle = (color, title) => {
    return new EmbedBuilder().setColor(color).setTitle(title);
};
export const createEmbedContent = (color, description) => {
    return new EmbedBuilder().setColor(color).setDescription(description);
};
