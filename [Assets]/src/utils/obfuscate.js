const KEYS = [
  0x78f, 0x6a3, 0xa75, 0x8fc, 0x720, 0x637,
  0x1d9, 0x671, 0xaaf, 0x73a, 0x396, 0xf65,
  0xea3, 0x393, 0x3f4, 0x97a, 0x43a, 0x681,
  0x3a9, 0x429, 0x4ac, 0xe1f, 0xb72, 0x7d9,
  0x854, 0x939, 0xc48, 0xf3b, 0x9e5, 0x6d7,
  0x2a1, 0x3f6, 0xb9b, 0xc07, 0x78d, 0x9a7,
];

const xorCipher = (str) => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ KEYS[i % KEYS.length]);
  }
  return result;
};

const obfuscate = (str) => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += (str.charCodeAt(i) + (i << 2)) + '-';
  }
  result = result.slice(0, -1);
  result = xorCipher(result);

  return result;
};

const deobfuscate = (str) => {
  str = xorCipher(str);

  let result = '';
  const codeArray = str.split('-');
  for (let i = 0; i < codeArray.length; i++) {
    result += String.fromCharCode(codeArray[i] - (i << 2));
  }
  return result;
};

export {
  obfuscate,
  deobfuscate,
};
