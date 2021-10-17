import { checkURL } from "./checkURL";
const axios = require("axios").default;

const formResult = document.getElementById("result");
const postData = async (formText) => {
  try {
    const { data } = await axios.post("http://localhost:8082/evaluate_news", {
      data: formText,
    });
    let innerHTML = `<li id="text"><i>Text</i>: ${data.text}</li>
      <li id="score"><i>Score</i>: ${data.score}</li>
      <li id="agreement"><i>Agreement</i>: ${data.agreement}</li>
      <li id="subjectivity"><i>Subjectivity</i>: ${data.subjectivity}</li>
      <li id="confidence"><i>Confidence</i>: ${data.confidence}</li>
      <li id="irony"><i>Irony</i>: ${data.irony}</li>`;
    // Guard Clause
    if (data.score === undefined && data.text === undefined) {
      innerHTML = `<li class='error' id="text"><i>Error</i>: ${data}</li>`;
      return formResult.insertAdjacentHTML("afterend", innerHTML);
    }
    formResult.insertAdjacentHTML("afterend", innerHTML);
  } catch (err) {
    console.log("Err =>>✨✨", err.message);
  }
};

function handleSubmit(event) {
  event.preventDefault();
  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  // Guard Clause if invalid URL
  if (!checkURL(formText)) return alert("Please enter a valid URL");
  console.log("::: Form Submitted :::");
  // Posting to the Server & Getting the response
  postData(formText);
}

export { handleSubmit };
