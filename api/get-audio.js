// api/get-audio.js
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

module.exports = async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId parameter' });
  }

  try {
    console.log(`Executing yt-dlp for video ID: ${videoId}`);
    const { stdout, stderr } = await execPromise(`./yt-dlp -f bestaudio -g https://www.youtube.com/watch?v=${videoId}`);
    
    if (stderr) {
      console.error('yt-dlp stderr:', stderr);
    }
    
    const audioUrl = stdout.trim();

    if (!audioUrl) {
      throw new Error('yt-dlp did not return a valid URL');
    }

    console.log('Successfully retrieved audio URL');
    res.status(200).json({ audioUrl });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve audio stream URL',
      details: error.message,
      command: error.cmd
    });
  }
};
