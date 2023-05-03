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
