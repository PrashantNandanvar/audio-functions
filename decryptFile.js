const fs = require('fs');
const CryptoJS = require('crypto-js');

function decryptFile(inputFilePath, outputFilePath, key) {
  // Read the encrypted content from the input file
  const encryptedContent = fs.readFileSync(inputFilePath);

  // Decrypt the content using AES decryption with the provided key
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedContent.toString(), key);
  // Convert the decrypted bytes to a Buffer
  // const decryptedBuffer = Buffer.from(decryptedBytes.toString(CryptoJS.enc.Hex), 'binary');
  console.log(decryptedBytes);

  // Write the decrypted content to the output file
  // fs.writeFileSync(outputFilePath, decryptedBuffer);
  console.log('File decrypted successfully.');
}

const inputFile = './65aa52eeab2f97c139665edd_1711698907084.wav.aes';
const decryptedFile = 'audio_decrypted1.wav';
const encryptionKey = '65aa52eeab2f97c139665edd';

// // Decrypt the encrypted audio file
decryptFile(inputFile, decryptedFile, encryptionKey);

//=======================================================