const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

module.exports = async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId parameter' });
  }

  try {
    const { stdout } = await execPromise(`yt-dlp -f bestaudio -g https://www.youtube.com/watch?v=${videoId}`);
    const audioUrl = stdout.trim();

    res.status(200).json({ audioUrl });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve audio stream URL' });
  }
};
