// Type definitions
export interface SortableItem {
  sort?: number | null;
  [key: string]: any;
}

export interface BasicBannerItem {
  alt?: string;
  link?: string;
  img_url?: string;
  web_img_url?: string;
  mobile_img_url?: string;
  sort?: number;
}

export interface SearchKeywordItem {
  keyword?: string;
  title?: string;
  link?: string;
  sort?: number;
}

export interface MenuLevel1 {
  title?: string;
  link?: string;
}

export interface MenuLevel3 {
  title?: string;
  link?: string;
  sort?: number;
}

export interface MenuLevel2 {
  title?: string;
  link?: string;
  img_url?: string;
  sort?: number;
  level3s?: MenuLevel3[];
}

export interface MenuBrand {
  title?: string;
  link?: string;
  img_url?: string;
  sort?: number;
}

export interface MenuBanner {
  title?: string;
  link?: string;
  img_url?: string;
  sort?: number;
}

export interface MenuItem {
  content: {
    level1s: MenuLevel1[];
    level2s?: MenuLevel2[];
    brands: MenuBrand[];
    banners: MenuBanner[];
  };
}

export interface BigSlideProduct {
  eslite_sn?: string | number;
  link?: string;
  title?: string;
  product_name?: string;
  sort?: number;
}

export interface BigSlideItem {
  sort?: number;
  banner?: {
    alt?: string;
    link?: string;
    img_url?: string;
  };
  products: BigSlideProduct[];
}

export interface CoordItem {
  link?: string;
  coords?: {
    upper_left_x?: number;
    upper_left_y?: number;
    lower_right_x?: number;
    lower_right_y?: number;
    [key: string]: any;
  };
}

export interface HtmlMapBannerData {
  web: {
    img_url: string;
    content?: CoordItem[];
  };
  mobile: {
    img_url: string;
    content?: CoordItem[];
  };
}

export interface SmallBannerSlideCard {
  sort?: number;
  alt?: string;
  link?: string;
  img_url?: string;
}

export interface SmallBannerSlideData {
  alt?: string;
  background_color?: string;
  web_img_url?: string;
  mobile_img_url?: string;
  cards?: SmallBannerSlideCard[];
}

export interface ProductItem {
  eslite_sn?: string | number;
  title?: string;
  product_name?: string;
  link?: string;
  sort?: number;
  product_description?: string;
}

export interface ProductCardSlideItem {
  tab_title?: string;
  sort?: number;
  products?: ProductItem[];
}

export interface SlideAndFourBannerCard {
  alt?: string;
  img_url?: string;
  link?: string;
  sort?: number;
}

export interface SlideAndFourBannerData {
  cards?: SlideAndFourBannerCard[];
  long_banner?: {
    alt?: string;
    web_img_url?: string;
    mobile_img_url?: string;
    link?: string;
  };
}

export interface HotKeywordItem {
  title?: string;
  link?: string;
  sort?: number;
}

export interface HotKeywordsData {
  alt?: string;
  img_url?: string;
  background_color?: string;
  keywords?: HotKeywordItem[];
}

export interface BestSellersData {
  [key: string]: any;
}

export interface ThreeBannerGroupData {
  cards?: BasicBannerItem[];
}

export interface LimitedEditionData {
  products?: ProductItem[];
}

export interface ExclusiveBrandItem {
  img_url?: string;
  title?: string;
  link?: string;
  sort?: number;
  alt?: string;
}

export interface ExclusiveBrandData {
  brands?: ExclusiveBrandItem[];
}

export interface StrongRecommendationItem {
  tab_name?: string;
  sort?: number;
  alt?: string;
  background_color?: string;
  link?: string;
  img_url?: string;
  products?: ProductItem[];
}

export interface StrikingBrandItem {
  sort?: number;
  banner?: {
    alt?: string;
    img_url?: string;
    link?: string;
  };
  products?: ProductItem[];
}

export interface BrandListData {
  watch_more_link?: string;
  brands?: ExclusiveBrandItem[];
}

export interface TopicSelectionMainProduct {
  eslite_sn?: string;
  title1?: string;
  title2?: string;
  product_name?: string;
  product_description?: string;
  img_url?: string;
  link?: string;
}

export interface TopicSelectionItem {
  sort?: number;
  tab_title?: string;
  main_product?: TopicSelectionMainProduct;
  sub_products?: ProductItem[];
}

export interface NewThreadContentItem {
  name?: string;
  name_type?: string;
  watch_more_link?: string;
  sort?: number;
  banner: {
    alt?: string;
    link?: string;
    img_url?: string;
  };
  products?: ProductItem[];
}

export interface NewThreadGroupRow {
  group_name?: string;
  content?: NewThreadContentItem[];
}