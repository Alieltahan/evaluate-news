var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const cors = require("cors");
const bodyParser = require("body-parser");
// axios.<method> will now provide autocomplete and parameter typings
const axios = require("axios").default;
const dotenv = require("dotenv");

dotenv.config();

// console.log("Your Key is " + process.env.API_KEY);
const MC_URL_KEY_LANG = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en`;

const app = express();
// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/evaluate_news", evaluateNews);

async function evaluateNews(req, res) {
  const queryURL = MC_URL_KEY_LANG + "&url=" + req.body.data;
  try {
    const response = await axios(queryURL);
    const {
      score_tag,
      agreement,
      subjectivity,
      confidence,
      irony,
      sentence_list,
    } = response.data;
    res.send({
      score: score_tag,
      agreement,
      subjectivity,
      confidence,
      irony,
      text: sentence_list[0].text,
    });
  } catch (err) {
    console.log("ERR ===>✨✨✨", err.message);
    res.send("Please ensure sending a correct URL Article");
  }
}

// designates what port the app will listen to for incoming requests
const server = app.listen(8082, function () {
  console.log("Example app listening on port 8082!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

module.exports = server;
