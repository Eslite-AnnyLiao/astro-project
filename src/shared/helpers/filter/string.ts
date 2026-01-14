/**
 * 下底線轉小駝峰
 * @param name - 要轉換的字串
 * @returns 小駝峰字串
 */
export const toHump = (name: string): string => name.replace(/_(\w)/g, (_match: string, $1: string) => `${$1.toUpperCase()}`);

/**
 * dash 轉小駝峰
 * @param name - 要轉換的字串
 * @returns 小駝峰字串
 */
export const cebabToHump = (name: string): string => name.replace(/-(\w)/g, (_match: string, $1: string) => `${$1.toUpperCase()}`);

/**
 * 下底線轉大駝峰
 * @param name - 要轉換的字串
 * @returns 大駝峰字串
 */
export const toCamel = (name: string): string => toHump(name).replace(/[a-z]{1}/, (s: string) => s.toUpperCase());

/**
 * 駝峰轉下底線
 * @param name - 駝峰字串
 * @returns 下底線字串
 */
export const toLine = (name: string): string => name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

/**
 * 將首字母轉為小寫
 * @param name - 要轉換的字串
 * @returns 首字母小寫的字串
 */
export const toLowerCaseFirstChar = (name: string): string => `${name.charAt(0).toLowerCase()}${name.slice(1)}`;

/**
 * 轉換為大駝峰命名
 * @param str - 要轉換的字串
 * @returns 大駝峰字串
 */
export const toCamelCase = (str = ''): string =>
  str
    .toString()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, index: number) => (index === 0 ? match.toUpperCase() : match.toUpperCase()))
    .replace(/\s+/g, '');

/**
 * 字串擷取 (中英文混用)
 * @param str - 字串
 * @param len - 權重長度 (中文權重 2, 英數 1)
 * @returns 擷取後的字串
 */
export const formatStrLimit = function (str = '', len = 10): string {
  let newstr = '';
  let num = 0;
  if (str === '') return str;

  str.split('').some((v, i) => {
    num += /^[\u4e00-\u9fa5\u3400-\u4DBF]+$/i.test(v) ? 2 : 1;
    const lmt = num === len ? i + 1 : i;
    if (num === len || num > len) {
      newstr = str.substring(0, lmt);
      return true;
    }
    newstr = str;

    return false;
  });
  return newstr;
};

/**
 * 左側補0
 * @param length - 補0長度
 * @param str - 補0字串
 * @returns 補0後的字串
 */
export const padLeftZero = (length = 3, str = ''): string => (String(str).length >= length ? str : padLeftZero(length, `0${str}`));

/**
 * Storage value decoder.
 * @param value - The encoded value.
 * @returns 解碼後的值
 */
export const decode = (value: string): string | number | object | null => {
  if (!value) return null;
  const decodedValue = decodeURIComponent(value);
  try {
    return JSON.parse(decodedValue);
  } catch (e) {
    return decodedValue;
  }
};

/**
 * Storage value encoder.
 * @param value - 要編碼的值
 * @returns 編碼後的字串
 */
export const encode = (value: unknown): string => {
  if (value === undefined || value === null) return 'undefined';

  if (value instanceof Number || typeof value === 'number') {
    return value.toString();
  }
  if (value instanceof String || typeof value === 'string') {
    return encodeURIComponent(value as string);
  }
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
    return encodeURIComponent(JSON.stringify(value));
  }

  return encodeURIComponent(String(value));
};
