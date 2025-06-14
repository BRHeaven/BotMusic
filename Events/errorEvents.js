import { createEmbedContent } from "../Helper/embed.js";

export const handleDistubeError = (channel, error) => {
    //console.log(error);
    const errorMessage = `❌ Đã xảy ra lỗi: ${error.toString().slice(0, 1974)}`;
    if (channel && typeof channel.send === "function") {
        channel.send({embeds : [createEmbedContent( `#000000`, errorMessage)]});
    } else {
        console.log({errorMessage});
        console.error("Distube Error:", {errorMessage});
    };
};
