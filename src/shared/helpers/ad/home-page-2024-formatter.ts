import { filter, map, sortBy, prop, includes, addIndex } from 'ramda';
import { isEmptyValue, emptyReplace } from '@/shared/helpers/data-process';
import { homePage2024BasicBannerFormatter } from '@/shared/helpers/ad/part/home-page-inner-formatter';
import { extraFieldEnum, productFormatterMaker } from '@/shared/helpers/product-formatter';
import { formatImagePath } from '@/shared/helpers/image-formatter';
import { normalizeUrl } from '@/shared/helpers/url/url-common';
import type {
  SortableItem,
  BasicBannerItem,
  SearchKeywordItem,
  MenuLevel1,
  MenuLevel3,
  MenuLevel2,
  MenuBrand,
  MenuBanner,
  MenuItem,
  BigSlideProduct,
  BigSlideItem,
  CoordItem,
  HtmlMapBannerData,
  SmallBannerSlideCard,
  SmallBannerSlideData,
  ProductItem,
  ProductCardSlideItem,
  SlideAndFourBannerCard,
  SlideAndFourBannerData,
  HotKeywordItem,
  HotKeywordsData,
  BestSellersData,
  ThreeBannerGroupData,
  LimitedEditionData,
  ExclusiveBrandItem,
  ExclusiveBrandData,
  StrongRecommendationItem,
  StrikingBrandItem,
  BrandListData,
  TopicSelectionItem,
  NewThreadContentItem,
  NewThreadGroupRow,
} from '@/shared/types/homePage2024formatterType';

const { PUBLIC_BASE_URL: baseUrl } = import.meta.env;

// import { productFormatterBase } from '@/helper/product-formatter';
// import HomeAdProductDto from '@/dto/home-ad-product-dto';

// const homePageAdProductBaseFormat = (product) => new HomeAdProductDto(product, { formatter: productFormatterBase });

const sortBySort = (item: SortableItem): number => {
  const sortValue = prop('sort', item) as number | null | undefined;
  return sortValue === 0 || isEmptyValue(sortValue) ? 999 : sortValue ?? 999; // `null`、`0`、`undefined` 轉 `999`
};

const formatSortItems = <T extends SortableItem, R>(
  items: T[] = [],
  mapper: (item: T) => R,
): (R & { sort: number })[] => {
  const mappedItems = addIndex<T, R>(map)((item: T, _index: number) => mapper(item), items) as R[];
  return sortBy(
    (item) => Number(sortBySort(item as SortableItem)), // 只依 `sort` 值排序
    mappedItems,
  ).map((item, index) => ({ ...item, sort: index })); // 確保 sort 依據 index 重新賦值
};

/**
 * 【首頁廣告 fetch 之後整理資料用的】
 * Formatter 若要用 helper 取 `method` 名
 * 需按 constant/ad/homepage-ad-type.js
 * `format` + `mappingName` 取名
 * 舉例：formatHotTopicImage
 */

/**
 * B001 top_banner 版頭橫幅
 */
const formatTopBanner = (ad: BasicBannerItem) => ({
  type: 'B001',
  alt: emptyReplace(ad.alt ?? '', ''),
  link: normalizeUrl(ad.link ?? '', baseUrl, '#'),
  image: formatImagePath(emptyReplace(ad.web_img_url ?? '', '')),
  imageMobile: formatImagePath(emptyReplace(ad.mobile_img_url ?? '', '')),
});

/**
 * B002 logo
 */
const formatLogo = (ad: BasicBannerItem) => ({
  type: 'B002',
  alt: emptyReplace(ad.alt ?? '誠品線上', '誠品線上'),
  link: normalizeUrl(ad.link ?? '/', baseUrl, '/'),
  image: formatImagePath(emptyReplace(ad.img_url ?? '', '')),
});

/**
 * B003 search keywords 搜尋關鍵字
 */
