import { esliteOrigin, productPathRegex, eventsEsliteLinkRegex } from '@/shared/constants/path-regex';

interface UrlPart {
  origin: string;
  pathname: string;
  searchParams: URLSearchParams | string;
  hash: string;
}

function trimPath(path: string): string {
  if (path === '/') return path;
  return path.replace(/\/$/, '');
}

export function getUrlPart(link: string): UrlPart {
  const emptyLink: UrlPart = { origin: '', pathname: '', searchParams: '', hash: '' };
  try {
    const { origin, pathname, searchParams, hash } = new URL(link);
    return { origin, pathname: trimPath(pathname), searchParams, hash };
  } catch {
    return emptyLink;
  }
}

export function composeUrlPart({
  origin,
  pathname,
  searchParams,
  hash = null,
}: {
  origin: string;
  pathname: string;
  searchParams: URLSearchParams;
  hash: string | null;
}): string {
  if (!origin) return `${pathname}?${searchParams.toString()}${hash}`;
  return `${origin}${pathname}?${searchParams.toString()}${hash}`;
}

export function checkEsliteOrigin(origin: string): boolean {
  return origin === import.meta.env.PUBLIC_BASE_URL || origin === esliteOrigin;
}

function checkEsliteOriginByLink(link: string): boolean {
  const { origin } = getUrlPart(link);
  return checkEsliteOrigin(origin);
}

export function checkEsliteProductLink(link: string): boolean {
  const { origin } = getUrlPart(link);
  if (!checkEsliteOrigin(origin)) return false;
  const fullPath = link.split(origin)[1];
  return productPathRegex.test(fullPath);
}

export function checkEsliteOrEventLink(link: string): boolean {
  return checkEsliteOriginByLink(link) || eventsEsliteLinkRegex.test(link);
}

/**
 * 將網址根據條件轉換為相對路徑或保留絕對路徑
 * @param url - 要處理的網址
 * @param currentDomain - domain
 * @param defaultValue - 若 url 為空值時的預設值
 * @returns 處理後的網址
 */
export const normalizeUrl = (url: string, currentDomain: string, defaultValue: string = '#'): string => {
  if (!url || typeof url !== 'string') return defaultValue;

  // 去除前後空白
  const trimmedUrl = url.trim();

  // 若為相對路徑（不含 http/https，開頭不是 //）
  if (!/^https?:\/\//i.test(trimmedUrl) && !/^\/\//.test(trimmedUrl)) return trimmedUrl;

  // 建立 URL 物件
  try {
    const inputUrl = new URL(trimmedUrl);
    const currentUrl = new URL(currentDomain);

    // 判斷是否為同一個 domain
    if (
      inputUrl.protocol === currentUrl.protocol &&
      inputUrl.hostname === currentUrl.hostname &&
      inputUrl.port === currentUrl.port
    ) {
      return inputUrl.pathname + inputUrl.search + inputUrl.hash;
    }
    return trimmedUrl; // 外部連結，維持原樣
  } catch (e) {
    // 無法建立 URL（可能是無效字串），回傳預設值
    return defaultValue;
  }
};
