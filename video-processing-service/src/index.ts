import express from "express";
import { isVideoNew, setVideo } from "./firestore";
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcessedVideo } from "./storage";

setupDirectories();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.post("/process-video", async (req, res) => {
  // Get the bucket and filename from the cloud Pub/Sub message
  let data;
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error('Invalid Message payload received');
    }
  } catch(error) {
    console.error(error);
    return res.status(400).send('Bad Request: Missing Filename')
  }

  const inputFileName = data.name; // Format of <UID>-<DATE>.<EXTENSION>
  const outputFileName = `processed-${inputFileName}`;
  const videoId = inputFileName.split('.')[0];

  if (!isVideoNew(videoId)) {
    return res.status(400).send('Bad Request: Video already processing or processed')
  } else {
    await setVideo(videoId, {
      id: videoId,
      uid: videoId.split('-')[0],
      status: "processing"
    })
  }

  // Download the raw video from Cloud Storage
  await downloadRawVideo(inputFileName);

  // Convert the video to 360p
  try {

    await convertVideo(inputFileName, outputFileName)
  } catch (err) {
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName)
    ]);
    console.log(err);
    return res.status(500).send('Internal Server Error: video processing failed')
  }

  // Upload the processed video to Cloud Storage
  await uploadProcessedVideo(outputFileName);

  await setVideo(videoId, {
    status: 'processed',
    filename: outputFileName
  })

  await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName)
    ]);

  return res.status(200).send('Processing finished successfully');
});

app.listen(port, () => {
  console.log(`Video Processing Service listening at http://localhost:${port}`);
})