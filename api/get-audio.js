const ytdl = require('ytdl-core');

const handler = async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    try {
        // Get info from YouTube
        const info = await ytdl.getInfo(url);
        
        // Find the audio format with the highest quality
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

        if (!audioFormat) {
            return res.status(404).json({ error: 'No audio format found' });
        }

        return res.status(200).json({ audioUrl: audioFormat.url });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = handler;
