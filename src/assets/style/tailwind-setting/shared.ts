/**
 * 共用常數和工具函數
 * 避免在多個檔案中重複定義
 */

// 統一的基礎字體大小
export const BASE_FONT_SIZE = 16;

/**
 * 統一的 px 轉 rem 函數
 */
export const pxToRem = (px: number): string => `${px / BASE_FONT_SIZE}rem`;

/**
 * 統一的顏色扁平化函數
 */
export const flattenColors = (
  obj: Record<string, string | Record<string, string>>, 
  prefix = ''
): Record<string, string> => {
  const result: Record<string, string> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[`${prefix}${key}`] = value;
    } else if (typeof value === 'object') {
      Object.assign(result, flattenColors(value, `${prefix}${key}-`));
    }
  });
  return result;
};

/**
 * Noto Sans TC 字體配置 (統一字體設定)
 */
export const NOTO_SANS_TC_CONFIG = {
  fontFamily: '"Noto Sans TC"',
  fontStyle: 'normal',
} as const;