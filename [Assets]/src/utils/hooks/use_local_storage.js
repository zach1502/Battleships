import React from 'react';
import { obfuscate, deobfuscate } from '../obfuscate';

// Automatically saves and recovers data from local storage
function useLocalStorage(key, initialValue, enableObfuscation = false) {
  const [state, setState] = React.useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue
      ? enableObfuscation
        ? JSON.parse(deobfuscate(storedValue))
        : JSON.parse(storedValue)
      : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(
      key,
      enableObfuscation ? obfuscate(JSON.stringify(state)) : JSON.stringify(state)
    );
  }, [key, state, enableObfuscation]);

  return [state, setState];
}

export default useLocalStorage;