const formatSearchKeywords = (ad: SearchKeywordItem[] = []) => ({
  type: 'B003',
  items: formatSortItems(ad, (item: SearchKeywordItem) => ({
    alt: emptyReplace(item.keyword ?? '', ''),
    link: normalizeUrl(item.link ?? '', baseUrl, '#'),
    sort: emptyReplace(item.sort ?? 999, 999),
  })),
});

/**
 * B004 header_small_banner 全站小B
 */
const formatHeaderSmallBanner = (ad: BasicBannerItem) => ({
  type: 'B004',
  image: formatImagePath(emptyReplace(ad.img_url ?? '', '')),
  alt: emptyReplace(ad.alt ?? '', ''),
  link: normalizeUrl(ad.link ?? '', baseUrl, '#'),
});

/**
 * B005 big_slide_tabs 右側主題活動
 */
const formatBigSlideTabs = (ad: SearchKeywordItem[]) => ({
  type: 'B005',
  items: formatSortItems(ad, (item: SearchKeywordItem) => ({
    alt: emptyReplace(item.title ?? '', ''),
    link: normalizeUrl(item.link ?? '', baseUrl, '#'),
    sort: emptyReplace(item.sort ?? 999, 999),
  })),
});

/**
 * B006 menu 分類選單
 */
const formatMenu = (ad: MenuItem[]) => ({
  type: 'B006',
  items: map((item: MenuItem) => {
    return {
      level1s: map(
        (l1: MenuLevel1) => ({
          title: emptyReplace(l1.title ?? '', ''),
          link: normalizeUrl(l1.link ?? '', baseUrl, '#'),
        }),
        item.content.level1s,
      ),
      level2s: sortBy(
        sortBySort,
        map(
          (l2: MenuLevel2) => ({
            title: emptyReplace(l2.title ?? '', ''),
            link: normalizeUrl(l2.link ?? '', baseUrl, '#'),
            image: formatImagePath(emptyReplace(l2.img_url ?? '', '')),
            sort: emptyReplace(l2.sort ?? 999, 999),
            level3s: sortBy(
              sortBySort,
              map(
                (l3: MenuLevel3) => ({
                  title: emptyReplace(l3.title ?? '', ''),
                  link: normalizeUrl(l3.link ?? '', baseUrl, '#'),
                  sort: emptyReplace(l3.sort ?? 999, 999),
                }),
                l2.level3s || [],
              ),
            ),
          }),
          item.content.level2s || [],
        ),
      ),
      brands: sortBy(
        sortBySort,
        map(
          (brand: MenuBrand) => ({
            title: emptyReplace(brand.title ?? '', ''),
            link: normalizeUrl(brand.link ?? '', baseUrl, '#'),
            image: formatImagePath(emptyReplace(brand.img_url ?? '', '')),
            sort: emptyReplace(brand.sort ?? 999, 999),
          }),
          item.content.brands,
        ),
      ),
      banners: sortBy(
        sortBySort,
        map(
          (banner: MenuBanner) => ({
            title: emptyReplace(banner.title ?? '', ''),
            link: normalizeUrl(banner.link ?? '', baseUrl, '#'),
            image: formatImagePath(emptyReplace(banner.img_url ?? '', '')),
            sort: emptyReplace(banner.sort ?? 999, 999),
          }),
          item.content.banners,
        ),
      ),
    };
  }, emptyReplace(ad ?? [], [])),
});

const formatBigSlide = (ad: BigSlideItem[]) => ({
  type: 'B007',
  items: sortBy(
    sortBySort,
    map(
      (item: BigSlideItem) => ({
        sort: emptyReplace(item.sort ?? 999, 999),
        alt: emptyReplace(item?.banner?.alt ?? '', ''),
        link: normalizeUrl(item?.banner?.link ?? '', baseUrl, '#'),
        image: formatImagePath(emptyReplace(item?.banner?.img_url ?? '', '')),

        products: formatSortItems(item.products, (product: BigSlideProduct) => ({
          id: emptyReplace(product.eslite_sn ?? 0, 0),
          link: normalizeUrl(product.link ?? '', baseUrl, '#'),
          title: emptyReplace(product.title ?? '', ''),
          name: emptyReplace(product.product_name ?? '', ''),
        })),
      }),
      emptyReplace(ad ?? [], []),
    ) as SortableItem[],
  ),
});

