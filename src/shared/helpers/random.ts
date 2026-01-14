/**
 * 範圍亂數 (Cryptographically Secure)
 * 使用 Web Crypto API 的 `crypto.getRandomValues()` 產生一個密碼學安全的範圍亂數。
 * 這個版本可以安全地用於所有場景，包含安全性相關的功能。
 * @param {number} max 最大值
 * @param {number} min 最小值
 * @return {number} 一個介於 min 和 max 之間（包含兩者）的密碼學安全亂數。
 */
export const random = (max = 10, min = 0) => {
  const range = max - min + 1;

  // 處理範圍為 1 的情況
  if (range <= 1 && Number.isInteger(min)) {
    return min;
  }

  // 確定表示範圍所需的字節數
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  // 避免 requestBytes 為 0
  if (bytesNeeded === 0) {
    return min;
  }

  const maxNum = 256 ** bytesNeeded;
  const randomBytes = new Uint8Array(bytesNeeded);

  let randomValue;
  do {
    crypto.getRandomValues(randomBytes);
    // 將字節轉換為數字
    randomValue = 0;
    for (let i = 0; i < bytesNeeded; i += 1) {
      randomValue = randomValue * 256 + randomBytes[i];
    }
  } while (randomValue >= maxNum - (maxNum % range)); // 透過拒絕抽樣來避免模數偏差

  return min + (randomValue % range);
};

/**
 * 隨機產生順序陣列
 * @param {number} start 起始值
 * @param {number} stop 結束值
 * @param {number} step 遞增值
 * @returns {number[]} 產生的陣列組
 * @example rangeArray(1, 10, 2) => [1, 3, 5, 7, 9]
 * @example rangeArray('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1)
 *            .map(x => String.fromCharCode(x));
 * // => ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
 */
export const rangeArray = (start = 0, stop = 10, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

/**
 * 隨機長度陣列
 * @param {number} length 陣列長度
 * @param {number} max 陣列內亂數數值最大值
 * @return {number[]} 隨機陣列
 */
export const randomArray = (length = 10, max = 10) => Array.from({ length }, () => random(max));

/**
 * 建立陣列資料（用於機率）
 * ex. generateBaseArray('a', 3) -> ['a','a','a']
 * 百分之20% = 100個陣列裡面有 20 個指定資料
 * @param content
 * @param length
 * @returns {*[]}
 */
export const generateBaseArray = (content: string, length: number) => {
  const array = [];
  let step;
  for (step = 0; step < length; step += 1) {
    array.push(content);
  }
  return array;
};

/**
 * get random select item in array
 * @param {array} array
 * @returns {*} a random item from the array
 */
export const randomSelectItem = (array: []) => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  const index = random(array.length - 1, 0);
  return array[index];
};
