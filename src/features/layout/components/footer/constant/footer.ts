import { footerFbx2Img, footerYoutubex2Img, footerIgx2Img, footerApplex2Img, footerGplayx2Img, footerQr165Img, footerFbsvg, footerYtsvg, footerIgsvg } from '@/shared/constants/images-path';

// Types
interface FooterLink {
  name: string;
  link: string;
  id: string;
  blank?: string;
}

type FooterSection = (string | FooterLink)[];

// 關於誠品
export const about: FooterSection = [
  '關於誠品',
  { name: '企業理念', link: 'https://www.eslitecorp.com/eslite/index.jsp?site_id=eslite_tw&func_id=fee3ba0215', id: 'footer-abouteslite-philosophy' },
  { name: '創辦人故事', link: 'https://www.eslitecorp.com/eslite/index.jsp?site_id=eslite_tw&func_id=20f9eec115', id: 'footer-abouteslite-story' },
  { name: '經營內容', link: 'https://www.eslitecorp.com/eslite/index.jsp?site_id=eslite_tw&func_id=39d4c7f715', id: 'footer-abouteslite-content' },
  { name: '發展歷程', link: 'https://www.eslitecorp.com/eslite/index.jsp?site_id=eslite_tw&func_id=0648512515', id: 'footer-abouteslite-course' },
  { name: '得獎事蹟', link: 'https://www.eslitecorp.com/eslite/index.jsp?site_id=eslite_tw&func_id=63bb7fa015', id: 'footer-abouteslite-deeds' },
];

// 合作洽談
export const cooperation: FooterSection = [
  '合作洽談',
  { name: '合作業務範圍', link: '/docs/cooperation', id: 'footer-esliteonline-cooperation' },
  { name: '團購業務', link: '/docs/group-buying-description', id: 'footer-esliteonline-group' },
];

