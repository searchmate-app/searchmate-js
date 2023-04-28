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
