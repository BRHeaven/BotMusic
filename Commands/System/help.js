import { createEmbedContent } from "../../Helper/embed.js";

export const name = 'help';
export const aliases = ['h'];
export const execute = async (message, args, client) => {
    return message.reply({
        embeds : [createEmbedContent(
            `#3467eb`,
            `
            **:pushpin: Các lệnh liên quan tới Bot :pushpin:**
            **play**      | **p**   : Gọi bot vào voice channel, phát nhạc, thêm nhạc.
            **skip**      | **s**   : Bỏ qua bài đang phát, chuyển qua bài tiếp theo.
            **queue**     | **q**   : Xem danh sách phát.
            **leave**     | **l**   : Thoát khỏi voice channel.
            **shuffle**   | **mix**  : Sắp xếp ngẫu nhiên danh sách đang phát.
            **loop**      | **lp**  : Lập lại bài đang phát.
            **unloop**    | **ulp**  : Huỷ lập bài đang phát.
            **pause**     | **ps**  : Dừng lại bài đang phát.
            **unpause**   | **ups** : Tiếp tục chạy bài đang phát.
            **loopqueue** | **lq**  : Lập lại danh sách.
            **autoplay**  | **ap**  : Nhạc tự phát.
            **insert**    | **at**  : Chèn bài hát lên hàng chờ ưu tiên.
            **clean**     | **c**   : Dọn toàn bộ hàng chờ phát nhạc.
            **remove**    | **rm**  : Xoá 1 bài trong hàng chờ.
            `)]
    });
};