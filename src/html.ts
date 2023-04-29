import { HEADING_TYPE } from "./consts";
import { hashIcon, pathIcon } from "./icons";
import { parser } from "./md-parser";
import { Result } from "./types";
import { createElement, parseDocContent } from "./util";

function createPathElement(path: string) {
  const pathElement = createElement("a", [
    "searchmate-result-part",
    "searchmate-result-path",
  ]);
  const header = createElement("p", ["searchmate-result-path-header"]);
  header.innerHTML += pathIcon;
  const textSpan = createElement("span");
  textSpan.textContent = `/${path}`;
  header.appendChild(textSpan);
  pathElement.appendChild(header);
  pathElement.setAttribute("href", "#");
  return pathElement;
}

function createHeadingElement(headingText: string, _path: string) {
  const anchor = createElement("a", [
    "searchmate-result-part",
    "searchmate-result-heading",
  ]);
  anchor.setAttribute("href", "#");
  anchor.innerHTML += hashIcon;
  anchor.innerHTML += parser.processSync(headingText).value;
  return anchor;
}

function createOtherElement(content: string) {
  const container = createElement("div", [
    "searchmate-result-other",
    "markdown-body",
  ]);
  container.innerHTML += parser.processSync(content).value;
  return container;
}

export function getResultHTML(result: Result, query: string) {
  const parent = createElement("div", ["searchmate-result"]);
  const pathElement = createPathElement(result.path);
  parent.appendChild(pathElement);

  const children = result.content;

  const parsedData = parseDocContent(children, query);

  parsedData.forEach((data) => {
    if (data.type === HEADING_TYPE) {
      const heading = createHeadingElement(data.content, result.path);
      parent.appendChild(heading);
    } else {
      // skip yaml for now, we have to get a way to display it properly
      if (data.type === "yaml") return;
      const other = createOtherElement(data.content);
      pathElement.appendChild(other);
    }
  });

  return parent;
}

export function setSelectedIndex(index: number, resultContainer: HTMLElement) {
  const results = resultContainer.querySelectorAll(".searchmate-result-part");
  const result = results[index];
  if (!result) return { end: true };
  result.classList.add("searchmate-result-selected");
  result.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  return { end: false };
}

export function removeSelectedIndex(
  index: number,
  resultContainer: HTMLElement,
) {
  const results = resultContainer.querySelectorAll(".searchmate-result-part");
  const result = results[index];
  if (!result) return;
  result.classList.remove("searchmate-result-selected");
}
