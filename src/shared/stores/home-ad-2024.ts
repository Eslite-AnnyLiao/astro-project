import { cloneDeep } from 'lodash-es';
import { defineStore } from 'pinia';
import { forEach, map } from 'ramda';
import getHomeAds from '../api/ad/home-page-2024'
import { isFunction, rejectEmpty } from '../helpers/data-process';
import homePageAdFormatter from '../helpers/ad/home-page-2024-formatter';
import { toCamelCase } from '../helpers/filter/string';
import { homePageAD, homePageADKeyEnum, homePageADMappingEnumWithNewIndex } from '../constants/ad/homepage-ad-type';

/** @const {function} createGetters 依照status建立 getter */
const createGetters = (keys: string[]) =>
  keys.reduce((getters: Record<string, (context: any) => any>, key: string) => {
    getters[`get${toCamelCase(key)}`] = (context: any) => context[key];
    return getters;
  }, {} as Record<string, (context: any) => any>);

/** @const {array} homePageADKeys 依照 constant 中首頁改版的內容建立 key array */
const homePageADKeys = homePageAD.filter((v) => v.mod === 'index2024' && v.key !== '').map((v) => v.key);

/** @const {object} homePageADState 依照 homePageADKeys 中的 key 建立 key object 用於塞入預設 state 中 */
const homePageADState = () =>
  homePageADKeys.reduce((rtn: Record<string, any>, v: string) => {
    rtn[v] = {};
    return rtn;
  }, {} as Record<string, any>);

/**
 * actions
 */
// 整理資料部分
const getFormatter = (types: string) => homePageAdFormatter[`format${homePageADMappingEnumWithNewIndex[types]}` as keyof typeof homePageAdFormatter];
const findAd = (type: string, data: any) => data[type]?.content || data[type];
const filterExisted =
  () =>
  ({ data }: { data: any }) =>
    data;
const processAd = (data: any) => {
  return map((types: string) => {
    try {
      if (Object.keys(findAd(types, data)).length === 0) return { type: types };
      return isFunction(getFormatter(types)) ? getFormatter(types)(findAd(types, data)) : {};
    } catch (error) {
      return { type: types };
    }
  }, Object.keys(data));
};

/** @const {object} defaultHomeAdState 預設 state */
export const defaultHomeAdState = {
  // 用來判斷是否重取
  timestamp: new Date(),
  isShowFooter: false,
  ...homePageADState(),
};

export const useHomeAd2024Store = defineStore('homeAd2024', {
  state: () => cloneDeep(defaultHomeAdState),
  getters: {
    getTimeStamp: (context: any) => context.timestamp,
    getIsShowHomeFooter: (context: any) => context.isShowFooter,
    ...createGetters(homePageADKeys),
  },
  actions: {
    // 取得資料部分
    fetchHomeAd(displayItems: string[] = []) {
      // console.log(`fetchHomeAd2024`, displayItems);
      const adTypes = displayItems.map((item: string) => `slot_type=${item}`).join('&');
      const setAd = (data: any[]) => forEach((ad: any) => this.$patch({ [homePageADKeyEnum[ad.type]]: ad }), data);
      const updateTime = () => (this.timestamp = new Date());

      return getHomeAds(adTypes)
        .then(filterExisted())
        .then(processAd)
        .then(rejectEmpty)
        .then(setAd)
        .then(updateTime)
        .then(() => true)
        .catch((e) => e);
    },
    setIsShowHomeFooter(val: boolean) {
      this.isShowFooter = val;
    },
  },
});