/**
 * B008 攻略廣告區塊
 */
const mapKeysByOrder = ['upper_left_x', 'upper_left_y', 'lower_right_x', 'lower_right_y'];
const formatHtmlMapBanner = (ad: HtmlMapBannerData) => ({
  type: 'B008',
  web: {
    imageUrl: formatImagePath(ad.web.img_url),
    items: map((item: CoordItem) => {
      const coords = item?.coords
        ? mapKeysByOrder.reduce((result: number[], key: string) => {
            result.push(item.coords![key] as number);
            return result;
          }, [])
        : [];

      return {
        link: normalizeUrl(item?.link ?? '', baseUrl, '#'),
        coords,
      };
    }, emptyReplace(ad.web.content ?? [], [])),
  },
  mobile: {
    imageUrl: formatImagePath(ad.mobile.img_url),
    items: map((item: CoordItem) => {
      const coords = item?.coords
        ? mapKeysByOrder.reduce((result: number[], key: string) => {
            result.push(item.coords![key] as number);
            return result;
          }, [])
        : [];
      return {
        link: normalizeUrl(item?.link ?? '', baseUrl, '#'),
        coords,
      };
    }, emptyReplace(ad.mobile.content ?? [], [])),
  },
});

/**
 * B009 攻略廣告區塊
 */
const formatSmallBannerSlide = (ad: SmallBannerSlideData) => ({
  type: 'B009',
  alt: emptyReplace(ad.alt ?? '', ''),
  color: emptyReplace(ad.background_color ?? '#FFFFFF', '#FFFFFF'),
  image: formatImagePath(emptyReplace(ad.web_img_url ?? '', '')),
  imageMobile: formatImagePath(emptyReplace(ad.mobile_img_url ?? '', '')),
  items: sortBy(
    sortBySort,
    map(
      (item: SmallBannerSlideCard) => ({
        sort: emptyReplace(item.sort ?? 999, 999),
        alt: emptyReplace(item?.alt ?? '', ''),
        link: normalizeUrl(item?.link ?? '', baseUrl, '#'),
        image: formatImagePath(emptyReplace(item?.img_url ?? '', '')),
      }),
      emptyReplace(ad.cards ?? [], []),
    ) as SortableItem[],
  ),
});

/**
 * B010 product_card_slide 超划算搶購 (1個分類, 24個商品)
 */
const formatProductCardSlide = (ad: ProductItem[]) => ({
  type: 'B010',
  items: [
    {
      products: formatSortItems(ad, (product: ProductItem) => ({
        esliteSN: product.eslite_sn,
        title: emptyReplace(product.title ?? '', ''),
        name: emptyReplace(product.product_name ?? '', ''),
        link: normalizeUrl(product.link ?? '', baseUrl, ''),
        sort: emptyReplace(product.sort ?? 999, 999),
      })).slice(0, 24),
    },
  ],
});

/**
 * B011 product_card_slides 新書焦點 (9個分類, 30個商品)
 */
const formatProductCardSlides = (ad: ProductCardSlideItem[]) => ({
  type: 'B011',
  items: sortBy(
    sortBySort,
    map(
      (item: ProductCardSlideItem) => ({
        sort: emptyReplace(item.sort ?? 999, 999),
        title: emptyReplace(item.tab_title ?? '', ''),
        products: formatSortItems(item.products || [], (product: ProductItem) => ({
          esliteSN: product.eslite_sn,
          title: emptyReplace(product.title ?? '', ''),
          name: emptyReplace(product.product_name ?? '', ''),
          link: normalizeUrl(product.link ?? '', baseUrl, ''),
          sort: emptyReplace(product.sort ?? 999, 999),
        })).slice(0, 30),
      }),
      emptyReplace(
        filter((x: ProductCardSlideItem) => !isEmptyValue(x.tab_title) && !isEmptyValue(x.products), ad ?? []),
        [],
      ),
    ) as SortableItem[],
  ).slice(0, 9),
});

