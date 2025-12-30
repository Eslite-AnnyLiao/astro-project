export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',  // CSS 嵌套支援
    tailwindcss: {},                           // Tailwind CSS 處理
    autoprefixer: {},                          // 自動加 CSS 前綴
  },
};