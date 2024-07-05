const fs = require('fs');

// Input audio file path
const inputFilePath = './custom_1706004231111.wav';

// Output directory for the audio chunks
const outputDirectory = './chunks/';

// Duration of each chunk in seconds
const chunkDuration = 100;

// Function to create audio chunks
function createAudioChunks(inputFile, outputDir, duration) {
  // Read the entire audio file into a buffer
  const audioBuffer = fs.readFileSync(inputFile);

  // Calculate the number of chunks
  const chunkSize = duration * 1000; // convert seconds to milliseconds
  const totalChunks = Math.ceil(audioBuffer.length / chunkSize);

  // Create and write each chunk to a separate file
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min((i + 1) * chunkSize, audioBuffer.length);
    const chunkData = audioBuffer.slice(start, end);

    const chunkFilePath = `${outputDir}chunk_${i + 1}.wav`;
    fs.writeFileSync(chunkFilePath, chunkData);

    console.log(`Chunk ${i + 1} created successfully.`);
  }
}

// Call the function to create audio chunks
createAudioChunks(inputFilePath, outputDirectory, chunkDuration);

const AXIOS = require("axios");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");
const fs = require("fs");
async function convertAudioFile() {
  ffmpeg(
    "https://us-west-2-recallai-production-bot-data.s3.amazonaws.com/9f2be177-a476-4c6a-a5c3-93e93b66cfe1/AROA3Z2PRSQANGTUQXHNJ%3Ai-04c1dfc1c49138bdc/video-c943e862-c1c0-4524-a5c3-7a2c3e6697b4.mp4?AWSAccessKeyId=ASIA3Z2PRSQAJTP2TFUP&Signature=IDA%2BPvQYqqQvkMadH5BEC1mdNHw%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEJv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCXaUwagfq13LntM54HAG1kKyquCfSSyjCmSZbQ%2BofUwgIgST2AU8kyrqVT%2FLmrla8Ryg6dfNxsEzpNw3Vt4UB5xfwqugUIJBAAGgw4MTEzNzg3NzUwNDAiDIZEQ7UiqywsNnM%2B0yqXBSlENo%2BAYkidKTEGDLJZ3DvOHCZ9sHTYPILHHImiJpIKygG%2BR9RvEEgkR1ou3bI3cnWwi4sp%2FqI8OoqwyzdMjP5dHcpiFUWoaS%2Bf3aP804FTcAlwZNdmj3d7QAk0zCuIhDmajZAJ%2Fo9aCtF9%2BBigu0EKkLskCBifqgZWhvYzRzTZFnaXp%2FuZsLqlrytlEY5rE7rYVtwrxlssu2GQjzUhMNRubAaM6fLkEGVXS8T%2BFJrC8ocqpxemppaqRH%2BjJg8ouVaTza3CrQI9gT41Vkn24fKB0jAMkWaQcjBn%2BVLEuFXBIs2AobGsZjCndVrrb4HtB%2FkQk66eLVWuqNTWYPd1tYq%2BgWGtV1SVlB5PlVw3jN2BQOP15ZBegQE23VJV%2FdMu1MYcVp1SL%2Fwxc24suuOwLbAtmxupmY3IAb61pP8huYrLeEY4E3w5FYo71%2BLUVRLXIfIsLtLubdQI4%2FP2NhqVS8eDZu1wQ2zatlQe2VpZtdaOAYkoJ%2BunjNUDwNHIsMqasWpW6gZJSd5SlyMqmjjtZpa8M%2Bl07Yy0bSik%2BIWvzAue%2Fc3BOznsN0SoNtPs73dVKpY4zySbaH%2BmfZJUpzZdSVPfzIgeVaFK8VQWP%2BmCD6Lhujrw9dVWgnxDC3gIFvlRKMWQQQAswGYZwjAVP5fJ42DGPWaBUG7ngg4ciP%2FYn6VuLEqf7uamdo1OYCAyHtxHY9a8F6K9c%2FVIpt8zFybtlz0uL6qeugYhewgYviISsgWTkg%2FkEbqGlEjMJcWvnp6FLoqVNFUlAvgEwLD78K2uoWzNrzvjdvLEuytn1IOuU2VdRCSnPBVfxYQVVJ0LH2fgV4HqPAGUYhquqYIvPsqvobNPjz6f2mJqCyDgVyStxnZxOHJOFh3YvzCbyt%2ByBjqxAeULaaw8JcGFgznZ5NrbkIQhv1xvJHDqYIjcxzzpvf3pSfsiKjBqgvzkz%2BvK3bdIrHu0TQTl5qTWoHVY%2BgPU%2Bu70npwwLWMNPFE55h%2FXfaSpGMgSOkxK%2FSgJeS6SLK7gZsQ68X%2BlxO3XZVKg6cJ%2B4NVdsy%2FioZtBOB8yKhWv%2FohuSO6p2hCX3%2B%2BjmMtvL0Vh9%2FFw3E8mCE7qdSuVKQ4PYTHB33T%2Bfx%2FjPvE16oyJcRgbjA%3D%3D&Expires=1717074572"
  )
    .toFormat("wav")
    .save("test1234.wav")
    .on("start", (commandLine) => {
      console.log("Spawned FFmpeg with command: " + commandLine);
    })
    .on("stderr", (stderrLine) => {
      console.log("FFmpeg STDERR: " + stderrLine);
    })
    .on("progress", (progress) => {
      console.log("Processing: " + progress.percent + "% done");
    })
    .on("end", () => {
      console.log("Conversion complete");
    })
    .on("error", (err) => {
      console.log("An error occurred: " + err.message);
    });
}

async function mergeAudio() {
  const audioUrls = fs.readdirSync("./65b0d6031c7e0bee888c4327_audioFile")[
    ("./65b0d6031c7e0bee888c4327_audioFile/test_1716287176605_minute1.wav",
    "./65b0d6031c7e0bee888c4327_audioFile/test_1716287176605_minute10.wav",
    "./65b0d6031c7e0bee888c4327_audioFile/test_1716287176605_minute11.wav")
  ];
  audioUrls.forEach((audioUrl) => {
    if (audioUrl.includes(".wav")) {
      // console.log(audioUrl);
      command.input("./65b0d6031c7e0bee888c4327_audioFile/" + audioUrl);
    }
  });
  command.input("./merged11.wav");
  command.input(
    "./65b0d6031c7e0bee888c4327_audioFile/65b0d6031c7e0bee888c4327_1707292221233.wav"
  );
  command
    .input("./video.mp4")
    .output("output.mkv")
    .on("end", () => {
      console.log("Conversion finished");
    })
    .on("error", (err) => {
      console.error("Error during conversion:", err);
    })
    .run();
  command.input("./merged12.wav");
  command.input(
    "./65b0d6031c7e0bee888c4327_audioFile/65b0d6031c7e0bee888c4327_1707292221233.wav"
  );
  console.log(new Date());
  command
    .mergeToFile("merged15.wav", "./")
    .audioCodec("libmp3lame")
    .on("error", (err) => {
      console.error("Error merging audio:", err);
    })
    .on("end", () => {
      console.log("Audio merging complete.");
      console.log(new Date());
    });
}
