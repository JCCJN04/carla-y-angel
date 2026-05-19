const fs = require('fs');
const https = require('https');

async function download() {
    const url = 'https://www.youtube.com/watch?v=0GdvTMoMiS8';
    
    try {
        console.log('Requesting from cobalt...');
        const res = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({
                url: url,
                isAudioOnly: true,
                aFormat: 'mp3'
            })
        });
        
        const data = await res.json();
        console.log(data);
        
        if (data.status === 'error') {
            console.error('API Error:', data.text);
            return;
        }

        let downloadUrl = data.url;
        if (!downloadUrl) {
            console.error('No download url returned');
            return;
        }

        console.log('Downloading from:', downloadUrl);
        
        const file = fs.createWriteStream('public/cancion.mp3');
        https.get(downloadUrl, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close();  
                console.log('Download complete!');
            });
        }).on('error', function(err) { 
            fs.unlink('public/cancion.mp3'); 
            console.error('Download error:', err.message);
        });

    } catch (err) {
        console.error('Error:', err);
    }
}

download();
