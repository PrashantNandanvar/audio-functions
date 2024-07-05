// https://api.deepgram.com/v1/listen?utterances=true&diarize=true&punctuate=true&model=nova-2
const axios = require('axios');
const WebSocket = require('ws');

(async() => {
    console.log('calling web');
    const ws = new WebSocket('wss://api.deepgram.com/v1/listen', {
        headers: {
          // Remember to replace the YOUR_DEEPGRAM_API_KEY placeholder with your Deepgram API Key
          Authorization: 'Token 5592ebd0ea1b0068b531ac1cc916a19549d49b15',
        },
    });
    // For security reasons, browser-based WebSocket libraries only allow access to HTTP header information for successful WebSocket connections
    // If the request is successful, return the HTTP header that contains the request ID
    // ws.on('upgrade', function message(data) {
    //     console.log(data.headers['dg-request-id']);
    // });
    ws.on('open',async()=>{
        const options = {
            method: 'POST',
            url: 'https://api.deepgram.com/v1/listen?model=nova-2',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'Token 0b346fbeee47c45f80eb8db0ad880273c728d776'
            },
            data: {url: 'https://adviser-copilot.s3.eu-west-2.amazonaws.com/AudioFiles//custom_interview_speech-analytics.wav'}
          };
          // getting transcripted text for audio recording
          let result = await axios.request(options);
          console.log(result);
    })
})();