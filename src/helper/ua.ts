import { UAParser } from 'ua-parser-js';
import { botKeywords } from '@/constant/ua';

const parser = new UAParser();

// 針對 iPad Pro 的 user agent 特別處理
const isSpecificiPadPro = () => {
  const ua = navigator.userAgent;
  return ua.includes('Macintosh') && 'ontouchstart' in window; // iPad Pro 使用桌面版的 user agent 但具有觸控能力
};

// 檢查是否為桌面設備
export const isDesktop = () => {
  const deviceType = parser.getDevice().type;

  // 特別處理 iPad Pro
  if (isSpecificiPadPro()) {
    return false; // iPad Pro 應該被判斷為平板
  }

  // 判斷為桌面設備的條件
  return !deviceType || deviceType === 'desktop';
};

// 檢查是否為平板設備
export const isTablet = () => {
  const deviceType = parser.getDevice().type;

  // 特別處理 iPad Pro
  if (isSpecificiPadPro()) {
    return true; // iPad Pro 應該被判斷為平板
  }

  // 判斷為平板設備的條件
  return deviceType === 'tablet';
};

// 檢查是否為手機設備
export const isMobile = () => {
  return parser.getDevice().type === 'mobile';
};

/**
 * 比較兩個版本號的大小
 * @param {string} version1 - 第一個版本號，格式如 "15.2.1"
 * @param {string} version2 - 第二個版本號，格式如 "17.0"
 * @returns {number} 返回值：1(version1 > version2), -1(version1 < version2), 0(相等)
 */
function compareVersion(version1: string, version2: string) {
  // 將版本號按點號分割，並轉換為數字陣列
  const v1 = version1.split('.').map(Number);
  const v2 = version2.split('.').map(Number);

  // 迴圈比較每個版本號段，以較長的陣列長度為準
  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    // 如果某個版本號段不存在，則視為 0
    const a = v1[i] || 0;
    const b = v2[i] || 0;

    // 比較當前版本號段
    if (a > b) return 1; // version1 較新
    if (a < b) return -1; // version1 較舊
    // 如果相等，繼續比較下一段
  }

  // 所有版本號段都相等
  return 0;
}

/**
 * 判斷當前 iOS 版本是否早於指定的目標版本
 * @param {string} targetVersion - 目標版本號，如 "17.0"
 * @returns {boolean} true: 當前版本較舊, false: 當前版本較新或相等，或非 iOS 設備
 */
export function isiOSVersionBefore(targetVersion: string) {
  // 使用 UAParser 取得作業系統資訊
  const os = parser.getOS();

  // 如果不是 iOS 設備，直接返回 false
  if (os.name !== 'iOS') return false;

  // 比較當前 iOS 版本與目標版本
  return compareVersion(os.version as string, targetVersion) < 0;
}

/**
 * 判斷當前瀏覽器是否為 Safari（包括桌面版和行動版）
 * @returns {boolean} true: 是 Safari 瀏覽器, false: 不是 Safari
 */
export function isSafari() {
  const browser = parser.getBrowser();

  // 檢查是否為桌面版 Safari 或行動版 Safari
  return browser.name === 'Safari' || browser.name === 'Mobile Safari';
}

/**
 * 判斷當前環境是否對 Web API 支援有限
 *
 * 支援有限的環境包括：
 * - iOS 17.0 之前的版本（某些現代 Web API 支援不完整）
 * - Safari 瀏覽器（相比 Chrome 等瀏覽器，某些功能支援較晚或有限制）
 *
 * @type {boolean}
 */
export const hasLimitedSupport = isiOSVersionBefore('17.0') || isSafari();

/**
 * isBot
 * @param {string} userAgent
 * @returns
 */
export const isBot = (userAgent: string) => {
  if (!userAgent && typeof window !== 'undefined' && window.navigator) userAgent = window.navigator.userAgent;

  // 網址 query string 帶上 lihgthouse=1 時同等 bot 模式
  if (typeof window !== 'undefined' && window.location.search.includes('lighthouse=1')) return true;

  if (typeof navigator !== 'undefined' && navigator.webdriver) return true;

  // 如果 userAgent 為 undefined，則視為不是 bot
  if (!userAgent) return false;

  // 將關鍵字組合成正則表達式
  const botPattern = botKeywords.map((term) => `\\b${term}\\b`).join('|');

  // 為 'google pagespeed insights' 處理可能的空格變體
  const pageSpeedPattern = '\\bgoogle\\s*page\\s*speed\\s*insights\\b';

  // 為通用 'bot' 添加單詞邊界
  const genericBotPattern = '\\bbot\\b';

  const fullPattern = new RegExp(`${botPattern}|${pageSpeedPattern}|${genericBotPattern}`, 'i');

  // 確保 userAgent 是小寫
  return fullPattern.test(userAgent?.toLowerCase());
};

// 預設匯出所有方法
export default {
  isMobile,
  isTablet,
  isDesktop,
  isBot,
};
