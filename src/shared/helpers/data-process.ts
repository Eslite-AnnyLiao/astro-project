import { isNil, isEmpty, filter, forEach, repeat } from 'ramda';
import cloneDeep from 'lodash-es/cloneDeep';
import { random } from '@/shared/helpers/random';

export const isNull = (data: unknown): data is null => data === null;

export const isEmptyString = (data: unknown): data is '' => data === '';

export const isStringNumber = (data: string): boolean => !isNull(data.match(/^\d*$/));

export const isEmptyValue = (data: unknown): boolean => isNil(data) || isEmpty(data);

export const emptyReplace = <T>(value: T, defaultValue: T): T => (isEmptyValue(value) ? defaultValue : value);

export const isFunction = (data: unknown): data is Function => typeof data === 'function';

export const rejectArrayNullItems = <T>(data: readonly T[]): T[] => filter((any: T) => !isNil(any), data) as T[];

export const rejectEmpty = <T>(data: readonly T[]): T[] => filter((any: T) => !isEmptyValue(any), data) as T[];

export const linkTarget = (blank: boolean): '_blank' | '_self' => (blank === true ? '_blank' : '_self');

export const monthsBeforeCurrent = (months: number): Date => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 31 * months);

export const displayDate = (date: Date, join = '/'): string => `${date.getFullYear()}${join}${date.getMonth() + 1}${join}${date.getDate()}`;

export const parseDecimalInt = (numberInString: string): number => parseInt(numberInString, 10) || 0;

export function parseIntBetween({ input, min, max }: { input: string; min: number; max: number }): number {
  const inputNumber = parseDecimalInt(input);
  if (inputNumber < min) return min;
  if (inputNumber > max) return max;
  return inputNumber;
}

export const randomInteger = (excludedMax: number, min = 0): number => random(excludedMax - 1, min);

export const isNumber = (num: unknown): num is number => Number(num) === num;

/**
 * 型別判斷
 * @param val 待確認得值
 * @returns 型別字串(大駝峰)
 */
export const checkType = (val: unknown): string => {
  const match = Object.prototype.toString.call(val).match(/^\[object\s(.*)\]$/);
  return match ? match[1] : 'Unknown';
};

/**
 * get JSON with String
 * @param str JSON String
 * @return json object or null
 */
export const getJSON = (str: string): unknown => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

/**
 * 將指定資料(object)的 keys unset
 * @example removeKeys(response)(['banner_type']);
 */
export const objectRemoveKeys = <T extends Record<string, unknown>>(data: T) =>
  forEach((colKey: string) => {
    delete data[colKey as keyof T];
  });

/**
 * 複製一個無關聯的 JSON
 * @param data JSON 物件
 * @returns new JSON
 */
export const cloneJSON = <T>(data: T): T => cloneDeep(data);

/**
 * 深度凍結物件（防止意外修改常數）
 * @param obj - 要凍結的物件
 * @returns 凍結後的物件
 */
export const deepFreeze = <T extends Record<string, unknown>>(obj: T): T => {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = obj[prop];
    if (value !== null && (typeof value === 'object' || typeof value === 'function') && !Object.isFrozen(value)) {
      deepFreeze(value as Record<string, unknown>);
    }
  });
  return obj;
};

/**
 * 深度克隆物件（用於從凍結常數創建可修改副本）
 * 注意：此函數使用 JSON 序列化，不支援 Date、Function、undefined 等特殊類型
 * @param obj - 要克隆的物件
 * @returns 新的可修改物件
 */
export const deepClone = <T>(obj: T): T => (obj === null || typeof obj !== 'object' ? obj : JSON.parse(JSON.stringify(obj)));

/**
 * 依照 keys 拆分 object
 * @param obj 要拆分的物件
 * @param keys 須要拆分的 keys
 * @returns [object, object]
 */
export const splitObject = <T extends Record<string, unknown>>(obj: T, keys: string[]): [Partial<T>, Partial<T>] =>
  Object.entries(obj).reduce(
    ([obj1, obj2], [key, value]) => (keys.includes(key) ? [{ ...obj1, [key]: value }, obj2] : [obj1, { ...obj2, [key]: value }]),
    [{}, {}] as [Partial<T>, Partial<T>]
  );

/** removeDuplicate array 移除重複 */
export const removeDuplicate = <T>(arr: T[] = []): T[] => Array.from(new Set(arr));

/**
 * 根據參考陣列 referenceArray 過濾陣列 targetArray，移除所有在 referenceArray 中存在的元素
 * @param referenceArray 參考陣列 referenceArray
 * @param targetArray 需要過濾的陣列 targetArray
 * @returns 過濾後的陣列
 */
export const filterArrayByReference = <T>(referenceArray: T[], targetArray: T[]): T[] => {
  // 將參考陣列 A 轉換成 Set 以提升查詢效能
  const referenceSet = new Set(referenceArray);

  // 遍歷目標陣列 B，僅保留不在參考 Set 中的元素
  const filteredArray = targetArray.filter((element: T) => !referenceSet.has(element));

  return filteredArray;
};

export function appendArrayToFixLength<T>({ list, minLength, itemDefaultValue }: { list: T[]; minLength: number; itemDefaultValue: T }): T[] {
  if (!Array.isArray(list)) {
    return repeat(itemDefaultValue, minLength);
  }

  if (list.length >= minLength) {
    return list;
  }

  return [...list, ...repeat(itemDefaultValue, minLength - list.length)];
}
