import localFont from 'next/font/local';

export const heeboFont = localFont({
  src: [
    {
      path: '../assets/fonts/Heebo-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Heebo-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});