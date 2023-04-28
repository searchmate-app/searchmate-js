import { SearchMateProps } from "./types";

const searchSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="searchmate-search-icon">
<path strokeLinecap="round" class strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
`;

function createElementAndAppend(
  tag: string,
  appendTo: Element,
  className: [string]
) {
  const element = document.createElement(tag);
  element.classList.add(...className);
  appendTo.appendChild(element);
  return element;
}

export function searchmate({ container }: SearchMateProps) {
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
  searchInput.focus();
}
