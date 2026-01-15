import { mergeAll, map, zipObj, filter } from 'ramda';

/**
 * @const {array} homePageAD
 * 順序:
 * @face-1
 * focus_point [1. 注目焦點]
 * big_b_new [1. 大 banner]
 * home_page_recommend_of_the_day [1. 今日最推]
 * home_page_recommend_of_the_day_by_tabs [1. 今日最推v2]
 * hot_topic_image [1. 熱門話題]
 * hot_topic_text [1. 熱門話題]
 * hot_search [1. 流行熱搜]
 * member_little_b [1. 會員小 B]
 * @face-2
 * discount_big_b [2. 好康優惠大 B]
 * discount_little_b [2. 好康優惠小 B]
 * discount_area [2. 好康優惠專區]
 * home_page_horizontal_paint [2. 橫幅]
 * @face-3
 * home_page_online_leaderboard [3. g1 網路暢銷榜]
 * eslite_exclusive [3. g1 誠品獨家]
 * book_of_eslite_choice [3. g1 誠品選書]
 * music_of_eslite_choice [3. g1 誠品選樂]
 *
 * home_page_main_topic_project [3. g2 主題企劃]
 * brand_week [3. g2 品牌週]
 * @face-4
 * thread_group [4. 線別]
 */
export const homePageAD = [
  { description: '大Banner', code: 'big_b_new', key: 'bigBanner', mappingName: 'BigBanner', mod: '' },
  { description: '注目焦點', code: 'focus_point', key: 'focusPoint', mappingName: 'FocusPoint', mod: '' },
  { description: '今日最推', code: 'home_page_recommend_of_the_day_by_tabs', key: 'groupRecommend', mappingName: 'GroupRecommend', mod: '' },
  { description: '熱門話題(文)', code: 'hot_topic_text', key: 'hotTopicText', mappingName: 'HotTopicText', mod: '' },
  { description: '熱門話題(圖)', code: 'hot_topic_image', key: 'hotTopicImage', mappingName: 'HotTopicImage', mod: '' },
  { description: '流行熱搜', code: 'hot_search', key: 'hotSearch', mappingName: 'HotSearch', mod: '' },
  { description: '會員小B', code: 'member_little_b', key: 'memberBanner', mappingName: 'MemberBanner', mod: '' },
  { description: '好康優惠大B', code: 'discount_big_b', key: 'discountBannerLarge', mappingName: 'DiscountBannerLarge', mod: '' },
  { description: '好康優惠小B', code: 'discount_little_b', key: 'discountBannerSmall', mappingName: 'DiscountBannerSmall', mod: '' },
  { description: '好康優惠專區', code: 'discount_area', key: 'discountArea', mappingName: 'DiscountArea', mod: '' },
  { description: '橫幅', code: 'home_page_horizontal_paint', key: 'horizontalPaint', mappingName: 'HorizontalPaint', mod: '' },
  { description: '主題企劃', code: 'home_page_main_topic_project', key: 'mainTopicProject', mappingName: 'MainTopicProject', mod: '' },
  { description: '品牌週', code: 'brand_week', key: 'weeklyBrands', mappingName: 'WeeklyBrands', mod: '' },
  { description: '品牌列表', code: 'brand_listing', key: 'brandListing', mappingName: 'BrandListing', mod: '' },
  { description: '線別', code: 'thread_group', key: 'threadGroups', mappingName: 'ThreadGroups', mod: '' },
  { description: '誠品獨家', code: 'eslite_exclusive', key: 'esliteExclusive', mappingName: 'EsliteExclusive', mod: '' },
  { description: '誠品選書', code: 'book_of_eslite_choice', key: 'esliteBook', mappingName: 'EsliteBook', mod: '' },
  { description: '誠品選樂', code: 'music_of_eslite_choice', key: 'esliteMusic', mappingName: 'EsliteMusic', mod: '' },
  { description: '網路暢銷榜', code: 'home_page_online_leaderboard', key: 'onlineLeaderboard', mappingName: 'OnlineLeaderboard', mod: '' },

  /**
   * 2024 首頁改版 Banner
   */
  { description: 'B001 版頭橫幅', code: 'B001', key: 'topBanner', mappingName: 'TopBanner', mod: 'index2024' },
  { description: 'B002 搜尋關鍵字', code: 'B002', key: 'logo', mappingName: 'Logo', mod: 'index2024' },
  { description: 'B003 搜尋關鍵字', code: 'B003', key: 'searchKeywords', mappingName: 'SearchKeywords', mod: 'index2024' },
  { description: 'B004 右側主題活動', code: 'B004', key: 'headerSmallBanner', mappingName: 'HeaderSmallBanner', mod: 'index2024' },
  { description: 'B005 右側主題活動', code: 'B005', key: 'bigSlideTabs', mappingName: 'BigSlideTabs', mod: 'index2024' },
  { description: 'B006 分類選單', code: 'B006', key: 'menu', mappingName: 'Menu', mod: 'index2024' },
  { description: 'B007 大看板+3品', code: 'B007', key: 'bigSlide', mappingName: 'BigSlide', mod: 'index2024' },
  // HTML banner
  { description: 'B008 HTML區塊', code: 'B008', key: 'htmlMapBanner', mappingName: 'HtmlMapBanner', mod: 'index2024' },
  { description: 'B009 攻略廣告區塊', code: 'B009', key: 'smallBannerSlide', mappingName: 'SmallBannerSlide', mod: 'index2024' },

  { description: 'B010 超划算搶購', code: 'B010', key: 'productCardSlide', mappingName: 'ProductCardSlide', mod: 'index2024' },
  { description: 'B011 新書焦點', code: 'B011', key: 'productCardSlides', mappingName: 'ProductCardSlides', mod: 'index2024' },
  { description: 'B012 會員獨享', code: 'B012', key: 'membersOnly', mappingName: 'MembersOnly', mod: 'index2024' },
  { description: 'B013 3小1橫幅', code: 'B013', key: 'slideAndFourBanner', mappingName: 'SlideAndFourBanner', mod: 'index2024' },
  { description: 'B014 熱門關鍵字', code: 'B014', key: 'hotKeywords', mappingName: 'HotKeywords', mod: 'index2024' },

  { description: 'B015 網路暢榜', code: 'B015', key: 'bestSellersOnline', mappingName: 'BestSellersOnline', mod: 'index2024' },
  { description: 'B016 主題企劃', code: 'B016', key: 'newMainTopicProject', mappingName: 'NewMainTopicProject', mod: 'index2024' },
  { description: 'B017 3小直方圖', code: 'B017', key: 'threeBannerGroup', mappingName: 'ThreeBannerGroup', mod: 'index2024' },
  { description: 'B018 限定商品', code: 'B018', key: 'limitedEditionGroup', mappingName: 'LimitedEditionGroup', mod: 'index2024' },
  { description: 'B019 獨家品牌', code: 'B019', key: 'exclusiveBrandGroup', mappingName: 'ExclusiveBrandGroup', mod: 'index2024' },
  { description: 'B020 強檔推薦', code: 'B020', key: 'strongRecommendation', mappingName: 'StrongRecommendation', mod: 'index2024' },
  { description: 'B021 銀行/行動支付優惠總覽', code: 'B021', key: 'bankCardSlide', mappingName: 'BankCardSlide', mod: 'index2024' },
  { description: 'B022 注目品牌', code: 'B022', key: 'strikingBrands', mappingName: 'StrikingBrands', mod: 'index2024' },
  { description: 'B023 品牌列表', code: 'B023', key: 'brandList', mappingName: 'BrandList', mod: 'index2024' },
  { description: 'B024 話題選品', code: 'B024', key: 'topicSelectionTabs', mappingName: 'TopicSelectionTabs', mod: 'index2024' },
  { description: 'B025 橫幅腰帶', code: 'B025', key: 'wideBanner', mappingName: 'WideBanner', mod: 'index2024' },
  { description: 'B026 分類樓層', code: 'B026', key: 'newThreadGroup', mappingName: 'NewThreadGroup', mod: 'index2024' },
  { description: 'B027 他們正在讀', code: 'B027', key: 'celebrityRecommendation', mappingName: 'CelebrityRecommendation', mod: 'index2024' },
  { description: 'B028 主題選讀', code: 'B028', key: 'thematicPicks', mappingName: 'ThematicPicks', mod: 'index2024' },
  { description: 'A001 8小幅', code: 'A001', key: 'eightLinks', mappingName: 'EightLinks', mod: 'index2024' },
  { description: 'A002 領券橫幅', code: 'A002', key: 'couponBanner', mappingName: 'CouponBanner', mod: 'index2024' },
  { description: 'A004 分類選單 10小幅', code: 'A004', key: 'tenLinks', mappingName: 'TenLinks', mod: 'index2024' },
];

