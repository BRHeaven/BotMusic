import { createEmbedContent } from "../Helper/embed.js";

export const handleDistubeError = (channel, error) => {
    const errorMessage = `❌ Đã xảy ra lỗi: ${JSON.stringify(error, Object.getOwnPropertyNames(error)).slice(0, 1974)}`;
    if (channel && typeof channel.send === "function") {
        channel.send({embeds : [createEmbedContent( `#000000`, errorMessage)]});
    } else {
        console.error("[Distube Error]:", channel);
    };
    //console.error("[Detail Error]: ", error);
};
