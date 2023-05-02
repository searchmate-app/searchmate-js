import { DocContent } from "./props";

export function createElementAndAppend(
  tag: string,
  appendTo: Element,
  className: [string],
) {
  const element = document.createElement(tag);
  className.forEach((name) => element.classList.add(name));
  appendTo.appendChild(element);
  return element;
}

export function createElement(tag: string, className?: string[]) {
  const element = document.createElement(tag);
  if (!className) return element;
  className.forEach((name) => element.classList.add(name));
  return element;
}

export function parseDocContent(docContent: DocContent[], query: string) {
  const headings = docContent?.filter(
    (child) =>
      child?.type === "heading" &&
      child?.content?.toLowerCase()?.includes(query.toLowerCase()),
  );

  if (headings.length > 0) return headings;

  const alternativeContent = docContent?.find((child) =>
    child?.content?.toLowerCase()?.includes(query.toLowerCase()),
  );
  return alternativeContent ? [alternativeContent] : [];
}
