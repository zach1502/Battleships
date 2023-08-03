const retrieveFromLocalStorage = (key, fallbackValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : fallbackValue;
};

const storeInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export {
  retrieveFromLocalStorage,
  storeInLocalStorage,
}