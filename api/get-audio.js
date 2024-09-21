const ytdlp = require('yt-dlp');

const handler = async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    try {
        // Fetch audio stream URL using yt-dlp
        const info = await ytdlp(url, {
            dumpSingleJson: true,
            format: 'bestaudio'
        });

        const audioUrl = info.url;
        return res.status(200).json({ audioUrl });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = handler;
