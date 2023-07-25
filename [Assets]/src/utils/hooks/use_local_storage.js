import React from 'react';

class Obfuscator {
  constructor(value) {
    this.value = value;
  }

  static SALT = "db8e1af0cb3aca1ae2d0018624204529";
  static KEYWORD = "01003dd0b1d609d5afd44069414fb463";
  static of(value) {
    return new Obfuscator(value);
  }

  applySalt(isEncoding) {
    if (isEncoding) {
      this.value = this.value + Obfuscator.SALT;
    } else {
      if (this.value.substr(-Obfuscator.SALT.length) === Obfuscator.SALT) {
        this.value = this.value.substr(0, this.value.length - Obfuscator.SALT.length);
      } else {
        console.warn("Invalid salt in the string", this.value);
      }
    }
    return this;
  }

  shiftChar(c, key, isEncoding) {
    if (!c.match(/[a-z]/i)) return c;
  
    let shift = isEncoding ? key : -key;
    let base = c.charCodeAt(0) < 96 ? 65 : 97;
    let diff = c.charCodeAt(0) - base; // difference from the base character
    return String.fromCharCode(((diff + shift + 26) % 26) + base);
  }

  applyCipher(isEncoding) {
    let output = '';
    for (let i = 0; i < this.value.length; i++) {
      let key = Obfuscator.KEYWORD.charCodeAt(i % Obfuscator.KEYWORD.length) - 65; 
      output += this.shiftChar(this.value[i], key, isEncoding);
    }
    this.value = output;
    return this;
  }

  btoa() {
    this.value = btoa(this.value);
    return this;
  }

  atob() {
    this.value = atob(this.value);
    return this;
  }

  build() {
    return this.value;
  }
}

function obfuscate(value) {
  return Obfuscator.of(value).applyCipher(true).btoa().applySalt(true).build();
}

function deobfuscate(value) {
  return Obfuscator.of(value).applySalt(false).atob().applyCipher(false).build();
}

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

export {
  useLocalStorage,
};
