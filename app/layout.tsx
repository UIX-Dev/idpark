import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: {
    default: '아이디파크 IDPARK — 파크골프장을 만드는 회사 | 시설물 제조·납품·시공',
    template: '%s — 아이디파크 IDPARK',
  },
  description:
    '파크골프 시설물 전문 제조기업 아이디파크. 자체 공장 직접 생산, 대한파크골프협회 공인인증. 홀컵·티매트·깃대·OB네트 납품 및 파크골프장 시공. 지자체·조경사 견적 환영.',
  keywords: [
    '파크골프 시설물',
    '파크골프장 시공',
    '홀컵 납품',
    '티매트',
    '파크골프장 조성',
    '파크골프 기구물',
    '아이디파크',
  ],
  openGraph: {
    title: '아이디파크 — 파크골프장을 만드는 회사',
    description:
      '자체 공장 생산 · 협회 공인인증 · 전국 납품·시공. 파크골프 인프라 파트너 아이디파크.',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/brand/idpark-favicon.png', type: 'image/png' }],
    apple: [{ url: '/brand/idpark-favicon.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
