import { discountTypeEnum } from '@/shared/constants/product';

/**
 * 去`0`
 *  - 舉例：`80`折 顯示為 `8`折
 */
export const formatDiscountRange = (range: number): string => (range === 100 ? '' : `${parseInt(String(range), 10)}`.replace(/0/, ''));

interface Discount {
  type: string;
  range: number;
}

/**
 * 折數
 */
export const formatDiscountLevel = (discount: Discount): string => {
  if (discount.type === discountTypeEnum.percentage) {
    return discount.range === 100 ? '' : `${formatDiscountRange(discount.range)} 折`;
  }
  if (discount.type === discountTypeEnum.amount) {
    return `省 ${parseInt(String(discount.range), 10)}`;
  }
  return '';
};