/**
 * B028(主題選讀)，版型同 B011(新書焦點) product_card_slides 新書焦點 (9個分類, 30個商品)
 */
const formatThematicPicks = (ad: ProductCardSlideItem[]) => ({
  ...formatProductCardSlides(ad),
  type: 'B028',
});

// B012 membersOnly
const formatMembersOnly = (ad: any[]) => ({
  type: 'B012',
  items: sortBy(
    sortBySort,
    map((item: any) => ({ ...homePage2024BasicBannerFormatter(item) }), emptyReplace(ad ?? [], [])) as SortableItem[],
  ),
});
// B013 slideAndFourBanner
const formatSlideAndFourBanner = (ad: SlideAndFourBannerData = {}) => ({
  type: 'B013',
  items: formatSortItems(ad?.cards || [], (item: SlideAndFourBannerCard) => ({
    alt: emptyReplace(item.alt ?? '', ''),
    image: formatImagePath(emptyReplace(item.img_url ?? '', '')),
    link: normalizeUrl(item.link ?? '', baseUrl, '#'),
    sort: emptyReplace(item.sort ?? 999, 999),
  })),
  banner: {
    alt: emptyReplace(ad?.long_banner?.alt ?? '', ''),
    image: formatImagePath(emptyReplace(ad?.long_banner?.web_img_url ?? '', '')),
    imageMobile: formatImagePath(emptyReplace(ad?.long_banner?.mobile_img_url ?? '', '')),
    link: normalizeUrl(ad?.long_banner?.link ?? '', baseUrl, '#'),
  },
});

/**
 * B014 hotKeywords
 */
const formatHotKeywords = (ad: HotKeywordsData) => ({
  type: 'B014',
  alt: emptyReplace(ad.alt ?? '', ''),
  image: formatImagePath(emptyReplace(ad.img_url ?? '', '')),
  color: emptyReplace(ad.background_color ?? '#FFFFFF', '#FFFFFF'),
  items: formatSortItems(ad.keywords || [], (item: HotKeywordItem) => ({
    title: emptyReplace(item.title ?? '', ''),
    link: normalizeUrl(item.link ?? '', baseUrl, '#'),
    sort: emptyReplace(item.sort ?? 999, 999),
  })),
});

/**
 * B015 網路暢銷榜 (暫緩)
 */
const formatBestSellersOnline = (ad: BestSellersData) => ({
  type: 'B015',
  items: Object.values(
    Object.keys(ad)
      .filter((key) => !includes(key, ['banner_type', 'page', 'blank']))
      .reduce((obj: Record<string, any>, key: string) => {
        const newKey = key.replace('L1_ID_', '');
        const extraFields = [extraFieldEnum.preorder, extraFieldEnum.author];
        const productFormatter = productFormatterMaker({ extraFields });
        const products = map(productFormatter, emptyReplace(ad[key] ?? [], []));

        if (products.length > 0) obj[newKey] = { products, title: newKey };
        return obj;
      }, {}),
  ),
});

// B016 主題企劃
const formatNewMainTopicProject = (ad: BasicBannerItem[]) => ({
  type: 'B016',
  items: formatSortItems(ad || [], (item: BasicBannerItem) => ({
    alt: emptyReplace(item.alt ?? '', ''),
    image: formatImagePath(emptyReplace(item.img_url ?? '', '')),
    link: normalizeUrl(item.link ?? '', baseUrl, '#'),
    sort: emptyReplace(item.sort ?? 999, 999),
  })),
});

