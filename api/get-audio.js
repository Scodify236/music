const youtubedl = require('youtube-dl-exec');

module.exports.handler = async (event) => {
    const videoUrl = event.queryStringParameters.url;
    if (!videoUrl) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'No URL provided' }),
        };
    }

    try {
        // Fetch audio stream URL using yt-dlp wrapper
        const output = await youtubedl(videoUrl, {
            format: 'bestaudio',
            getUrl: true
        });
        const audioUrl = output.trim();

        return {
            statusCode: 200,
            body: JSON.stringify({ audioUrl }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