/**
 * 首頁廣告「類型」
 * {object} homePageADTypeKey { key: key } 組合
 * @sample bigBanner: 'bigBanner'
 * =============================================
 * @property {string} bigBanner
 * @property {string} focusPoint
 * @property {string} groupRecommend
 * @property {string} hotTopicText
 * @property {string} hotTopicImage
 * @property {string} hotSearch
 * @property {string} memberBanner
 * @property {string} discountBannerLarge
 * @property {string} discountBannerSmall
 * @property {string} discountArea
 * @property {string} horizontalPaint
 * @property {string} mainTopicProject
 * @property {string} weeklyBrands
 * @property {string} brandListing
 * @property {string} threadGroups
 * @property {string} esliteExclusive
 * @property {string} esliteBook
 * @property {string} esliteMusic
 * @property {string} onlineLeaderboard
 * @property {string} topBanner
 * @property {string} logo
 * @property {string} searchKeywords
 * @property {string} headerSmallBanner
 * @property {string} bigSlideTabs
 * @property {string} menu
 * @property {string} bigSlide
 * @property {string} htmlMapBanner
 * @property {string} smallBannerSlide
 * @property {string} productCardSlide
 * @property {string} productCardSlides
 * @property {string} membersOnly
 * @property {string} slideAndFourBanner
 * @property {string} hotKeywords
 * @property {string} bestSellersOnline
 * @property {string} newMainTopicProject
 * @property {string} threeBannerGroup
 * @property {string} limitedEditionGroup
 * @property {string} exclusiveBrandGroup
 * @property {string} strongRecommendation
 * @property {string} bankCardSlide
 * @property {string} strikingBrands
 * @property {string} brandList
 * @property {string} topicSelectionTabs
 * @property {string} wideBanner
 * @property {string} newThreadGroup
 * @property {string} celebrityRecommendation
 * @property {string} thematicPicks
 * @property {string} eightLinks
 * @property {string} couponBanner
 * @property {string} tenLinks
 * */
