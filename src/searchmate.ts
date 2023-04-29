import { QUERY_URL } from "./consts";
import { getResultHTML, removeSelectedIndex, setSelectedIndex } from "./html";
import { searchSvgIcon } from "./icons";
import { Result, SearchMateProps } from "./types";
import { createElementAndAppend } from "./util";
import debounce from "just-debounce-it";

export function searchmate({ container, appId }: SearchMateProps) {
  const containerEl = document.querySelector(container);
  if (!containerEl) {
    throw new Error(`Container element not found: ${container}`);
  }

  const backgroundEl = createElementAndAppend("div", containerEl, [
    "searchmate-container",
  ]);

  backgroundEl.addEventListener("click", (e) => {
    if (e.target === backgroundEl) backgroundEl.remove();
  });

  const searchContainer = createElementAndAppend("div", backgroundEl, [
    "searchmate-search-container",
  ]);

  const inputContainer = createElementAndAppend("div", searchContainer, [
    "searchmate-input-container",
  ]);
  inputContainer.innerHTML += searchSvgIcon;
  const searchInput = createElementAndAppend("input", inputContainer, [
    "searchmate-search-input",
  ]);
  searchInput.setAttribute("placeholder", "Type to search...");

  const resultContainer = createElementAndAppend("div", searchContainer, [
    "searchmate-results-container",
  ]);

  let selectedResultIndex = 0;

  function fetchResults({ query, appId }: { query: string; appId: string }) {
    if (query.length <= 0) return;
    const url = new URL(QUERY_URL);
    url.searchParams.set("query", query);
    url.searchParams.set("appId", appId);
    fetch(url)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      })
      .then((data) => {
        resultContainer.innerHTML = "";
        selectedResultIndex = 0;
        const results = data.results as Result[];
        if (results.length <= 0) return;
        results.forEach((result) => {
          const resultEl = getResultHTML(result, query);
          resultContainer.appendChild(resultEl);
        });
        setSelectedIndex(selectedResultIndex, resultContainer);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const debouncedFetchResults = debounce(fetchResults, 300);

  searchInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    // @ts-ignore
    debouncedFetchResults({ appId: appId, query: target.value });
  });

  function handleKeyboardEvent(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const { end } = setSelectedIndex(
        selectedResultIndex + 1,
        resultContainer,
      );
      console.log(end);
      if (!end) {
        removeSelectedIndex(selectedResultIndex, resultContainer);
        selectedResultIndex += 1;
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (selectedResultIndex <= 0) return;
      removeSelectedIndex(selectedResultIndex, resultContainer);
      selectedResultIndex -= 1;
      setSelectedIndex(selectedResultIndex, resultContainer);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Enter");
    }
  }

  // Event listener for input focus
  searchInput.addEventListener("focus", () => {
    document.addEventListener("keydown", handleKeyboardEvent);
  });

  // Event listener for input blur
  searchInput.addEventListener("blur", () => {
    document.removeEventListener("keydown", handleKeyboardEvent);
  });

  searchInput.focus();
}
