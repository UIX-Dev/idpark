import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '파크데이 PARKDAY — 우리 동네 파크골프, 더 쉽게',
  description:
    '가까운 파크골프장·동호회·용품을 한 번에. 한눈에 보는 단가표, 전화 한 통 주문, 우리 동네 모임. 파크데이 by IDPARK — 웹·App Store·Google Play.',
};

/* 일반적인 플랫폼 아이콘 (generic) */
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.4 1.4c0 1.1-.4 2.2-1.1 3-.8.9-2.1 1.6-3.1 1.5-.1-1.1.4-2.2 1.1-2.9.7-.9 2-1.5 3.1-1.6zM20.5 17.2c-.5 1.3-.8 1.8-1.5 3-1 1.6-2.4 3.5-4.1 3.5-1.5 0-1.9-1-4-1s-2.5 1-4 1c-1.7 0-3-1.8-4-3.3C-.1 16.9-.4 11.5 2.3 8.9c1-1.1 2.4-1.7 3.9-1.7 1.6 0 2.5 1 3.8 1 1.2 0 2-1 3.8-1 1.3 0 2.7.7 3.7 1.9-3.2 1.8-2.7 6.4.1 8.1z" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 2.5v19l15-9.5z" />
    </svg>
  );
}

const STORES = [
  { sub: '브라우저에서 바로', name: '웹으로 시작', icon: <GlobeIcon />, href: '/parkday-app/index.html' },
  { sub: 'iPhone · iPad', name: 'App Store', icon: <AppleIcon />, href: '#' },
  { sub: 'Android', name: 'Google Play', icon: <PlayIcon />, href: '#' },
];

const FEATURES = [
  { em: '📋', h: '한눈에 보는 단가표', p: '클럽·공·가방 가격을 표 하나로 비교. 표시된 가격이 전부, 숨은 비용 없어요.' },
  { em: '📞', h: '전화 한 통이면 주문', p: '복잡한 결제 없이 버튼 하나. 사람이 받아 장비까지 함께 봐드려요.' },
  { em: '👥', h: '우리 동네 모임', p: '가까운 동호회 라운드 일정을 보고 신청해요. 함께 치면 더 즐겁습니다.' },
  { em: '⛳', h: '내 주변 파크골프장', p: '가까운 구장을 거리순으로. 위치·홀 수·이용료를 또렷하게.' },
  { em: '🔍', h: '큰 글자, 또렷한 화면', p: '글자 크기를 마음대로. 누구나 가볍게 쓰도록 설계했어요.' },
  { em: '💚', h: '공장 직영가', p: '경남 자체 공장 직접 생산 · 대한파크골프협회 공인인증. 거품 없는 가격.' },
];

export default function ParkdayPage() {
  return (
    <>
      {/* 히어로 */}
      <div className="pd-hero">
        <div className="wrap">
          <div className="pd-herogrid">
            <div>
              <span className="pd-tag">
                <img src="/brand/parkday-mark.svg" alt="" />
                PARKDAY · by IDPARK
              </span>
              <h1>
                좋은 날엔,
                <br />
                <span className="lime">파크데이</span>
              </h1>
              <p className="pd-lead">
                가까운 파크골프장과 동호회, 용품까지 — 앱 하나로 가볍게. 우리 동네 파크골프, 더
                쉽게 시작해보세요.
              </p>
              <div className="pd-stores">
                {STORES.map((s) => (
                  // TODO: 서비스 오픈 시 실제 스토어/웹 URL로 교체
                  <a href={s.href} className="pd-store" target={s.href.startsWith('/') ? '_blank' : undefined} rel="noreferrer" key={s.name}>
                    {s.icon}
                    <span>
                      <small>{s.sub}</small>
                      <b>{s.name}</b>
                    </span>
                  </a>
                ))}
              </div>
              <p className="pd-storenote">* 웹·앱 어디서나 같은 화면 · 서비스 오픈 준비 중</p>
            </div>

            {/* 실제 파크데이 앱 임베드 (live) */}
            <div className="pd-phonewrap">
              <div className="pd-phone">
                <div className="pd-screen">
                  <iframe
                    src="/parkday-app/index.html"
                    title="파크데이 앱 미리보기"
                    loading="lazy"
                  />
                </div>
              </div>
              <a
                className="pd-openapp"
                href="/parkday-app/index.html"
                target="_blank"
                rel="noreferrer"
              >
                앱 전체 화면으로 열기 ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 기능 소개 */}
      <section className="pd-sec">
        <div className="wrap">
          <div className="lbl">WHAT YOU CAN DO</div>
          <h2>파크데이에서 이런 걸 할 수 있어요</h2>
          <p className="d">
            가볍게 나가서, 즐겁게 한 바퀴. 구장 찾기부터 모임, 용품까지 한 곳에서.
          </p>
          <div className="pd-cards">
            {FEATURES.map((f) => (
              <div className="pd-card reveal" key={f.h}>
                <div className="em">{f.em}</div>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 신뢰 배너 */}
      <section className="pd-sec alt">
        <div className="wrap">
          <div className="pd-trust reveal">
            <img src="/brand/parkday-logo.png" alt="파크데이 PARKDAY" className="pd-trust-logo" />
            <p>
              <b>파크데이는 아이디파크가 만듭니다.</b> 경남 자체 공장 직접 생산 · 대한파크골프협회
              공인인증 제품. 만드는 회사가 직접 운영하는 서비스예요.
            </p>
          </div>
        </div>
      </section>

      {/* 마감 CTA */}
      <div className="pd-cta">
        <div className="wrap">
          <img src="/brand/parkday-mark.svg" alt="" className="pd-cta-mark" />
          <h2>
            좋은 날엔, <span className="lime">파크데이</span>
          </h2>
          <p>오늘 한 바퀴, 가볍게 나가볼까요?</p>
          <div className="pd-stores" style={{ justifyContent: 'center' }}>
            {STORES.map((s) => (
              <a href={s.href} className="pd-store" target={s.href.startsWith('/') ? '_blank' : undefined} rel="noreferrer" key={s.name}>
                {s.icon}
                <span>
                  <small>{s.sub}</small>
                  <b>{s.name}</b>
                </span>
              </a>
            ))}
          </div>
          <div className="pd-byline">PARKDAY by IDPARK</div>
          <Link href="/" className="pd-back">
            ← 아이디파크(IDPARK) 홈으로
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