export const homePageADTypeKey = (() => mergeAll(map((x) => zipObj([x.key], [x.key]), homePageAD)))();

/**
 * 首頁廣告「類型」
 * {object} homePageADTypeEnum { key: code } 組合
 * @sample bigBanner: 'big_b_new'
 * =============================================
 * @property {string} bigBanner - 'big_b_new'
 * @property {string} focusPoint - 'focus_point'
 * @property {string} groupRecommend - 'home_page_recommend_of_the_day_by_tabs'
 * @property {string} hotTopicText - 'hot_topic_text'
 * @property {string} hotTopicImage - 'hot_topic_image'
 * @property {string} hotSearch - 'hot_search'
 * @property {string} memberBanner - 'member_little_b'
 * @property {string} discountBannerLarge - 'discount_big_b'
 * @property {string} discountBannerSmall - 'discount_little_b'
 * @property {string} discountArea - 'discount_area'
 * @property {string} horizontalPaint - 'home_page_horizontal_paint'
 * @property {string} mainTopicProject - 'home_page_main_topic_project'
 * @property {string} weeklyBrands - 'brand_week'
 * @property {string} brandListing - 'brand_listing'
 * @property {string} threadGroups - 'thread_group'
 * @property {string} esliteExclusive - 'eslite_exclusive'
 * @property {string} esliteBook - 'book_of_eslite_choice'
 * @property {string} esliteMusic - 'music_of_eslite_choice'
 * @property {string} onlineLeaderboard - 'home_page_online_leaderboard'
 * @property {string} topBanner - 'B001'
 * @property {string} logo - 'B002'
 * @property {string} searchKeywords - 'B003'
 * @property {string} headerSmallBanner - 'B004'
 * @property {string} bigSlideTabs - 'B005'
 * @property {string} menu - 'B006'
 * @property {string} bigSlide - 'B007'
 * @property {string} htmlMapBanner - 'B008'
 * @property {string} smallBannerSlide - 'B009'
 * @property {string} productCardSlide - 'B010'
 * @property {string} productCardSlides - 'B011'
 * @property {string} membersOnly - 'B012'
 * @property {string} slideAndFourBanner - 'B013'
 * @property {string} hotKeywords - 'B014'
 * @property {string} bestSellersOnline - 'B015'
 * @property {string} newMainTopicProject - 'B016'
 * @property {string} threeBannerGroup - 'B017'
 * @property {string} limitedEditionGroup - 'B018'
 * @property {string} exclusiveBrandGroup - 'B019'
 * @property {string} strongRecommendation - 'B020'
 * @property {string} bankCardSlide - 'B021'
 * @property {string} strikingBrands - 'B022'
 * @property {string} brandList - 'B023'
 * @property {string} topicSelectionTabs - 'B024'
 * @property {string} wideBanner - 'B025'
 * @property {string} newThreadGroup - 'B026'
 * @property {string} celebrityRecommendation - 'B027'
 * @property {string} thematicPicks - 'B028'
 * @property {string} eightLinks - 'A001'
 * @property {string} couponBanner - 'A002'
 * @property {string} tenLinks - 'A004'
 * */
