import { QUERY_URL } from "./consts";
import { searchSvgIcon } from "./icons";
import { SearchMateProps } from "./types";
import { createElementAndAppend, debounce } from "./util";

export function searchmate({ container, appId }: SearchMateProps) {
  const containerEl = document.querySelector(container);
  if (!containerEl) {
    throw new Error(`Container element not found: ${container}`);
  }

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
        console.log(data)
        // results.length = 0;
        // results.push(...data.results);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const debouncedFetchResults = debounce(fetchResults, 300);

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
  searchInput.focus();

  searchInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    // @ts-ignore
    debouncedFetchResults({ appId: appId, query: target.value });
  });

  createElementAndAppend("div", searchContainer, [
    "searchmate-results-container",
  ]);
}
