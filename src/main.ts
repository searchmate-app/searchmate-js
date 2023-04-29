import { searchmate } from "./searchmate";
import "./searchmate.css";
import "./style.css";

const app = document.getElementById("app");
const button = document.createElement("button");
button.textContent = "search"
app?.appendChild(button);
const appId = import.meta.env.VITE_PUBLIC_APP_ID

const container = document.createElement("div");

container.id = "searchmate-container";
app?.appendChild(container);

button.addEventListener("click", () => {
  searchmate({
    container: "#searchmate-container",
    appId: appId,
  });
});
