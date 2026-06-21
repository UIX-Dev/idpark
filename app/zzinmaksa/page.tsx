import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '찐막사 — 트로트 행사 기획·섭외·운영 | IDPARK',
  description:
    '지역 축제부터 경로잔치·기업 행사까지. 트로트 가수 섭외·MC·음향·무대·기획·운영을 한 번에. 찐막사 by IDPARK. (※ 페이지 준비 중)',
};

/* ⚠️ 스캐폴드 페이지 — 카피·이미지·연락처는 추후 실제 자료로 교체 */

const SERVICES = [
  { ico: '🎤', title: '가수 섭외', desc: '트로트·성인가요 가수 섭외. 예산·규모에 맞춰 라인업을 제안합니다.' },
  { ico: '🎙️', title: 'MC · 진행', desc: '행사 성격에 맞는 전문 MC와 진행 구성으로 분위기를 끌어올립니다.' },
  { ico: '🔊', title: '음향 · 조명', desc: '야외·실내 어디든 안정적인 음향과 무대 조명을 세팅합니다.' },
  { ico: '🎪', title: '무대 · 설비', desc: '무대·천막·의자 등 행사에 필요한 설비를 일괄 준비합니다.' },
  { ico: '🎉', title: '행사 기획 · 운영', desc: '식순 구성부터 당일 현장 운영까지 처음부터 끝까지 책임집니다.' },
  { ico: '🧓', title: '경로 · 효도잔치', desc: '어르신을 위한 경로잔치·효도행사를 정겹고 따뜻하게 꾸립니다.' },
];

const STEPS = [
  { h: '문의', p: '행사 일정·장소·예산을 알려주시면 빠르게 회신드립니다.' },
  { h: '상담 · 견적', p: '규모와 예산에 맞춰 라인업·구성·견적을 제안합니다.' },
  { h: '섭외 · 준비', p: '가수·MC 섭외와 음향·무대 설비를 사전 준비합니다.' },
  { h: '행사 진행', p: '당일 현장 운영까지 직접 챙겨 매끄럽게 진행합니다.' },
  { h: '마무리', p: '철수·정산까지 깔끔하게. 다음 행사도 함께합니다.' },
];

export default function ZzinmaksaPage() {
  return (
    <div className="zm">
      {/* 히어로 */}
      <div className="zm-hero">
        <div className="wrap">
          <span className="eyebrow">🎵 IDPARK 행사사업부 · 트로트</span>
          <h1>찐막사</h1>
          <p className="zm-slogan">무대가 필요한 모든 순간, 찐하게.</p>
          <p className="lead">
            지역 축제부터 경로잔치, 기업 행사까지 — 트로트 가수 섭외·MC·음향·무대·기획·운영을 한
            번에 맡깁니다. <b>(※ 소개 문구는 추후 확정)</b>
          </p>
          <div className="actions">
            <a href="tel:07074644466" className="btn zm-btn-primary">
              📞 행사 문의하기
            </a>
            <a href="#gallery" className="btn zm-btn-ghost">
              진행 사례 보기
            </a>
          </div>
        </div>
      </div>

      {/* 소개 */}
      <section>
        <div className="wrap">
          <div className="sec-label">ABOUT</div>
          <h2 className="sec-title">찐막사는 이런 일을 합니다</h2>
          <p className="sec-desc">
            행사 한 번에 필요한 모든 것 — 가수·MC·음향·무대·기획을 한 팀이 챙깁니다. 여러 업체를
            따로 부를 필요 없이, 찐막사 한 곳이면 됩니다. <b>(예시 문구)</b>
          </p>
        </div>
      </section>

      {/* 행사 종류 */}
      <section className="alt">
        <div className="wrap">
          <div className="sec-label">SERVICES</div>
          <h2 className="sec-title">행사 종류</h2>
          <p className="sec-desc">규모와 예산에 맞춰, 필요한 만큼만 골라 맡기실 수 있습니다.</p>
          <div className="cards">
            {SERVICES.map((s) => (
              <div className="card" key={s.title}>
                <div className="ico">{s.ico}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 진행 프로세스 */}
      <section>
        <div className="wrap">
          <div className="sec-label">PROCESS</div>
          <h2 className="sec-title">문의부터 행사까지, 이렇게 진행됩니다</h2>
          <p className="sec-desc">처음 맡기셔도 걱정 없도록, 전 과정을 함께합니다.</p>
          <div className="steps" style={{ marginTop: 30 }}>
            {STEPS.map((s) => (
              <div className="step" key={s.h}>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 진행 사례 (준비중) */}
      <section className="alt" id="gallery">
        <div className="wrap">
          <div className="sec-label">GALLERY</div>
          <h2 className="sec-title">진행 사례</h2>
          <p className="sec-desc">행사 사진·영상은 준비되는 대로 등록됩니다.</p>
          <div className="zm-gallery">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="zm-shot" key={i}>
                <span className="e">🎤</span>
                <b>사례 준비중</b>
                <small>사진·영상 추후 등록</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 마감 CTA */}
      <section>
        <div className="wrap">
          <div className="zm-cta">
            <h2>행사 일정이 잡히셨나요?</h2>
            <p>날짜와 장소만 알려주셔도 됩니다. 상담·견적은 무료입니다.</p>
            <a
              href="tel:07074644466"
              className="btn zm-btn-primary"
              style={{ fontSize: 18, padding: '16px 36px' }}
            >
              📞 무료 상담 · 견적
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
