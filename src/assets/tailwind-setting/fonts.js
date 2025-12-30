import defaultTheme from 'tailwindcss/defaultTheme';

export const fontFamily = {
  // 中英混合
  sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', '"Noto Sans TC"', '"PingFang TC"', '蘋方體', '"Microsoft JhengHei"', '微軟正黑體', 'sans-serif', ...defaultTheme.fontFamily.sans],
  // 中⽂文字體
  'sans-ch': ['"Noto Sans TC"', '"PingFang TC"', '蘋方體', '"Microsoft JhengHei"', '微軟正黑體', 'sans-serif', ...defaultTheme.fontFamily.sans],
  // 英⽂文字體
  'sans-en': ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif', ...defaultTheme.fontFamily.sans],
  icomoon: ['icomoon', 'sans-serif'],
  roboto: ['Roboto'],
};

export const fontSize = {
  ...defaultTheme.fontSize,
  base: '1rem', // 16px,
  h1: '1.75rem',
  h2: '1.55rem',
  h3: '1.35rem',
  h4: '1.25rem',
  h5: '1.1rem',
  h6: '1rem',
  small: '0.875rem',
  // from @mixin fontXX
  '12px': ['0.75rem', { lineHeight: '0.938rem' }],
  '13px': ['0.813rem', { lineHeight: '1.125rem' }],
  '14px': ['0.875rem', { lineHeight: '1.125rem' }],
  '15px': ['0.938rem', { lineHeight: '1.25rem' }],
  '16px': ['1rem', { lineHeight: '1.375rem' }],
  '17px': ['1.063rem', { lineHeight: '1.5rem' }],
  '18px': ['1.125rem', { lineHeight: '1.625rem' }],
  '19px': ['1.188rem', { lineHeight: '1.75rem' }],
  '20px': ['1.25rem', { lineHeight: '1.875rem' }],
  '22px': ['1.375rem', { lineHeight: '2rem' }],
  '23px': ['1.438rem', { lineHeight: '2.125rem' }],
  '24px': ['1.5rem', { lineHeight: '2.25rem' }],
  '26px': ['1.625rem', { lineHeight: '2.375rem' }],
  '30px': ['1.875rem', { lineHeight: '2.75rem' }],
  '32px': ['2rem', { lineHeight: '2.875rem' }],
  '34px': ['2.125rem', { lineHeight: '3.125rem' }],
  '40px': ['2.5rem', { lineHeight: '3.75rem' }],
  '43px': ['2.688rem', { lineHeight: '4rem' }],
};

export const fontVariantNumeric = {
  tabular: 'tabular-nums',
};