export const homePageADTypeEnum = (() => mergeAll(map((x) => zipObj([x.key], [x.code]), homePageAD)))() as Record<string, string>;
export const homePageADTypeToKey = (() => mergeAll(map((x) => zipObj([x.code], [x.key]), homePageAD)))() as Record<string, string>;

/**
 * 首頁廣告「Mapping」
 *   用來對應 method name
 * {object} homePageADMappingEnum { code: mappingName } 組合
 * @sample 'big_b_new': 'BigBanner'
 * =============================================
 * @property {string} big_b_new - 'BigBanner'
 * @property {string} focus_point - 'FocusPoint'
 * @property {string} home_page_recommend_of_the_day_by_tabs - 'GroupRecommend'
 * @property {string} hot_topic_text - 'HotTopicText'
 * @property {string} hot_topic_image - 'HotTopicImage'
 * @property {string} hot_search - 'HotSearch'
 * @property {string} member_little_b - 'MemberBanner'
 * @property {string} discount_big_b - 'DiscountBannerLarge'
 * @property {string} discount_little_b - 'DiscountBannerSmall'
 * @property {string} discount_area - 'DiscountArea'
 * @property {string} home_page_horizontal_paint - 'HorizontalPaint'
 * @property {string} home_page_main_topic_project - 'MainTopicProject'
 * @property {string} brand_week - 'WeeklyBrands'
 * @property {string} brand_listing - 'BrandListing'
 * @property {string} thread_group - 'ThreadGroups'
 * @property {string} eslite_exclusive - 'EsliteExclusive'
 * @property {string} book_of_eslite_choice - 'EsliteBook'
 * @property {string} music_of_eslite_choice - 'EsliteMusic'
 * @property {string} home_page_online_leaderboard - 'OnlineLeaderboard'
 * @property {string} B001 - 'TopBanner'
 * @property {string} B002 - 'Logo'
 * @property {string} B003 - 'SearchKeywords'
 * @property {string} B004 - 'HeaderSmallBanner'
 * @property {string} B005 - 'BigSlideTabs'
 * @property {string} B006 - 'Menu'
 * @property {string} B007 - 'BigSlide'
 * @property {string} B008 - 'HtmlMapBanner'
 * @property {string} B009 - 'SmallBannerSlide'
 * @property {string} B010 - 'ProductCardSlide'
 * @property {string} B011 - 'ProductCardSlides'
 * @property {string} B012 - 'MembersOnly'
 * @property {string} B013 - 'SlideAndFourBanner'
 * @property {string} B014 - 'HotKeywords'
 * @property {string} B015 - 'BestSellersOnline'
 * @property {string} B016 - 'NewMainTopicProject'
 * @property {string} B017 - 'ThreeBannerGroup'
 * @property {string} B018 - 'LimitedEditionGroup'
 * @property {string} B019 - 'ExclusiveBrandGroup'
 * @property {string} strongRecommendation - 'StrongRecommendation'
 * @property {string} bankCardSlide - 'BankCardSlide'
 * @property {string} strikingBrands - 'StrikingBrands'
 * @property {string} brandList - 'BrandList'
 * @property {string} topicSelectionTabs - 'TopicSelectionTabs'
 * @property {string} wideBanner - 'WideBanner'
 * @property {string} newThreadGroup - 'NewThreadGroup'
 * @property {string} celebrityRecommendation - 'CelebrityRecommendation'
 * @property {string} B028 - 'ThematicPicks'
 * @property {string} eightLinks - 'EightLinks'
 * @property {string} couponBanner - 'CouponBanner'
 * @property {string} tenLinks - 'TenLinks'
 * */
export const homePageADMappingEnum = (() => mergeAll(map((x) => zipObj([x.code], [x.mappingName]), homePageAD)))();