// 誠品線上
export const online: FooterSection = [
  '誠品線上',
  { name: '常見問題', link: '/member/customer', id: 'footer-esliteonline-faq' },
  { name: '聯絡我們', link: '/member/customer/customer-service', id: 'footer-esliteonline-question' },
  { name: '網站使用條款', link: '/docs/service-rules', id: 'footer-esliteonline-webuse' },
  { name: '隱私權政策', link: '/docs/privacy-policy', id: 'footer-esliteonline-privacy' },
  // { name: '誠品信託契約書', link: 'http://www.eslite.com/html/doc/誠品信託契約書.pdf', id: 'footer-esliteonline-contract', blank: '_blank' },
  { name: '個人資料保護法', link: '/docs/personal-protection-act', id: 'footer-esliteonline-law', blank: '_blank' },
];
// 誠品通路
export const access: FooterSection = [
  '誠品通路',
  { name: '誠品官網', link: 'https://www.eslitecorp.com/eslite/index.jsp', id: 'footer-eslitechannel-corp' },
  { name: '迷誠品', link: 'https://meet.eslite.com/tw/tc', id: 'footer-eslitechannel-meet' },
  { name: '誠品電影院', link: 'https://arthouse.eslite.com/visAgreement.aspx', id: 'footer-eslitechannel-movie' },
  { name: '誠品畫廊', link: 'https://www.eslitegallery.com/', id: 'footer-eslitechannel-gallery' },
  { name: '誠品展演', link: 'https://meet.eslite.com/hk/tc/gallery', id: 'footer-eslitechannel-spectrum' },
  { name: '誠品行旅', link: 'https://www.eslitehotel.com/', id: 'footer-eslitechannel-hotel' },
  { name: '誠品酒窖', link: 'https://www.eslitewine.com/', id: 'footer-eslitechannel-wine' },
  { name: '誠品文化藝術基金會', link: 'https://www.eslitefoundation.org.tw/', id: 'footer-eslitechannel-foundation' },
];
// 營業據點
export const base: FooterSection = [
  '營業據點',
  { name: '台灣北部', link: 'https://meet.eslite.com/tw/tc/store?areaId=e0a7c75a-7cbd-e711-a974-06d9a90704e1', id: 'footer-eslitestore-north' },
  { name: '台灣中部', link: 'https://meet.eslite.com/tw/tc/store?areaId=e1a7c75a-7cbd-e711-a974-06d9a90704e1', id: 'footer-eslitestore-central' },
  { name: '台灣南部', link: 'https://meet.eslite.com/tw/tc/store?areaId=e2a7c75a-7cbd-e711-a974-06d9a90704e1', id: 'footer-eslitestore-south' },
  { name: '台灣東部', link: 'https://meet.eslite.com/tw/tc/store?areaId=e3a7c75a-7cbd-e711-a974-06d9a90704e1', id: 'footer-eslitestore-east' },
  { name: '香港', link: 'https://meet.eslite.com/tw/tc/store?areaId=e4a7c75a-7cbd-e711-a974-06d9a90704e1', id: 'footer-eslitestore-hongkong' },
  { name: '蘇州', link: 'https://meet.eslite.com/tw/tc/store/201802200001', id: 'footer-eslitestore-suzhou' },
  { name: '東京', link: 'https://www.eslitecorp.com/eslite/index.jsp?site_id=eslite_tw&func_id=931821c115&branch_type=type_19', id: 'footer-eslitestore-japan' },
  { name: '吉隆坡', link: 'https://www.eslitecorp.com/eslite/branch.jsp?id=258&site_id=eslite_tw&page_no=1', id: 'footer-eslitestore-kualaLumpur' },
];
// 訂閱誠品線上電子報
export const newsletter: FooterSection = [
  '訂閱誠品線上電子報',
  { name: '誠品線上電子報', link: '/member/newsletter', id: 'footer-esliteedm-edm' },
  { name: '誠品人獨享特刊', link: '/member/newsletter', id: 'footer-esliteedm-only' },
  { name: '全台誠品門市活動/優惠', link: '/member/newsletter', id: 'footer-esliteedm-store' },
];
// 關注誠品
export const focus = {
  name: '關注誠品',
  icons: [
    { icon: footerFbx2Img, link: 'https://www.facebook.com/eslite/', id: 'footer-eslitefocus-facebook', name: 'facebook' },
    { icon: footerYoutubex2Img, link: 'https://www.youtube.com/channel/UCyBWpXCsYqhbY1cDBwqUrHw', id: 'footer-eslitefocus-youtube', name: 'youtube' },
    { icon: footerIgx2Img, link: 'https://www.instagram.com/eslite_global/?hl=zh-tw', id: 'footer-eslitefocus-instagram', name: 'instagram' },
  ],
};
// 關注誠品 (2024index)
export const focus2024 = {
  name: '關注誠品',
  icons: [
    { icon: footerFbsvg, link: 'https://www.facebook.com/eslite/', id: 'footer-eslitefocus-facebook', name: 'facebook' },
    { icon: footerYtsvg, link: 'https://www.youtube.com/channel/UCyBWpXCsYqhbY1cDBwqUrHw', id: 'footer-eslitefocus-youtube', name: 'youtube' },
    { icon: footerIgsvg, link: 'https://www.instagram.com/eslite_global/?hl=zh-tw', id: 'footer-eslitefocus-instagram', name: 'instagram' },
  ],
};

// 誠品人APP
export const app = {
  name: '誠品APP',
  icons: [
    {
      icon: footerApplex2Img,
      link: 'https://apps.apple.com/tw/app/誠品人-tw/id1527231018',
      id: 'footer-esliteapp-appstore',
      name: 'apple',
    },
    {
      icon: footerGplayx2Img,
      link: 'https://play.google.com/store/apps/details?id=com.eslite.tw',
      id: 'footer-esliteapp-googleplay',
      name: 'android',
    },
  ],
};
// 資安防護
export const qrCode = {
  name: '資安防護',
  icons: {
    icon: footerQr165Img,
    link: 'https://165.npa.gov.tw/',
    id: 'footer-esliteqrCode-165',
    name: '內政部警政署165全民防騙網',
    content: {
      first: '內政部警政署',
      last: '165全民防騙網',
    },
  },
};

// 誠品人footer
export const webMap = { about, online, access, base, newsletter };
export const mbMap = { about, cooperation, online, access, base, newsletter };
