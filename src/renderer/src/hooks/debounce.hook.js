export function useDebounce(f, delay = 300) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      f(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}