/**
 * @const {object} homePageADMappingEnumWithNewIndex
 * 2024 年新首頁廣告映射，將 `code` 映射到 `mappingName` (例如: B001: 'TopBanner')。
 * 僅包含 `mod` 為 'index2024' 的廣告項目。
 */
export const homePageADMappingEnumWithNewIndex: Record<string, string> = mergeAll(
  map(
    (x: (typeof homePageAD)[number]) => zipObj([x.code], [x.mappingName]),
    filter((x: (typeof homePageAD)[number]) => x.mod === 'index2024', homePageAD),
  ),
);

/**
 * 首頁廣告「Mapping」
 *   用來對應 method name
 * {object} homePageADTypeEnum { code: key } 組合
 * @sample 'big_b_new': 'bigBanner'
 * =============================================
 * @property {string} big_b_new - 'bigBanner'
 * @property {string} focus_point - 'focusPoint'
 * @property {string} home_page_recommend_of_the_day_by_tabs - 'groupRecommend'
 * @property {string} hot_topic_text - 'hotTopicText'
 * @property {string} hot_topic_image - 'hotTopicImage'
 * @property {string} hot_search - 'hotSearch'
 * @property {string} member_little_b - 'memberBanner'
 * @property {string} discount_big_b - 'discountBannerLarge'
 * @property {string} discount_little_b - 'discountBannerSmall'
 * @property {string} discount_area - 'discountArea'
 * @property {string} home_page_horizontal_paint - 'horizontalPaint'
 * @property {string} home_page_main_topic_project - 'mainTopicProject'
 * @property {string} brand_week - 'weeklyBrands'
 * @property {string} brand_listing - 'brandListing'
 * @property {string} thread_group - 'threadGroups'
 * @property {string} eslite_exclusive - 'esliteExclusive'
 * @property {string} book_of_eslite_choice - 'esliteBook'
 * @property {string} music_of_eslite_choice - 'esliteMusic'
 * @property {string} home_page_online_leaderboard - 'onlineLeaderboard'
 * @property {string} B001 - 'topBanner'
 * @property {string} B002 - 'logo'
 * @property {string} B003 - 'searchKeywords'
 * @property {string} B004 - 'headerSmallBanner'
 * @property {string} B005 - 'bigSlideTabs'
 * @property {string} B006 - 'menu'
 * @property {string} B007 - 'bigSlide'
 * @property {string} B008 - 'htmlMapBanner'
 * @property {string} B009 - 'smallBannerSlide'
 * @property {string} B010 - 'productCardSlide'
 * @property {string} B011 - 'productCardSlides'
 * @property {string} B012 - 'membersOnly'
 * @property {string} B013 - 'slideAndFourBanner'
 * @property {string} B014 - 'hotKeywords'
 * @property {string} B015 - 'bestSellersOnline'
 * @property {string} B016 - 'newMainTopicProject'
 * @property {string} B017 - 'threeBannerGroup'
 * @property {string} B018 - 'limitedEditionGroup'
 * @property {string} B019 - 'exclusiveBrandGroup'
 * @property {string} strongRecommendation - 'strongRecommendation'
 * @property {string} bankCardSlide - 'bankCardSlide'
 * @property {string} strikingBrands - 'strikingBrands'
 * @property {string} brandList - 'brandList'
 * @property {string} topicSelectionTabs - 'topicSelectionTabs'
 * @property {string} wideBanner - 'wideBanner'
 * @property {string} newThreadGroup - 'newThreadGroup'
 * @property {string} celebrityRecommendation - 'celebrityRecommendation'
 * @property {string} B028 - 'thematicPicks'
 * @property {string} eightLinks - 'eightLinks'
 * @property {string} couponBanner - 'couponBanner'
 * @property {string} tenLinks - 'tenLinks'
 * */
export const homePageADKeyEnum = (() => mergeAll(map((x) => zipObj([x.code], [x.key]), homePageAD)))();

export const esliteExclusiveEnum = {
  [homePageADTypeKey.esliteExclusive]: { key: homePageADTypeKey.esliteExclusive, hat: 'eslite_only', siteLink: '/eslite-only', wording: '誠品獨家' },
  [homePageADTypeKey.esliteBook]: { key: homePageADTypeKey.esliteBook, hat: 'eslite_book', siteLink: '/eslite-choice-books', wording: '誠品選書' },
  [homePageADTypeKey.esliteMusic]: { key: homePageADTypeKey.esliteMusic, hat: 'eslite_music', siteLink: '/eslite-choice-music', wording: '誠品選樂' },
};
