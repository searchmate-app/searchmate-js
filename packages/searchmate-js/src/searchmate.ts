import { QUERY_URL, SELECTED_RESULT_CLASS } from "./consts";
import {
  getNotFoundHTML,
  getResultHTML,
  initialResultsContent,
  removeSelectedIndex,
  searchFooter,
  setSelectedIndex,
  setSelectedIndexWithMouse,
  setSelectedIndexWithTouch,
} from "./html";
import { searchSvgIcon } from "./icons";
import { Result, SearchMateProps } from "./props";
import "./searchmate.css";
import { createElementAndAppend } from "./util";
import A11yDialog from "a11y-dialog";
import debounce from "just-debounce-it";

export function searchmate({
  appId,
  urlPrefix = undefined,
  onClose = undefined,
  overrideNavigateToResult = undefined,
}: SearchMateProps) {
  const foundResults: Result[] = [];
  const containerEl = document.body;

  // comprobe if the container is already there and remove it
  const oldContainer = containerEl.querySelector("#searchmate-docs-search");
  if (oldContainer) {
    return;
  }

  const backgroundEl = createElementAndAppend("div", containerEl, [
    "searchmate-container",
  ]);
  backgroundEl.id = "searchmate-docs-search";
  const dialog = new A11yDialog(backgroundEl);
  dialog.show();

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

  const footer = searchFooter();
  searchContainer.appendChild(footer);

  const initial = initialResultsContent();
  resultContainer.appendChild(initial);

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
        resultContainer.querySelectorAll("a").forEach((a) => {
          a.addEventListener("click", (e) => {
            e.preventDefault();
            if (overrideNavigateToResult) {
              overrideNavigateToResult(a.href, e.ctrlKey);
              close();
            } else {
              if (e.ctrlKey) {
                window.open(a.href, "_blank");
                close();
                return;
              }
              // navigate to the result
              location.href = a.href;
              close();
            }
          });
        });
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
      if (!selectedResult) return;
      if (overrideNavigateToResult) {
        overrideNavigateToResult(selectedResult.href, e.ctrlKey);
        close();
      } else {
        if (e.ctrlKey) {
          window.open(selectedResult.href, "_blank");
          close();
          return;
        }
        selectedResult.click();
        close();
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
    dialog.destroy();
    if (onClose) onClose();
  }

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
      document.removeEventListener("keydown", handleEscape);
    }
  };

  // add event listener for escape
  document.addEventListener("keydown", handleEscape);

  backgroundEl.addEventListener("click", (e) => {
    if (e.target === backgroundEl) {
      close();
    }
  });

  searchInput.focus();
}
