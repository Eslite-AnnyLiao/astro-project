import { isNil, map, filter, prop, includes } from 'ramda';
import { homePageADMappingEnum } from '@/shared/constants/ad/homepage-ad-type';
import { MemberCenterPageADMappingEnum } from '@/shared/constants/ad/member-ad-type';
import { isFunction, rejectEmpty, isEmptyValue } from '@/shared/helpers/data-process';

export const adType = {
  memberCentre: MemberCenterPageADMappingEnum,
  homePage: homePageADMappingEnum,
};

export const createMethodName = (prefix: string) => (ad: keyof typeof adType, types: string) =>
  isNil(adType[ad][types]) ? '' : `${prefix}${adType[ad][types]}`;

export const findFormatter = (ad: keyof typeof adType, types: string) => createMethodName('format')(ad, types);

export const findMutations = (ad: keyof typeof adType, types: string) => createMethodName('set')(ad, types);

export const findGetter = (ad: keyof typeof adType, types: string) => createMethodName('get')(ad, types);

export const isExpired = (previousTime: Date, expiredHours: number) => {
  const current = new Date();
  const addPreviousTimeToSomeHours = new Date(previousTime);
  addPreviousTimeToSomeHours.setHours(previousTime.getHours() + expiredHours);

  return current > addPreviousTimeToSomeHours;
};

export const imagePath = (item: { image: string }) => {
  const img = /^(http)/.test(item.image) ? item.image : `${import.meta.env.PUBLIC_SOURCE_PIC}${item.image}`;
  return { backgroundImage: `url(${img})` };
};

export const processAdCreator =
  ({
    mappingEnum,
    formatterSet,
    position,
  }: {
    mappingEnum: Record<string, string>;
    formatterSet: Record<string, any>;
    position: string[];
  }) =>
  (inputData: any[]) => {
    const filterExisted = (data: any[]) => filter((ad: any) => includes(prop('banner_type', ad), position), data);
    const formatAd = (data: any[]) =>
      map((ad: any) => {
        const mappingName = mappingEnum[ad.banner_type];
        const formatter = formatterSet[`format${mappingName}`];
        if (!isFunction(formatter)) return {};
        return formatter(ad);
      }, data);

    return rejectEmpty(formatAd(filterExisted(inputData)));
  };

export const adIndexByADKeyCreator = (keyEnum: Record<string, string>) => (adList: any[]) => {
  const keyByADKeyReducer = (adSet: Record<string, any>, ad: any) => {
    const key = keyEnum[ad.type];
    adSet[key] = ad;
    return adSet;
  };
  return adList.reduce(keyByADKeyReducer, {} as Record<string, any>);
};

export const getNavLinkPath = (levelItem: { link?: string; depth: number; id: string }) =>
  isEmptyValue(levelItem.link) ? `/category/${levelItem.depth}/${levelItem.id}` : levelItem.link;
