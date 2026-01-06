import { pxToRem } from '../shared';
/**
 * 預定義的 spacing 值 (避免與 fontSize 重複)
 * 用於 margin, padding 等間距屬性
 */
export const spacing = {
  // 常用間距值
  '10px': pxToRem(10),
  '15px': pxToRem(15), // 已存在於 config
  '30px': pxToRem(30),
  '60px': pxToRem(60),
};
