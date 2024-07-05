// Example filename: index.js
const { createClient, LiveTranscriptionEvents } = require("@deepgram/sdk");
const fetch = require("cross-fetch");

const live = async () => {
  const url = "https://adviser-copilot.s3.eu-west-2.amazonaws.com/AudioFiles//custom_interview_speech-analytics.wav";

  const deepgram = createClient(process.env.DEEPGRAM);

  const connection = deepgram.listen.live({ model: "nova-2", smart_format: true });

  connection.on(LiveTranscriptionEvents.Open, async() => {
    connection.on(LiveTranscriptionEvents.Close, () => {
      console.log("Connection closed.");
    });

    connection.on(LiveTranscriptionEvents.Metadata, (data) => {
      console.log(data);
    });

    connection.on(LiveTranscriptionEvents.Transcript, (data) => {
      console.log(data.channel,'this is called');
    });

    fetch(url)
      .then((r) => r.body)
      .then((res) => {
        res.on("readable", () => {
          connection.send(res.read());
        });
      });
  });
};

live();