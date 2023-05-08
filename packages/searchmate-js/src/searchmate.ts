import { QUERY_URL, SELECTED_RESULT_CLASS } from "./consts";
import {
  getNotFoundHTML,
  getResultHTML,
  removeSelectedIndex,
  setSelectedIndex,
  setSelectedIndexWithMouse,
  setSelectedIndexWithTouch,
} from "./html";
import { searchSvgIcon } from "./icons";
import { Result, SearchMateProps } from "./props";
import "./searchmate.css";
import { createElementAndAppend } from "./util";
import debounce from "just-debounce-it";

export function searchmate({
  appId,
  urlPrefix = undefined,
  onClose = undefined,
}: SearchMateProps) {
  const foundResults: Result[] = [];
  const containerEl = document.body;

  const backgroundEl = createElementAndAppend("div", containerEl, [
    "searchmate-container",
  ]);
  backgroundEl.id = "searchmate-docs-search";

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
        foundResults.length = 0;
        resultContainer.innerHTML = "";
        selectedResultIndex = 0;
        const results = data.results as Result[];
        if (results.length <= 0) {
          const notFound = getNotFoundHTML(query);
          resultContainer.appendChild(notFound);
          return;
        }
        // @ts-ignore
        foundResults.push(results);
        results.forEach((result) => {
          const resultEl = getResultHTML(result, urlPrefix);
          resultContainer.appendChild(resultEl);
        });
        setSelectedIndex(selectedResultIndex, resultContainer);
      })
      .catch((_e) => {});
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
      const selectedResult = resultContainer.querySelector(
        `.${SELECTED_RESULT_CLASS}`,
      ) as HTMLAnchorElement;
      if (selectedResult) {
        if (e.ctrlKey) {
          window.open(selectedResult.href, "_blank");
          return;
        }
        selectedResult.click();
      }
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

  //handle mouse move
  function handleMouseMove(event: MouseEvent) {
    const newIndex = setSelectedIndexWithMouse(event, resultContainer);
    if (newIndex >= 0) selectedResultIndex = newIndex;
  }

  //remove the mousemove event listener when the container is removed
  resultContainer.addEventListener("mousemove", handleMouseMove);

  //add event listener for touch events
  function handleTouchStart(event: TouchEvent) {
    const newIndex = setSelectedIndexWithTouch(event, resultContainer);
    if (newIndex >= 0) selectedResultIndex = newIndex;
  }
  if ("ontouchstart" in window) {
    resultContainer.addEventListener("touchstart", handleTouchStart);
  }

  function close() {
    resultContainer.removeEventListener("mousemove", handleMouseMove);
    if ("ontouchstart" in window) {
      resultContainer.removeEventListener("touchstart", handleTouchStart);
    }
    backgroundEl.remove();
    if (onClose) onClose();
  }

  // add event listener for escape
  searchContainer.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close();
    }
  });

  backgroundEl.addEventListener("click", (e) => {
    if (e.target === backgroundEl) {
      close();
    }
  });

  searchInput.focus();
}
