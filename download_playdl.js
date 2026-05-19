const play = require('play-dl');
const fs = require('fs');

async function download() {
    const url = 'https://www.youtube.com/watch?v=0GdvTMoMiS8';
    const output = 'public/cancion.mp3';

    try {
        console.log('Fetching stream info...');
        const stream = await play.stream(url);
        
        console.log('Downloading...');
        const writeStream = fs.createWriteStream(output);
        stream.stream.pipe(writeStream);
        
        writeStream.on('finish', () => {
            console.log('Download complete!');
        });
        writeStream.on('error', (err) => {
            console.error('File write error:', err);
        });
    } catch (err) {
        console.error('Error:', err);
    }
}

download();