// B017 3小直方圖
const formatThreeBannerGroup = (ad: ThreeBannerGroupData) => ({
  type: 'B017',
  items: formatSortItems(ad.cards || [], (item: BasicBannerItem) => ({
    alt: emptyReplace(item.alt ?? '', ''),
    image: formatImagePath(emptyReplace(item.img_url ?? '', '')),
    link: normalizeUrl(item.link ?? '', baseUrl, '#'),
    sort: emptyReplace(item.sort ?? 999, 999),
  })),
});

// B018 限定商品
const formatLimitedEditionGroup = (ad: LimitedEditionData) => ({
  type: 'B018',
  items: [
    {
      products: formatSortItems(ad.products || [], (product: ProductItem) => ({
        esliteSN: product.eslite_sn,
        title: emptyReplace(product.title ?? '', ''),
        name: emptyReplace(product.product_name ?? '', ''),
        link: normalizeUrl(product.link ?? '', baseUrl, ''),
        sort: emptyReplace(product.sort ?? 999, 999),
      })),
    },
  ],
});

// B019 獨家品牌
const formatExclusiveBrandGroup = (ad: ExclusiveBrandData) => ({
  type: 'B019',
  items: formatSortItems(ad.brands || [], (item: ExclusiveBrandItem) => ({
    image: formatImagePath(emptyReplace(item.img_url ?? '', '')),
    title: emptyReplace(item.title ?? '', ''),
    link: normalizeUrl(item.link ?? '', baseUrl, ''),
    sort: emptyReplace(item.sort ?? 999, 999),
  })),
});

// B020 強檔推薦
const formatStrongRecommendation = (ad: StrongRecommendationItem[]) => ({
  type: 'B020',
  items: formatSortItems(ad || [], (item: StrongRecommendationItem) => ({
    name: emptyReplace(item.tab_name ?? '', ''),
    sort: emptyReplace(item.sort ?? 999, 999),
    alt: emptyReplace(item.alt ?? '', ''),
    color: emptyReplace(item.background_color ?? '#FFFFFF', '#FFFFFF'),
    link: normalizeUrl(item.link ?? '', baseUrl, ''),
    image: formatImagePath(emptyReplace(item.img_url ?? '', '')),
    products: formatSortItems(item.products || [], (product: ProductItem) => ({
      esliteSN: product.eslite_sn,
      title: emptyReplace(product.title ?? '', ''),
      name: emptyReplace(product.product_name ?? '', ''),
      link: normalizeUrl(product.link ?? '', baseUrl, ''),
      sort: emptyReplace(product.sort ?? 999, 999),
    })),
  })).slice(0, 10),
});

// B021 銀行/行動支付優惠總覽
const formatBankCardSlide = (ad: BasicBannerItem[]) => ({
  type: 'B021',
  items: formatSortItems(ad || [], (item: BasicBannerItem) => ({
    image: formatImagePath(emptyReplace(item.img_url ?? '', '')),
    alt: emptyReplace(item.alt ?? '', ''),
    link: normalizeUrl(item.link ?? '', baseUrl, '#'),
    sort: emptyReplace(item.sort ?? 999, 999),
  })),
});

