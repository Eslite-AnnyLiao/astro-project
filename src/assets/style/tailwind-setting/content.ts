const isPrd = process.env.NODE_ENV === 'production';

const blockContent = [
  '!./src/pages/gift-ai/*.{vue,js}', // gift-ai 下架中，排除掃描
  '!./src/layouts/gift-ai.vue', // gift-ai 下架中，排除掃描
  '!./src/components/gift-ai/*.{vue,js}', // gift-ai 下架中，排除掃描
  '!./src/components/index/*.{vue,js}', // 舊首頁 component，排除掃描
  '!./src/components/home/index.vue', // 舊首頁 component，排除掃描
  '!./src/pages/event-embedded/index.vue', // event-embedded 下架，排除掃描
  ...(isPrd ? ['!./src/pages/sample/**/*.{vue,js}'] : []), // 在 production 的環境下，排除 sample
];
export const content = ['src/**/*.ts', 'src/**/*.vue', 'src/**/*.astro', 'src/**/*.js', ...blockContent];
