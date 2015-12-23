export const preventDefaultEvent = (event) => {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;  // For IE
  }
};

export const preventEvents = (event) => {
  preventDefaultEvent(event);
  event.stopPropagation();
};

/*
 * Scroll up child element to underline of myself
 *
 * @param {HTMLElement} parentElement
 * @param {HTMLElement} childElement
 */
export const scrollUpToUnderline = (parentElement, childElement) => {
  const parentRect = parentElement.getBoundingClientRect();
  const childRect = childElement.getBoundingClientRect();
  const hiddenHeight = childRect.bottom - parentRect.bottom;
  if (hiddenHeight <= 0) {
    return;
  }
  parentElement.scrollTop += hiddenHeight;
};
