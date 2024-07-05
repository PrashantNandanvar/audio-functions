const ffmpeg = require('fluent-ffmpeg');

async function checkFileCorruption(filePath) {
    let check =  await new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                resolve(false);
            } else {
                // Check metadata to determine if the file is valid
                console.log(metadata.format)
                if (metadata.format) {
                    resolve(true); // File is valid
                } else {
                    resolve(false); // File is corrupted or invalid
                }
            }
        });
    });
    console.log(check);
    let ext = filePath.split('.m');
    if(check){
        console.log(ext);
        ffmpeg(filePath)
        .audioCodec('aac')
        .audioBitrate(64)
        .save(ext[0]+'_compressed.m'+ext[1])
        .on('error', function(err) {
          console.error('Error occurred:', err);
        //   return exits.error(err.message)
        })
        .on('end', function() {
            console.log('file compressed');
         })
    }
}

// Example usage
const filePath = './65b0d6031c7e0bee888c4327_audioFile/test_1716287176605_minute1.wav';
checkFileCorruption(filePath)
    .then(isCorrupted => {
        if (isCorrupted) {
            console.log('File is valid.');
        } else {
            console.log('File is corrupted or invalid.');
        }
    })
    .catch(err => {
        console.error('Error checking file corruption:', err);
    });
