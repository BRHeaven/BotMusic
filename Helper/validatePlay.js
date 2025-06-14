const isValidURL = (str) => {
    try {
        const url = new URL(str);
        return ['https:', 'http:'].includes(url.protocol);
    } catch (_) {
        return false;
    }
};

const commandWords = ['7p', '7play', 'p', 'play'];

const extractValidLinkFromText = (text) => {
    const linkRegex = /(https?:\/\/[^\s]+)/gi;
    const matches = text.match(linkRegex);
    if (!matches) return null;
    for (const url of matches) {
        if (isValidURL(url)) return url;
    };
    return null;
};
export const validateMusicPlay = (args = []) => {
    if (args.length === 0) {
        return {
            valid: false,
            reason: ':no_entry: Vui lòng nhập tên bài hát hoặc link.'
        };
    };
    // Bỏ các từ lệnh spam
    const filteredArgs = args.filter((word, index) => {
        return !commandWords.includes(word.toLowerCase()) || index > 0;
    });
    const fullText = filteredArgs.join(' ').trim();
    if (!fullText) {
        return {
            valid: false,
            reason: '❌ Vui lòng nhập tên bài hát hoặc link sau lệnh.'
        };
    };
    const validLinkPrefixes = [
        'https://www.youtube.com/',
        'https://youtu.be/',
        'https://open.spotify.com/',
        'https://soundcloud.com/'
    ];
    const extractedLink = extractValidLinkFromText(fullText);
    if (extractedLink) {
        const isSupported = validLinkPrefixes.some(prefix => extractedLink.startsWith(prefix));
        if (!isSupported) {
            return {
                valid: false,
                reason: ':no_entry: Link không được hỗ trợ. Chỉ hỗ trợ YouTube, Spotify, SoundCloud.'
            };
        };
        return { valid: true, query: extractedLink };
    };
    // Nếu không có link, dùng phần còn lại để tìm kiếm
    return { valid: true, query: fullText };
};