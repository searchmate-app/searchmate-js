import { searchmate } from "./searchmate";
import "./searchmate.css";
import "./style.css"

const app = document.getElementById("app");
const button = document.createElement("button");
button.textContent = "search";
app?.appendChild(button);

const container = document.createElement("div");
container.id = "searchmate-container";
app?.appendChild(container);

button.addEventListener("click", () => {
  searchmate({
    container: "#searchmate-container",
    apiKey: "YOUR_API_KEY",
    appId: "YOUR_APP_ID",
  });
});
