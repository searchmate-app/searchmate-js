import { DocContent } from "./types";

export function debounce(
  fn: any,
  delay: number,
  atStart?: number,
  guarantee?: number
) {
  let timeout: any;
  let args: any;
  let self: any;

  return function debounced() {
    //@ts-ignore
    self = this;
    args = Array.prototype.slice.call(arguments);

    if (timeout && (atStart || guarantee)) {
      return;
    } else if (!atStart) {
      clear();

      timeout = setTimeout(run, delay);
      return timeout;
    }

    timeout = setTimeout(clear, delay);
    fn.apply(self, args);

    function run() {
      clear();
      fn.apply(self, args);
    }

    function clear() {
      clearTimeout(timeout);
      timeout = null;
    }
  };
}

export function createElementAndAppend(
  tag: string,
  appendTo: Element,
  className: [string]
) {
  const element = document.createElement(tag);
  element.classList.add(...className);
  appendTo.appendChild(element);
  return element;
}

export function createElement(tag: string, className?: string[]) {
  const element = document.createElement(tag);
  if(!className) return element;
  className.forEach((name) => element.classList.add(name));
  return element;
}

export function parseDocContent(docContent: DocContent[], query: string) {
  const headings = docContent?.filter(
    (child: any) =>
      child?.type === "heading" &&
      child?.content?.toLowerCase()?.includes(query.toLowerCase())
  );

  if (headings.length > 0) return headings;

  const alternativeContent = docContent?.find((child: any) =>
    child?.content?.toLowerCase()?.includes(query.toLowerCase())
  );
  return alternativeContent ? [alternativeContent] : [];
}
