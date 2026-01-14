import { isEmptyValue } from '@/shared/helpers/data-process';

export function formatImagePath(
  imgPath: string,
  baseURL: string = import.meta.env.PUBLIC_SOURCE_PIC as string,
): string {
  if (isEmptyValue(imgPath)) return '';
  if (/^http/.test(imgPath)) return imgPath;
  const INDEX_AD_PATH = import.meta.env.PUBLIC_INDEX_AD_PATH as string;
  // 若是 index_ad, index_slot, index_campaign 開頭則 baseURL 要替換
  const isIndexAd = imgPath.substring(0, 8) === 'index_ad';
  const isIndexSlot = imgPath.substring(0, 10) === 'index_slot';
  const isIndexCampaign = !!imgPath.match(/^index_campaign/);
  const path = isIndexAd || isIndexSlot || isIndexCampaign ? INDEX_AD_PATH : baseURL;
  // 若開頭非 "http" 但也不是 "/" 時補上 "/"
  const mark = !isIndexAd && !isIndexSlot && imgPath.substring(0, 1) === '/' ? '' : '/';

  // fake image
  if (imgPath.includes('fake-images')) return imgPath;

  return `${path}${mark}${imgPath}`;
}
