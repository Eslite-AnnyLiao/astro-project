import { emptyReplace } from '@/shared/helpers/data-process';
import { formatImagePath } from '@/shared/helpers/image-formatter';
import { formatDiscountRange } from '@/shared/helpers/filter/discount';
import { yesNoEnum } from '@/shared/constants/common/enums';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface RawProduct {
  product_guid?: string;
  eslite_sn?: string;
  image?: string;
  name?: string;
  title?: string;
  final_price?: number;
  retail_price?: number;
  product_link?: string;
  range?: number;
  restricted?: string | boolean;
  is_ebook?: boolean;
  author?: string;
  short_description?: string;
  preorder?: boolean;
  [key: string]: any; // 允許其他欄位
}

interface FormattedProduct {
  id: string;
  esliteSN: string;
  image: string;
  name: string;
  title: string;
  alt: string;
  origin: number | undefined;
  price: number | undefined;
  url: string;
  discount: string;
  isAdult: boolean;
  isEbook: boolean;
  [key: string]: any; // 允許動態新增欄位
}

function isSameDomain(link: string): boolean {
  return link.indexOf(import.meta.env.PUBLIC_BASE_URL) === 0;
}

function formatProductLink({
  guid,
  link,
  useDefaultLink,
}: {
  guid: string;
  link: string;
  useDefaultLink: boolean;
}): string {
  const defaultUrl = `/product/${guid}`;
  if (!link || useDefaultLink) return defaultUrl;
  // 站外連結
  if (!isSameDomain(link)) return link;
  // 站內連結
  return link.replace(import.meta.env.PUBLIC_BASE_URL, '');
}

export const productFormatterBase = (product: RawProduct, useDefaultLink: boolean = false): FormattedProduct => {
  const productImage = emptyReplace(product.image ?? '', '');
  return {
    id: emptyReplace(product.product_guid ?? '', ''),
    esliteSN: emptyReplace(product.eslite_sn ?? '', ''),
    image: formatImagePath(productImage),
    name: emptyReplace(product.name ?? '', ''),
    title: emptyReplace(product.title ?? '', ''),
    alt: emptyReplace(product.name ?? '', ''),
    origin: product.final_price,
    price: product.retail_price,
    url: formatProductLink({ guid: product.product_guid || '', link: product.product_link || '', useDefaultLink }),
    discount: formatDiscountRange(product.range || 0),
    isAdult: product.restricted === yesNoEnum.yes || product.restricted === true,
    isEbook: emptyReplace(product.is_ebook ?? false, false),
  };
};

export const extraFieldEnum = {
  author: 'author',
  detail: 'detail',
  preorder: 'preorder',
} as const;

export const extraFieldFormatter: Record<string, (product: RawProduct) => any> = {
  [extraFieldEnum.author]: (product: RawProduct) => emptyReplace(product.author ?? '', ''),
  [extraFieldEnum.detail]: (product: RawProduct) => emptyReplace(product.short_description ?? '', ''),
  [extraFieldEnum.preorder]: (product: RawProduct) => emptyReplace(product.preorder ?? false, false),
};

export const productFormatterMaker =
  ({ extraFields, useDefaultLink = false }: { extraFields: string[]; useDefaultLink?: boolean }) =>
  (product: RawProduct): FormattedProduct => {
    const formatted = productFormatterBase(product, useDefaultLink);
    extraFields.forEach((key) => (formatted[key] = extraFieldFormatter[key](product)));
    return formatted;
  };
