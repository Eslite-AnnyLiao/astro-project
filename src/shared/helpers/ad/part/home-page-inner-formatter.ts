import { map } from 'ramda';
import { adTypeEnum } from '@/shared/constants/ad/ad-type';
import { emptyReplace } from '@/shared/helpers/data-process';
import { extraFieldEnum, productFormatterMaker } from '@/shared/helpers/product-formatter';
import { formatImagePath } from '@/shared/helpers/image-formatter';
import { normalizeUrl } from '@/shared/helpers/url/url-common';

const { PUBLIC_BASE_URL: baseUrl } = import.meta.env;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface RawAd {
  page?: string;
  banner_type?: string;
  blank?: boolean;
  alt?: string;
  title?: string;
  name?: string;
  img_url?: string;
  link?: string;
  sort?: number;
  product_guid?: string;
  eslite_sn?: string;
  image?: string;
  preorder?: boolean;
  short_description?: string;
  description?: string;
  author?: string;
  restricted?: boolean;
  product_link?: string;
  items?: RawBannerItem[];
  products?: any[];
  keywords?: Record<string, RawKeyword>;
  [key: string]: any; // 允許其他欄位
}

interface RawBannerItem {
  alt?: string;
  link?: string;
  sort?: number;
  image?: string;
  title_1?: string;
  title_2?: string;
  [key: string]: any;
}

interface RawKeyword {
  link?: string;
  text?: string;
  [key: string]: any;
}

interface BasicField {
  page: string;
  type: string;
  blank: boolean;
}

interface BasicBanner {
  alt: string;
  title: string;
  image: string;
  link: string;
  sort: number;
}

interface BasicProduct {
  id: string | undefined;
  esliteSN: string | undefined;
  title: string;
  name: string;
  image: string;
  preorder: boolean;
  description: string;
  author: string;
  restricted: boolean;
  link: string;
}

interface FormattedBannerItem {
  alt: string;
  link: string;
  position: number;
  image: string;
  title: string;
  subtitle: string;
}

interface ThreadBannerSmall {
  blank: boolean;
  items: FormattedBannerItem[];
}

interface FormattedKeyword {
  link: string;
  text: string;
}

interface ThreadKeywords {
  blank: boolean;
  keywords: FormattedKeyword[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ThreadProducts {
  blank: boolean;
  products: any[];
}

export const homePageBasicFieldFormatter = (ad: RawAd): BasicField => ({
  page: emptyReplace(ad.page ?? adTypeEnum.home, adTypeEnum.home),
  type: emptyReplace(ad.banner_type ?? '', ''),
  blank: emptyReplace(ad.blank ?? false, false),
});

/** 預設 banner 結構 */
export const homePage2024BasicBannerFormatter = (ad: RawAd): BasicBanner => ({
  alt: emptyReplace(ad.alt ?? '', ''),
  title: emptyReplace((ad.title || ad.name) ?? '', ''),
  image: formatImagePath(emptyReplace(ad.img_url ?? '', '')),
  link: normalizeUrl(ad.link || '', baseUrl, '#'),
  sort: emptyReplace(ad.sort ?? 99, 99),
});

/** 預設 product 結構 */
export const homePage2024BasicProductFormatter = (ad: RawAd): BasicProduct => ({
  id: ad.product_guid,
  esliteSN: ad.eslite_sn,
  title: emptyReplace(ad.title ?? '', ''),
  name: emptyReplace(ad.name ?? '', ''),
  image: emptyReplace(ad.image ?? '', ''),
  preorder: emptyReplace(ad.preorder ?? false, false),
  description: emptyReplace((ad.short_description || ad.description) ?? '', ''),
  author: emptyReplace(ad.author ?? '', ''),
  restricted: emptyReplace(ad.restricted ?? false, false),
  link: normalizeUrl(ad.product_link || '', baseUrl, '#'),
});

export const formatThreadBannerSmall = (ad: RawAd): ThreadBannerSmall => ({
  blank: emptyReplace(ad.blank ?? false, false),
  items: map(
    (item: RawBannerItem): FormattedBannerItem => ({
      alt: emptyReplace(item.alt ?? '', ''),
      link: normalizeUrl(item.link || '', baseUrl, '#'),
      position: emptyReplace(item.sort ?? 99, 99),
      image: emptyReplace(item.image ?? '', ''),
      title: emptyReplace(item.title_1 ?? '', ''),
      subtitle: emptyReplace(item.title_2 ?? '', ''),
    }),
    emptyReplace(ad.items ?? [], []),
  ),
});

export const formatThreadProducts = (ad: RawAd): ThreadProducts => {
  const productFormatter = productFormatterMaker({ extraFields: [extraFieldEnum.preorder] });
  return {
    blank: emptyReplace(ad.blank ?? false, false),
    products: map(productFormatter, emptyReplace(ad.products ?? [], [])),
  };
};

export const formatThreadKeywords = (ad: RawAd): ThreadKeywords => ({
  blank: emptyReplace(ad.blank ?? false, false),
  keywords: map(
    (keyword: RawKeyword): FormattedKeyword => ({
      link: normalizeUrl(keyword.link || '', baseUrl, '#'),
      text: emptyReplace(keyword.text ?? '', ''),
    }),
    emptyReplace(Object.values(ad.keywords || {}) ?? [], []),
  ),
});
