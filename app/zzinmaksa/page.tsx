import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '찐막사 — 진짜 마지막 사랑 | 아이디파크',
  description:
    '찐막사(진짜 마지막 사랑) — 이화. 공원에서 치고, 노래하고, 웃는 하루, 찐막사 파크데이. by 파크데이 · 아이디파크',
  openGraph: {
    title: '찐막사 — 진짜 마지막 사랑',
    description: '공원에서 치고, 노래하고, 웃는 하루 — 찐막사 파크데이',
    url: 'https://idpark.vercel.app/zzinmaksa',
    images: ['https://parkday.kr/assets/brand/og-banner.png'],
    type: 'music.song',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#FF7EC0' };

/* 찐막사 — 진짜 마지막 사랑 (이화 자작곡, 아이디파크 권리 보유)
   출처: zzinmaksa-handoff.md · 핑크 음악 랜딩 */

export default function ZzinmaksaPage() {
  return (
    <div className="zz">
      <div className="zz-wrap">
        {/* 히어로 */}
        <header className="zz-hero">
          <div className="zz-hearts" aria-hidden="true">
            <span>💗</span>
            <span>💜</span>
            <span>💖</span>
            <span>💕</span>
            <span>🩷</span>
          </div>
          <div className="zz-eyebrow">이화 · 자작곡</div>
          <h1 className="zz-title">
            찐<span className="hb">♥</span>막사
          </h1>
          <p className="zz-subt">진짜 마지막 사랑</p>
          {/* TODO: ▶ 들어보기 — 음원/유튜브 링크 연결 */}
          <a className="zz-play" href="#" aria-label="찐막사 들어보기">
            ▶ 들어보기
          </a>
        </header>

        {/* 가사 */}
        <section className="zz-block">
          <h2 className="zz-sec">가사</h2>
          <div className="zz-cap">찐막사 — 진짜 마지막 사랑</div>
          <div className="zz-ly">
            <span className="zz-lab">1절</span>
            {'\n한 번의 사랑은 가고\n두 번의 사랑도 가고\n세 번째 찾아온 그대\n내 마지막 사랑이여'}
          </div>
          <div className="zz-chorus">
            <span className="zz-lab">후렴</span>
            <div className="zz-ly" style={{ fontWeight: 800, color: '#fff' }}>
              {'찐막사, 내 진짜, 찐 사랑아\n이제는 다신 놓지 않을래\n찐막사, 내 진짜, 찐 사랑아\n당신과 영원히 함께할래'}
            </div>
          </div>
          <div className="zz-ly">
            <span className="zz-lab">2절</span>
            {'\n눈물의 강을 건너\n외로움의 산을 넘어\n드디어 만난 그대\n내 운명의 사랑이여'}
          </div>
          <div className="zz-ly">
            <span className="zz-lab">브릿지</span>
            {'\n이제 더는 방황 없네\n그대와 함께라면\n우리 둘이 걸어가는\n사랑의 길 영원하리'}
          </div>
          <p className="zz-repeat">— 후렴 반복 —</p>
        </section>

        {/* 찐막사 파크데이 (이벤트) */}
        <section style={{ padding: '0 0 8px' }}>
          <div className="zz-event">
            <h2>찐막사 파크데이</h2>
            <p>
              공원에서 치고, 노래하고,
              <br />
              동네 사람들과 웃는 하루
            </p>
            <div className="zz-fam">
              <b>찐막사 · 진짜 마지막 사랑</b>
              <b>찐막상 · 진짜 마지막 상</b>
              <b>찐막!</b>
            </div>
            <a className="zz-cta" href="https://parkday.kr">
              ⛳ 파크데이 보러가기
            </a>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="zz-foot">
          <div className="zz-links">
            <a href="https://parkday.kr" target="_blank" rel="noopener noreferrer">
              파크데이 parkday.kr
            </a>
            <a href="https://idpark.vercel.app" target="_blank" rel="noopener noreferrer">
              아이디파크 IDPARK
            </a>
          </div>
          <div className="zz-cr">
            좋은 날엔, 파크데이
            <br />ⓒ 2026 IDPARK
          </div>
        </footer>
      </div>
    </div>
  );
}
