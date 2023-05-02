import {
  CLICKABLE_RESULT_CLASS,
  HEADING_TYPE,
  SELECTED_RESULT_CLASS,
} from "./consts";
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
  const results = resultContainer.querySelectorAll(CLICKABLE_RESULT_CLASS);
  const result = results[index];
  if (!result) return { end: true };
  result.classList.add(SELECTED_RESULT_CLASS);
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
  const results = resultContainer.querySelectorAll(CLICKABLE_RESULT_CLASS);
  const result = results[index];
  if (!result) return;
  result.classList.remove(SELECTED_RESULT_CLASS);
}

export function setSelectedIndexWithMouse(
  event: MouseEvent,
  resultContainer: HTMLElement,
) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const elements = resultContainer.querySelectorAll(CLICKABLE_RESULT_CLASS);

  let newIndex = -1;

  // Iterate through each element and add the selected class if the mouse is over it
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const { top, bottom, left, right } = element.getBoundingClientRect();

    if (
      mouseY >= top &&
      mouseY <= bottom &&
      mouseX >= left &&
      mouseX <= right
    ) {
      newIndex = i;
      element.classList.add(SELECTED_RESULT_CLASS);
    } else {
      elements[i].classList.remove(SELECTED_RESULT_CLASS);
    }
  }

  return newIndex;
}

export function setSelectedIndexWithTouch(
  event: TouchEvent,
  resultContainer: HTMLElement,
) {
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;

  const elements = resultContainer.querySelectorAll(CLICKABLE_RESULT_CLASS);

  let newIndex = -1;

  // Iterate through each element and add the selected class if the mouse is over it
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const { top, bottom, left, right } = element.getBoundingClientRect();

    if (
      touchY >= top &&
      touchY <= bottom &&
      touchX >= left &&
      touchX <= right
    ) {
      newIndex = i;
      element.classList.add(SELECTED_RESULT_CLASS);
    } else {
      elements[i].classList.remove(SELECTED_RESULT_CLASS);
    }
  }

  return newIndex;
}
