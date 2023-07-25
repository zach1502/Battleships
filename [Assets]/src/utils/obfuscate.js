const obfuscate = (str) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += (str.charCodeAt(i) + (i << 2)) + "-";
    }
    return result.slice(0, -1);
};

const deobfuscate = (str) => {
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