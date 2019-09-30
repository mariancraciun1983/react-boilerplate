/* eslint-disable no-bitwise */
let dict = {};
let lang = 'en';

export function hashCode(text) {
  let hash = 0;
  if (text.length === 0) return hash;
  for (let i = 0; i < text.length; i += 1) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash;
  }
  return hash;
}

export function generateKey(text) {
  if (text.length > 16) { return text.substr(0, 16) + hashCode(text); }
  return text;
}

export const updateLang = (_lang, _dict) => {
  dict = _dict;
  lang = _lang;
};

export const getLang = () => lang;

export const getLangDict = () => dict;

export const getText = (text) => {
  if (lang === 'en') return text;

  const key = generateKey(text);
  if (Object.prototype.hasOwnProperty.call(dict, key)) {
    return dict[key];
  }
  return text;
};