// B022 注目品牌 (2大6小)
const formatStrikingBrands = (ad: StrikingBrandItem[]) => ({
  type: 'B022',
  items: formatSortItems(ad || [], (item: StrikingBrandItem) => ({
    sort: emptyReplace(item.sort ?? 999, 999),
    banner: {
      alt: emptyReplace(item?.banner?.alt ?? '', ''),
      image: formatImagePath(emptyReplace(item?.banner?.img_url ?? '', '')),
      link: normalizeUrl(item?.banner?.link ?? '', baseUrl, '#'),
    },
    products: formatSortItems(item.products || [], (product: ProductItem) => ({
      esliteSN: emptyReplace(product.eslite_sn ?? 0, 0),
      title: emptyReplace(product.title ?? '', ''),
      name: emptyReplace(product.product_name ?? '', ''),
      link: normalizeUrl(product.link ?? '', baseUrl, '#'),
      sort: emptyReplace(product.sort ?? 999, 999),
    })),
  })),
});
// B023 品牌列表
const formatBrandList = (ad: BrandListData) => ({
  type: 'B023',
  link: normalizeUrl(ad.watch_more_link ?? '', baseUrl, ''),
  items: formatSortItems(ad.brands || [], (brand: ExclusiveBrandItem) => ({
    alt: emptyReplace(brand.alt ?? '', ''),
    image: formatImagePath(emptyReplace(brand.img_url ?? '', '')),
    link: normalizeUrl(brand.link ?? '', baseUrl, '#'),
    sort: emptyReplace(brand.sort ?? 999, 999),
  })),
});

// B024 話題選品 (頁籤式1大6小品)
const formatTopicSelectionTabs = (ad: TopicSelectionItem[]) => ({
  type: 'B024',
  items: formatSortItems(
    emptyReplace(
      filter((x: TopicSelectionItem) => !isEmptyValue(x.tab_title) && !isEmptyValue(x.sub_products), ad ?? []),
      [],
    ),
    (item: TopicSelectionItem) => ({
      sort: emptyReplace(item.sort ?? 999, 999),
      title: emptyReplace(item.tab_title ?? '', ''),
      main: {
        esliteSN: emptyReplace(item?.main_product?.eslite_sn ?? '', ''),
        message1: emptyReplace(item?.main_product?.title1 ?? '', ''),
        message2: emptyReplace(item?.main_product?.title2 ?? '', ''),
        alt: emptyReplace(item?.main_product?.product_name ?? '', ''), // alt
        title: emptyReplace(item?.main_product?.product_name ?? '', ''), // 商品名稱
        subTitle: emptyReplace(item?.main_product?.product_description ?? '', ''), // 長文內文 desc
        image: formatImagePath(emptyReplace(item?.main_product?.img_url ?? '', '')),
        link: normalizeUrl(item?.main_product?.link ?? '', baseUrl, '#'),
      },
      products: formatSortItems(item.sub_products || [], (product: ProductItem) => ({
        esliteSN: emptyReplace(product.eslite_sn ?? '', ''),
        title: emptyReplace(product.title ?? '', ''),
        name: emptyReplace(product.product_name ?? '', ''),
        link: normalizeUrl(product.link ?? '', baseUrl, '#'),
        sort: emptyReplace(product.sort ?? 999, 999),
      })),
    }),
  ),
});

// B025 橫幅腰帶
// 同等 formatTopBanner
const formatWideBanner = (ad: BasicBannerItem[]) => ({
  type: 'B025',
  items: formatSortItems(ad || [], (item: BasicBannerItem) => ({
    alt: emptyReplace(item.alt ?? '', ''),
    link: normalizeUrl(item.link ?? '', baseUrl, '#'),
    image: formatImagePath(emptyReplace(item.web_img_url ?? '', '')),
    imageMobile: formatImagePath(emptyReplace(item.mobile_img_url ?? '', '')),
    sort: emptyReplace(item.sort ?? 999, 999),
  })),
});

// B026 分類樓層
const formatNewThreadGroup = (ad: NewThreadGroupRow[]) => ({
  type: 'B026',
  items: map((row: NewThreadGroupRow) => {
    return {
      name: emptyReplace(row.group_name ?? '', ''),
      items: formatSortItems(row.content || [], (item: NewThreadContentItem) => ({
        name: emptyReplace(item.name ?? '', ''),
        nameType: emptyReplace(item.name_type ?? '', ''),
        link: normalizeUrl(item.watch_more_link ?? '', baseUrl, ''),
        sort: emptyReplace(item.sort ?? 999, 999),
        banner: {
          alt: emptyReplace(item.banner.alt ?? '', ''),
          link: normalizeUrl(item.banner.link ?? '', baseUrl, '#'),
          image: formatImagePath(emptyReplace(item.banner.img_url ?? '', '')),
        },
        products: formatSortItems(item.products || [], (product: ProductItem) => ({
          esliteSN: product.eslite_sn,
          title: emptyReplace(product.title ?? '', ''),
          name: emptyReplace(product.product_name ?? '', ''),
          link: normalizeUrl(product.link ?? '', baseUrl, ''),
        })),
      })),
    };
  }, emptyReplace(ad ?? [], [])),
});

