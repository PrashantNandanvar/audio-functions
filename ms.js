const fs = require('fs');
const path = require('path');

// Function to concatenate all files in a given directory
const concatenateFilesInDirectory = async (directory, outputFile) => {
  try {
    // Read all files in the directory
    const files = await fs.promises.readdir(directory);
    let fileDataArray = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      try {
        const data = await fs.promises.readFile(filePath);
        fileDataArray.push(data);
      } catch (err) {
        console.error(`Error reading file ${filePath}:`, err);
        throw err;
      }
    }

    const concatenatedData = Buffer.concat(fileDataArray);
    await fs.promises.writeFile(outputFile, concatenatedData);
    console.log(`Files concatenated successfully into ${outputFile}`);
  } catch (err) {
    console.error('Error concatenating files:', err);
  }
};

// Usage
const directory = './downloads';  // Replace with your directory
const outputFile = 'output1234566.wav';
concatenateFilesInDirectory(directory, outputFile);

