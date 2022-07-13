const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// setup ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

// setup variables
const input_path = './input';
const output_path = './output';
const output_type = 'webp';

(async function main() {
  try {

    // create necessary folder if not existing
    if (!fs.existsSync(input_path)) await fs.mkdirSync(input_path)
    if (!fs.existsSync(output_path)) await fs.mkdirSync(output_path)

    // delete existing ouputs
    const existingOutputs = await fs.readdirSync(output_path)

    existingOutputs.forEach(filename => fs.unlink(path.join(output_path, filename), ()=>{}))

    // read all inputs
    const inputs = await fs.readdirSync(input_path)

    // begin minify each image file
    inputs.forEach(filename => ffmpeg().input(`${input_path}/${filename}`).saveToFile(`${output_path}/${filename}.${output_type}`))    
  } 
  
  catch (err) { console.error(err); }
})();
