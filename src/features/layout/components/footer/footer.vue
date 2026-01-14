<template>
  <footer class="lg:block pt-2 relative bg-gray-80">
    <div class="ec-container m-auto lg:px-0 overflow-hidden" data-test-id="footer">
      <div class="ec-row justify-between pt-2 pb-6 flex-col lg:flex-row lg:items-stretch">
        <div v-for="(items, index) in webMap" :key="`web-map-${index}`" :class="['footer-row ec-col-auto mb-2 lg:mb-0', { active: activeSet.has(index) }]">
          <div class="flex">
            <div class="ec-col-12 h-8 flex justify-between font-medium lg:font-bold cursor-pointer lg:cursor-default" @click="() => toggleActive(Number(index))">
              <p class="text-gray-900 text-[17px] leading-[22px] mb-[0.4rem]">{{ getSectionTitle(items) }}</p>
              <div class="button hidden">
                <p class="icon-fa-chevron-right"></p>
              </div>
            </div>
          </div>
          <ul>
            <li v-for="item in filterFooterItems(items)" :key="item.id">
              <p v-if="checkMeetEslite(item.name)" class="m-0 no-underline text-gray-800 text-[15px] leading-[1.7rmm]">
                迷<a
                  :id="item.id"
                  :href="item.link"
                  target="_blank"
                  rel="noreferrer"
                  :aria-label="item.id || 'footer-item'"
                  data-test-id="footer-meet-eslite-button"
                  class="no-underline text-gray-800 text-[15px] leading-[1.7rmm]"
                  >誠品</a
                >
              </p>
              <a v-else :id="item.id" :href="item.link" target="_blank" rel="noreferrer" :aria-label="item.id || 'footer-item'" class="no-underline text-gray-800 text-[15px] leading-[1.7rmm]">{{
                item.name
              }}</a>
            </li>
          </ul>
          <div class="line w-full"></div>
          <div v-if="getSectionTitle(items) === '訂閱誠品線上電子報'" class="flex mt-2 lg:mt-16">
            <div class="ec-col-12 flex justify-between lg:flex-col items-center lg:items-stretch font-medium lg:font-bold">
              <p class="mb-mb text-gray-900 text-[17px] leading-[22px] mb-[0.4rem]">{{ focus.name }}</p>
              <ul class="focus !flex justify-between m-0">
                <li v-for="item in focus.icons" :key="`focus-icons-${item.id}`" class="last:mr-0">
                  <a :id="item.id" :key="item.id" :href="item.link" target="_blank" rel="noreferrer" :aria-label="item.id" class="no-underline text-gray-800 text-[15px] leading-[1.7rmm]">
                    <img v-lazy="item.icon" :title="item.name" alt="" src="" class="max-w-12 max-h-12" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="getSectionTitle(items) === '關於誠品'" class="cooperation flex mt-2 line" :class="[{ active: activeSet.has('cooperation') }]">
            <div class="ec-col-12 flex justify-between lg:flex-col items-center lg:items-stretch flex-wrap">
              <div class="ec-col-12 lg:ec-col-auto flex">
                <div class="ec-col-12 h-8 flex justify-between font-medium lg:font-bold cursor-pointer lg:cursor-default" @click="() => toggleActive('cooperation')">
                  <p class="text-gray-900 text-[17px] leading-[22px] mb-[0.4rem]">{{ getSectionTitle(cooperation) }}</p>
                  <div class="button hidden">
                    <p class="icon-fa-chevron-right"></p>
                  </div>
                </div>
              </div>
              <ul>
                <li v-for="item in filteredCooperation" :key="item.id">
                  <a :id="item.id" :href="item.link" target="_blank" rel="noreferrer" :aria-label="item.id || 'footer-item'" class="no-underline text-gray-800 text-[15px] leading-[1.7rmm]">{{
                    item.name
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="ec-col-auto">
          <div class="line w-full"></div>
          <div class="flex">
            <!-- app-->
            <div class="ec-col-12 flex justify-between lg:flex-col items-center lg:items-stretch font-medium lg:font-bold">
              <p class="mb-mb text-gray-900 text-[17px] leading-[22px] mb-[0.4rem]">{{ app.name }}</p>
              <ul class="app !flex lg:flex-col m-0 mt-2 lg:mt-1">
                <li v-for="item in app.icons" :key="item.id" class="mb-2 ml-0">
                  <a :id="item.id" :href="item.link" target="_blank" rel="noreferrer" :aria-label="item.id" class="no-underline text-gray-800 text-[15px] leading-[1.7rmm]">
                    <img v-lazy="item.icon" :title="item.name" alt="" src="" class="max-w-[140px] max-h-[41.5px]" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="line w-full"></div>
          <div class="ec-row">
            <!--  資安防護-->
            <div class="ec-col-12 flex justify-between lg:flex-col mt-2 lg:mt-6">
              <ul class="qrcode flex m-0 mt-1">
                <li :key="qrCode.icons.id" class="mb-2">
                  <a :id="qrCode.icons.id" :href="qrCode.icons.link" target="_blank" rel="noreferrer" :aria-label="qrCode.icons.name" class="no-underline text-gray-800 text-[15px] leading-[1.7rmm]">
                    <div class="ec-row items-center">
                      <div class="qrcode-icon text-[13px] leading-4 ec-col-auto hidden lg:block pr-0">
                        <img v-lazy="qrCode.icons.icon" :title="qrCode.icons.name" alt="" src="" class="max-w-[70px] max-h-[70px]" />
                      </div>
                      <div class="qrcode-icon ec-col-auto lg:mt-auto font-medium lg:font-normal">
                        <span>{{ qrCode.icons.content.first }}<br class="hidden lg:block" />{{ qrCode.icons.content.last }}</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="line w-full !mb-4 lg:!mb-0"></div>
        <div class="copyright w-full text-[12px] text-center text-gray-500">
          <div>誠品線上eslite.com - powered by 誠品生活 / 誠品書店 / 誠品物流 | 誠品生活股份有限公司 (eslite Spectrum Corporation)</div>
          <div>統一編號：27952966 | 台灣台北市信義區松德路204號B1 服務電話：0800-666-798／+886-2-8789-8921</div>
          <div>本網站已依台灣網站內容分級規定處理｜建議使用瀏覽器版本：Google Chrome版本60以上 / Firefox版本48以上 / Safari 版本11以上</div>
        </div>
        <div class="security-icon flex justify-center mt-5 mb-6 lg:mt-10 lg:mb-12" :class="{ 'flex-col': $screen?.isMobileSize, 'items-center': $screen?.isMobileSize }">
          <div class="passkeyPledge flex items-center mb-4 lg:mb-0 lg:mr-8 lg:w-auto justify-between">
            <a target="_blank" href="https://fidoalliance.org/passkeypledge">
              <img :src="passkeyPledge" alt="passkeyPledge" class="object-contain max-h-9 mr-3 w-[67px] lg:w-auto" />
            </a>
            <div class="text-group tracking-normal w-[130px] lg:w-auto">
              <p class="!text-[13px] !mb-0 !leading-6">Passkey Pledge</p>
            </div>
          </div>
          <div class="iso flex items-center mb-4 lg:mb-0 lg:mr-8 lg:w-auto justify-between">
            <a target="_blank" href="https://www.bsigroup.com/zh-TW/products-and-services/assessment-and-certification/validation-and-verification/1client-directory-certificate/IS%20725170">
              <img :src="isoIec" alt="isoIec" class="object-contain max-h-9 mr-3 w-[67px] lg:w-auto" />
            </a>
            <div class="text-group tracking-normal">
              <p class="!text-[13px] !mb-0 !leading-6">資通安全管理系統榮獲</p>
              <p class="!text-[13px] !mb-0 !leading-6">ISO/IEC 27001認證</p>
            </div>
          </div>
          <div class="iso flex items-center mb-4 lg:mb-0 lg:mr-8 lg:w-auto justify-between">
            <a target="_blank" href="https://www.bsigroup.com/zh-TW/products-and-services/assessment-and-certification/validation-and-verification/1client-directory-certificate/CLOUD%20829974">
              <img :src="isoIec17" alt="isoIec" class="object-contain max-h-9 mr-3 w-[67px] lg:w-auto" />
            </a>
            <div class="text-group tracking-normal">
              <p class="!text-[13px] !mb-0 !leading-6">雲端服務資訊安全管理榮獲</p>
              <p class="!text-[13px] !mb-0 !leading-6">ISO/IEC 27017認證</p>
            </div>
          </div>
          <div class="app flex items-center lg:w-auto justify-between">
            <img :src="appL3" alt="appL3" class="object-contain max-h-9 mr-3 w-[67px] lg:w-auto" />
            <div class="text-group tracking-normal">
              <p class="!text-[13px] !mb-0 !leading-6">行動應用APP基本資安</p>
              <p class="!text-[13px] !mb-0 !leading-6">標章最高L3等級認證</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-10 lg:hidden"></div>
  </footer>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue';
import { isEmptyValue } from '@/shared/helpers/data-process';
import { focus, cooperation, app, qrCode, webMap } from './constant/footer';
import { appL3, isoIec, isoIec17, passkeyPledge } from '@/shared/constants/images-path';

// Types
interface FooterItem {
  name: string;
  link: string;
  id: string;
  blank?: string;
}

// Type guard
const isFooterItem = (item: string | FooterItem): item is FooterItem => {
  return typeof item === 'object' && 'name' in item;
};

// Helper function to filter footer items
const filterFooterItems = (items: (string | FooterItem)[]): FooterItem[] => {
  return items.filter((x): x is FooterItem => isFooterItem(x) && !isEmptyValue(x.name));
};

defineOptions({ name: 'FooterRWD' });

// Get global properties
const instance = getCurrentInstance();
const $screen = instance?.appContext.config.globalProperties.$screen as { isMobileSize: boolean } | undefined;

const activeSet = ref(new Set<number | string>());

// Computed filtered items
const filteredCooperation = computed(() => filterFooterItems(cooperation));

// Helper to get title from section
const getSectionTitle = (items: (string | FooterItem)[]): string => {
  return items[0] as string;
};

// methods
const toggleActive = (index: number | string) => {
  activeSet.value[activeSet.value.has(index) ? 'delete' : 'add'](index);
  activeSet.value = new Set(activeSet.value);
};

const checkMeetEslite = (data: string) => data === '迷誠品';
</script>

<style scoped>
/* ---------- base footer ---------- */

footer .button p {
  transform: rotate(90deg);
}

/* ---------- ≤ lg (max-lg) ---------- */
@screen max-lg {
  footer .line {
    @apply border-b border-b-dashed border-gray-100;
  }

  footer .mb-mb {
    @apply mb-0;
  }

  footer .button {
    /* 手機版展開 / 收合按鈕 */
    @apply block;
  }

  /* 手機：摺疊行為 */
  footer .footer-row ul {
    @apply hidden;
  }
  footer .footer-row.active .button p {
    transform: rotate(-90deg);
  }
  footer .footer-row.active ul {
    @apply block;
  }

  /*單獨拉出 手機：cooperation 摺疊行為 */
  footer .footer-row .cooperation ul {
    @apply hidden;
  }
  footer .footer-row .cooperation .button p {
    transform: rotate(-270deg);
  }
  footer .footer-row .cooperation.active .button p {
    transform: rotate(-90deg);
  }
  footer .footer-row .cooperation.active ul {
    @apply block;
  }

  footer ul li span {
    @apply text-gray-800 text-[17px] leading-[22px];
  }

  /* app icons (mobile) */
  footer .app li {
    @apply ml-1;
  }
  footer .app img {
    @apply max-h-[35.6px];
  }

  /* focus icons (mobile) */
  footer .focus li {
    @apply mr-4;
  }
  footer .focus li:last-child {
    @apply mr-0;
  }
  footer .focus img {
    @apply max-w-7 max-h-7;
  }
  .text-group {
    width: 160px;
  }
}

/* ---------- ≤ sm (max-sm) ---------- */
@screen max-sm {
  footer .app img {
    @apply max-w-[120px];
  }
}
</style>
