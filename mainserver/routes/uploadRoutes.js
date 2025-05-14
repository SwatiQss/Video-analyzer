const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { extractAudioFromVideo } = require("../service/videoProcessor"); // this function to extract audio of video
const{speechtoText}=require("../service/audioProcessor");
const { transcode } = require("buffer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("video"), async (req, res) => {
  try {
    const videoPath = req.file.path;

    const outputDir = path.join(__dirname, "..", "audio"); // adjust path if needed
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const audioFilePath = path.join(outputDir, `${req.file.filename}.mp3`);
    console.log(audioFilePath, "aa");

    await extractAudioFromVideo(videoPath, audioFilePath);
   
   const transcript = await speechtoText(audioFilePath);






    res.json({
      message: "Audio extracted successfully",
      audioFile: `audio/${req.file.filename}.mp3`,
      transcript:transcript
    });
     
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process video" });
  }
});





module.exports = router;
