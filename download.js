const ytdl = require('@distube/ytdl-core');
const fs = require('fs');

const url = 'https://youtu.be/0GdvTMoMiS8?si=Da0fL5DfXsmF4pjp';
const output = 'public/cancion.mp3';

console.log('Downloading...');
ytdl(url, { filter: 'audioonly' })
  .pipe(fs.createWriteStream(output))
  .on('finish', () => {
    console.log('Download complete!');
  })
  .on('error', (err) => {
    console.error('Error:', err);
  });
