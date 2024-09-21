const play = require('play-dl');

const handler = async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    try {
        // Validate YouTube URL
        if (!play.yt_validate(url)) {
            return res.status(400).json({ error: 'Invalid YouTube URL' });
        }

        // Get video info
        const yt_info = await play.video_info(url);
        
        // Get the highest quality audio-only stream
        const audioFormats = yt_info.format.filter(format => format.mimeType.startsWith('audio/'));
        const highestQualityAudio = audioFormats.reduce((prev, current) => 
            (prev.bitrate > current.bitrate) ? prev : current
        );

        if (!highestQualityAudio) {
            return res.status(404).json({ error: 'No audio format found' });
        }

        return res.status(200).json({ audioUrl: highestQualityAudio.url });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = handler;
