const fs = require('fs');
const crypto = require('crypto');

function decryptFile(inputFilePath, outputFilePath, key) {
    const inputStream = fs.createReadStream(inputFilePath);
    const outputStream = fs.createWriteStream(outputFilePath);
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, Buffer.alloc(0));

    inputStream.pipe(decipher).pipe(outputStream);
    console.log('File decrypted successfully.');
}

const inputFile = './65aa52eeab2f97c139665edd_1711960278685.wav.aes';
const decryptedFile = 'decrypted.txt';
const encryptionKey = '11122233344455566677788822244455555555555555555231231321313aaaff'; // 128-bit key (16 bytes)

// Decrypt the encrypted file
decryptFile(inputFile, decryptedFile, encryptionKey);


const moment = require('moment-timezone');

function getFormattedDate(offset = 0) {
    // Get the current date and time
    let currentDate = moment();

    // Add the offset (in minutes) to the current date
    currentDate.add(offset, 'minutes');

    // Format the date in the desired format with the timezone offset
    let isoDate = currentDate.format('YYYY-MM-DDTHH:mm:ssZ');

    return isoDate;
}

// Get current date
let currentISODate = moment().format('YYYY-MM-DDTHH:mm:ssZ');
console.log("Current Date:", currentISODate);

// Get future date (3 minutes ahead)
let futureISODate = moment().add(3, 'minutes').format('YYYY-MM-DDTHH:mm:ssZ');
// console.log("Current Date:", currentISODate);

// // Get future date (1 minute ahead)
// let futureISODate = getFormattedDate(1);
console.log("Future Date:", futureISODate);