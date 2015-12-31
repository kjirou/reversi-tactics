export const within = (num, minNum, maxNum) => {
  return Math.min(Math.max(num, minNum), maxNum);
};

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
