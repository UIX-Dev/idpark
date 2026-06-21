import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '찐막사 파크데이 — 공원에서 치고, 노래하고, 웃는 하루 | 아이디파크',
  description:
    '찐막사 파크데이 — 파크골프 한 바퀴 + 노래 한 곡 + 동네 시상까지. 대회가 아니라 동네 축제. 공원형 생활 예능 축제를 우리 동네 공원에서. by 파크데이 · 아이디파크',
  openGraph: {
    title: '찐막사 파크데이 — 공원형 생활 예능 축제',
    description: '공원에서 치고, 노래하고, 웃는 하루 — 찐막사 파크데이',
    url: 'https://idpark.vercel.app/zzinmaksa',
    type: 'website',
  },
};

/* 찐막사 파크데이 행사 소개 (핸드오프 §5: 공원형 생활 예능 축제) */

const PROGRAM = [
  {
    n: '1부',
    h: '파크골프 체험 · 미니게임',
    p: '처음이어도 괜찮아요. 가볍게 한 바퀴 돌고, 누구나 즐기는 미니게임으로 몸풀기.',
  },
  {
    n: '2부',
    h: '찐막사 노래자랑',
    p: '찐막사 1절만! 빠르게 진행되는 동네 노래자랑. 박수와 떼창으로 한바탕.',
  },
  {
    n: '3부',
    h: '동네 시상식',
    p: '찐막킹·찐막퀸·찐막골… 등수보다 재미. 모두가 주인공인 시상식.',
  },
];

const FAMILY = [
  { b: '찐막사', s: '진짜 마지막 사랑 · 행사 주제가(앤섬)' },
  { b: '찐막상', s: '진짜 마지막 상 · 대상 시상' },
  { b: '찐막킹 · 찐막퀸', s: '노래자랑 우승자' },
  { b: '찐막골', s: '홀인원 · 퍼팅상' },
  { b: '찐막샷', s: '포토존 인증샷' },
  { b: '찐막콜', s: '전화 주문 · 행사 등록' },
  { b: '찐막팬', s: '매번 나오는 단골 · 응원하고 거드는 서포터즈' },
  { b: '찐막밥', s: '행사 끝나고 다같이 나누는 잔치 한 끼' },
];

export default function ZzinmaksaPage() {
  return (
    <div className="zev">
      {/* 히어로 */}
      <div className="zev-hero">
        <div className="wrap">
          <span className="eyebrow">🎪 IDPARK · 파크데이 행사</span>
          <h1>찐막사 파크데이</h1>
          <p className="zev-slogan">공원에서 치고, 노래하고, 웃는 하루</p>
          <p className="lead">
            파크골프 한 바퀴 + 노래 한 곡 + 동네 사람들과 웃는 하루. <b>대회가 아니라 축제예요.</b>{' '}
            우리 동네 공원에서 여는 공원형 생활 예능 축제, 찐막사 파크데이.
          </p>
          <div className="actions">
            <a href="tel:07074644466" className="btn zev-btn-primary">
              📞 행사·협력 문의
            </a>
            <a href="https://parkday.kr" className="btn zev-btn-ghost" target="_blank" rel="noreferrer">
              ⛳ 파크데이 보러가기
            </a>
          </div>
        </div>
      </div>

      {/* 행사 소개 */}
      <section>
        <div className="wrap">
          <div className="sec-label">ABOUT</div>
          <h2 className="sec-title">대회가 아니라, 동네 축제예요</h2>
          <p className="sec-desc">
            잘 치는 사람을 가리는 자리가 아니라, 함께 나와 즐기는 자리예요. 파크골프가 처음인
            어르신도, 동네 이웃도 가볍게 나와 한바탕 웃고 갑니다. 크게 시작하지 않아요 —{' '}
            <b>한 개 공원 파일럿</b>으로 작게 검증하며 키웁니다.
          </p>
        </div>
      </section>

      {/* 3부 프로그램 */}
      <section className="alt">
        <div className="wrap">
          <div className="sec-label">PROGRAM</div>
          <h2 className="sec-title">하루 3부 구성</h2>
          <p className="sec-desc">치고 → 노래하고 → 시상까지. 한나절이면 충분합니다.</p>
          <div className="cards">
            {PROGRAM.map((p) => (
              <div className="card" key={p.n}>
                <div className="zev-num">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 찐막 패밀리 */}
      <section>
        <div className="wrap">
          <div className="sec-label">BRAND</div>
          <h2 className="sec-title">찐막 패밀리</h2>
          <p className="sec-desc">
            외우기 쉬운 “찐막 + 한 글자”. 행사 곳곳에서 쓰는 우리만의 브랜드 언어예요.
          </p>
          <div className="zev-fam">
            {FAMILY.map((f) => (
              <div className="f" key={f.b}>
                <b>{f.b}</b>
                <span>{f.s}</span>
              </div>
            ))}
          </div>
          <div className="zev-chant">📣 떼창 구호 — MC “찐~막!” / 다같이 “사랑!” · 엔딩은 “찐! 막! 사!”</div>
        </div>
      </section>

      {/* 파크데이 연결 */}
      <section className="alt">
        <div className="wrap">
          <div className="zev-pd">
            <h3>찐막사는 파크데이와 함께</h3>
            <p>행사 예약·구장 정보·용품은 파크데이에서. 좋은 날엔, 파크데이.</p>
            <a
              href="https://parkday.kr"
              className="btn zev-btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              ⛳ 파크데이 바로가기
            </a>
          </div>
        </div>
      </section>

      {/* 마감 CTA — 지자체·구장 협력 */}
      <section>
        <div className="wrap">
          <div className="zev-cta">
            <h2>우리 동네 공원에서 열어볼까요?</h2>
            <p>
              지자체·구장·동호회와 함께 여는 작은 축제부터. 일정·장소만 알려주셔도 됩니다. 상담은
              무료예요.
            </p>
            <a
              href="tel:07074644466"
              className="btn zev-btn-primary"
              style={{ fontSize: 18, padding: '16px 36px' }}
            >
              📞 행사·협력 문의
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
