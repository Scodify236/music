const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

exports.handler = async (event) => {
    const videoUrl = event.queryStringParameters.url;

    if (!videoUrl) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'No URL provided' }),
        };
    }

    try {
        const { stdout, stderr } = await execPromise(`yt-dlp -f bestaudio --get-url ${videoUrl}`);
        if (stderr) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: stderr }),
            };
        }

        const audioUrl = stdout.trim();
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
