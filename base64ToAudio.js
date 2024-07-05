

// Base64-encoded audio data
const base64Audio =''

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

async function convertBase64ToAudio(base64Audio, outputPath) {
    // Decode base64 audio data and write to a temporary file
    const tempFilePath = 'temp_audio.wav'; // Temporary file path
    await fs.promises.writeFile(tempFilePath, Buffer.from(base64Audio, 'base64'));

    // Use fluent-ffmpeg to convert the audio file
    ffmpeg(tempFilePath)
        .inputFormat('wav') // Specify the input format
        .output(outputPath) // Specify the output path
        .on('end', () => {
            console.log('Audio conversion successful!');
            // Optionally, you can delete the temporary file
            fs.unlinkSync(tempFilePath);
        })
        .on('error', (err) => {
            console.error('Error during audio conversion:', err);
            // Optionally, you can delete the temporary file
            fs.unlinkSync(tempFilePath);
        })
        .run();
}

const outputPath = 'output_audio.mp3'; // Output file path

convertBase64ToAudio(base64Audio, outputPath);
