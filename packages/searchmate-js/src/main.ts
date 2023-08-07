import { searchmate } from "./searchmate";
import "./style.css";
import { createElement } from "./util";

const app = document.getElementById("app");
const button = document.createElement("button");
button.textContent = "search";
app?.appendChild(button);
const appId = import.meta.env.VITE_PUBLIC_APP_ID;

const container = document.createElement("div");

container.id = "searchmate-container";
app?.appendChild(container);

button.addEventListener("click", () => {
  searchmate({
    appId: appId,
    urlPrefix: "https://tailwindcss.com/docs",
    onClose: () => {
      console.log("Closed");
    },
    // overrideNavigateToResult(path, withCtrl) {
    //   console.log(path, withCtrl);
    // },
  });
});

let theme: string | null;
if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
  theme = localStorage.getItem("theme");
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  theme = "dark";
} else {
  theme = "light";
}

if (theme !== undefined) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.remove("theme-dark");
  } else {
    root.classList.add("theme-dark");
  }
}

window.addEventListener("storage", () => {
  console.log("Hola");
  if (localStorage.getItem("theme") !== theme) {
    window.location.reload();
  }
});

const themeButton = createElement("button");

themeButton.textContent = "Toggle theme";
themeButton.addEventListener("click", () => {
  const root = document.documentElement;
  if (theme === "light") {
    localStorage.setItem("theme", "dark");
    theme = "dark";

    root.classList.add("theme-dark");
  } else {
    localStorage.setItem("theme", "light");
    theme = "light";

    root.classList.remove("theme-dark");
  }
});

app?.appendChild(themeButton);
