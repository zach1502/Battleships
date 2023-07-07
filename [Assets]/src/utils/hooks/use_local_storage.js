import React from 'react';

// Automatically saves and recovers data from local storage
function useLocalStorage(key, initialValue) {
  const [state, setState] = React.useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export {
  useLocalStorage,
};
