import { checkURL } from "./checkURL";
const SERVER_URL = `https://api.meaningcloud.com/sentiment-2.1`;
import axios from "axios";

function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  console.log(checkURL(formText), "@Form Handler");
  // Guard Clause if invalid URL
  if (!checkURL(formText)) return alert("Please enter a valid URL");
  console.log("::: Form Submitted :::");
  axios({
    method: "post",
    url: "http://localhost:8082/evaluate_news",
    data: { url: formText },
  });
  fetch("http://localhost:8082/test")
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById("results").innerHTML = res.message;
    });
}

export { handleSubmit };