// B027 他們正在讀
const formatCelebrityRecommendation = (ad: BasicBannerItem[]) => ({
  type: 'B027',
  items: formatSortItems(ad || [], (item: BasicBannerItem) => ({
    image: formatImagePath(emptyReplace(item.img_url ?? '', '')),
    alt: emptyReplace(item.alt ?? '', ''),
    link: normalizeUrl(item.link ?? '', baseUrl, '#'),
    sort: emptyReplace(item.sort ?? 999, 999),
  })),
});

/**
 * A001
 */
const formatEightLinks = (ad: BasicBannerItem[]) => ({
  type: 'A001',
  items: sortBy(
    sortBySort,
    map(
      (item: BasicBannerItem) => ({
        sort: emptyReplace(item.sort ?? 999, 999),
        alt: emptyReplace(item?.alt ?? '', ''),
        link: normalizeUrl(item?.link ?? '', baseUrl, '#'),
        image: formatImagePath(emptyReplace(item?.img_url ?? '', '')),
      }),
      emptyReplace(ad ?? [], []),
    ) as SortableItem[],
  ),
});

/**
 * A002
 */
const formatCouponBanner = (ad: BasicBannerItem[]) => ({
  type: 'A002',
  items: sortBy(
    sortBySort,
    map(
      (item: BasicBannerItem) => ({
        alt: emptyReplace(item.alt ?? '', ''),
        link: normalizeUrl(item.link ?? '', baseUrl, '#'),
        image: formatImagePath(emptyReplace(item.img_url ?? '', '')),
        sort: emptyReplace(item.sort ?? 999, 999),
      }),
      emptyReplace(ad ?? [], []),
    ) as SortableItem[],
  ),
});

/**
 * A004
 */
const formatTenLinks = (ad: BasicBannerItem[]) => ({
  type: 'A004',
  items: sortBy(
    sortBySort,
    map(
      (item: BasicBannerItem) => ({
        sort: emptyReplace(item.sort ?? 999, 999),
        alt: emptyReplace(item?.alt ?? '', ''),
        link: normalizeUrl(item?.link ?? '', baseUrl, '#'),
        image: formatImagePath(emptyReplace(item?.img_url ?? '', '')),
      }),
      emptyReplace(ad ?? [], []),
    ) as SortableItem[],
  ),
});

export default {
  formatTopBanner,
  formatLogo,
  formatSearchKeywords,
  formatHeaderSmallBanner,
  formatBigSlideTabs,
  formatMenu,
  formatBigSlide,
  formatHtmlMapBanner,
  formatSmallBannerSlide,
  formatProductCardSlide,
  formatProductCardSlides,
  formatMembersOnly,
  formatSlideAndFourBanner,
  formatHotKeywords,
  formatBestSellersOnline,
  formatNewMainTopicProject,
  formatThreeBannerGroup,
  formatLimitedEditionGroup,
  formatExclusiveBrandGroup,
  formatStrongRecommendation,
  formatBankCardSlide,
  formatStrikingBrands,
  formatBrandList,
  formatTopicSelectionTabs,
  formatWideBanner,
  formatNewThreadGroup,
  formatCelebrityRecommendation,
  formatThematicPicks,
  formatEightLinks, // A001
  formatCouponBanner, // A002
  formatTenLinks, // A004
};
