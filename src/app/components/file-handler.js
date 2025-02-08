import fs from 'fs/promises';
import path from 'path';

export default async function fileOperations() {
  try {
    fs.accessSync(path.join(process.cwd(), '/public/'), fs.constants.W_OK);
    console.log('Directory is writable'+path.join(process.cwd(), '/public/'));
  } catch (err) {
    console.log('Directory is writable'+path.join(process.cwd(), '/public/'));
    console.error('Directory is not writable:', err);
  }

  try {
    // Define file paths
    const inputFilePath = path.join(process.cwd(), '/public/input.txt');
    const outputFilePath = path.join(process.cwd(), '/public/output.txt');

    // Read from input file
    console.log('Reading from input file...'+inputFilePath);
    const inputData = await fs.readFile(inputFilePath, 'utf8');
    console.log('File contents:', inputData);

    // Process the data (in this example, we'll convert to uppercase)
    const processedData = inputData.toUpperCase();

    // Write processed data to output file
    console.log('Writing processed data to output file...');
    await fs.writeFile(outputFilePath, processedData);

    // Verify the write operation by reading the output file
    const verifyData = await fs.readFile(outputFilePath, 'utf8');
    console.log('Verified output:', verifyData);

    // Append additional information to the output file
    console.log('Appending additional information...');
   // await fs.appendFile(outputFilePath, '\n\nProcessed on: ' + new Date().toISOString());
   await fs.appendFile(outputFilePath);
    console.log('File operations completed successfully!');
  } catch (error) {
    console.error('Error during file operations:', error);
  }
}

// Run the file operations
