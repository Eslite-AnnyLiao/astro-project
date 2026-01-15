import { mergeAll, map, zipObj } from 'ramda';

/* 結構參考home-page-ad-type */
export const MemberCenterPageAD = [
  {
    description: '會員中心橫幅',
    code: 'horizontal_paint_web',
    key: 'horizontalPaintWeb',
    mappingName: 'HorizontalPaintWeb',
  },
  {
    description: '文字廣告',
    code: 'announcement',
    key: 'textAD',
    mappingName: 'TextAD',
  },
  {
    description: '登入頁橫幅',
    code: 'login_page_horizontal_paint',
    key: 'loginPageHorizontalPaint',
    mappingName: 'LoginPageHorizontalPaint',
  },
];

export const MemberCenterPageADTypeEnum = (() => {
  return mergeAll(
    map((x) => {
      return zipObj([x.key], [x.code]);
    }, MemberCenterPageAD),
  );
})();

export const MemberCenterPageADMappingEnum = (() => {
  return mergeAll(
    map((x) => {
      return zipObj([x.code], [x.mappingName]);
    }, MemberCenterPageAD),
  );
})();

export const MemberCenterPageADKeyEnum = (() => {
  return mergeAll(
    map((x) => {
      return zipObj([x.code], [x.key]);
    }, MemberCenterPageAD),
  );
})();
