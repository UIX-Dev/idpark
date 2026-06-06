import Link from 'next/link';
import Footer from '@/components/Footer';

const TRUST = [
  { num: '자체 공장', lbl: '경남 직영 생산시설 — 납기·커스텀 대응' },
  { num: '협회 공인인증', lbl: '대한파크골프협회 인증 물품' },
  { num: '전국 납품', lbl: '지자체 구장 납품·설치 진행 중' },
  { num: '국내 생산', lbl: '설계부터 제작까지 일관 공정' },
];

const BUSINESS = [
  {
    ico: '🏭',
    title: '시설물 제조',
    desc: '홀컵·홀컵뚜껑, 티매트·티박스, 깃대·깃발, OB네트·로프, 공거치대·출발추첨기 등 구장 운영에 필요한 전 품목을 직접 생산합니다.',
    moreHref: '/facilities',
    moreLabel: '제품 카탈로그 →',
  },
  {
    ico: '🚧',
    title: '납품·시공',
    desc: '신규 조성 구장의 시설물 일괄 납품·설치는 물론, 기존 구장의 노후 시설 교체·보수까지. 조경·건설사 하도급 및 직접 납품 모두 대응합니다.',
    moreHref: '/contact',
    moreLabel: '시공 문의 →',
  },
  {
    ico: '🔧',
    title: '유지관리',
    desc: '납품으로 끝나지 않습니다. 정기 점검, 소모품 교체, 시즌 전 일제 정비 — 구장이 항상 대회 수준을 유지하도록 관리합니다.',
    moreHref: '/contact',
    moreLabel: '유지관리 상담 →',
  },
];

const PARTNER_DOCS = [
  {
    ico: '📐',
    title: '제품 스펙시트·도면',
    desc: '품목별 규격, 재질, 협회 규정 적합 여부를 정리한 PDF. 설계 내역서에 그대로 반영하실 수 있습니다.',
    moreHref: '/facilities',
    moreLabel: '다운로드 →',
  },
  {
    ico: '🏅',
    title: '인증서·시험성적서',
    desc: '대한파크골프협회 공인인증서 및 자재 시험성적서를 투명하게 공개합니다.',
    moreHref: '/facilities#cert',
    moreLabel: '확인하기 →',
  },
  {
    ico: '🗺️',
    title: '납품·시공 실적',
    desc: '연도·지역·품목별 납품 실적 리스트. 발주 심사·실적 증빙에 활용하세요.',
    moreHref: '/portfolio',
    moreLabel: '실적 보기 →',
  },
];

const STEPS = [
  { h: '견적 요청', p: '품목·수량·현장 정보를 보내주시면 24시간 내 회신드립니다.' },
  { h: '현장 협의', p: '도면 검토 또는 현장 실측 후 사양·납기를 확정합니다.' },
  { h: '자체 공장 생산', p: '경남 직영 공장에서 일정에 맞춰 생산합니다.' },
  { h: '납품·설치', p: '전국 어디든 직접 설치, 검수까지 책임집니다.' },
  { h: '사후 관리', p: '하자 대응과 정기 점검으로 구장 상태를 유지합니다.' },
  {
    h: '운영 솔루션 제안',
    p: '파크골프 문화가 발전하는 만큼, 예약·운영 앱 등 구장 운영에 필요한 새로운 서비스와 솔루션도 계속 제안드립니다.',
  },
  {
    h: '그리고, 계속',
    p: '아이디파크는 멈추지 않습니다. 늘 고민하고 성장하며, 더 나은 구장 구축을 위해 오늘도 노력합니다.',
  },
];

export default function Home() {
  return (
    <>
      {/* 히어로: 쇼핑몰이 아닌 인프라 파트너 선언 */}
      <div className="hero">
        <div className="wrap">
          <span className="eyebrow">파크골프 시설물 전문 제조기업</span>
          <h1>
            파크골프장을
            <br />
            만드는 회사, 아이디파크
          </h1>
          <p className="lead">
            홀컵 하나부터 18홀 코스 시설 전체까지 — 경남 자체 공장에서 직접 만들고, 전국
            파크골프장에 납품·시공합니다. 대한파크골프협회 공인인증 제품.
          </p>
          <div className="actions">
            <Link href="/contact" className="btn btn-primary">
              📋 견적 요청하기
            </Link>
            <Link href="/portfolio" className="btn btn-ghost">
              납품·시공 실적 보기
            </Link>
          </div>
        </div>
      </div>

      {/* 신뢰 지표 */}
      <div className="trust">
        <div className="wrap">
          {TRUST.map((t) => (
            <div className="t" key={t.num}>
              <div className="num">{t.num}</div>
              <div className="lbl">{t.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 사업 영역 */}
      <section>
        <div className="wrap">
          <div className="sec-label">BUSINESS</div>
          <h2 className="sec-title">사업 영역</h2>
          <p className="sec-desc">
            발주처와 조경·건설사가 필요로 하는 모든 단계를 한 회사에서 해결합니다.
          </p>
          <div className="cards">
            {BUSINESS.map((c) => (
              <div className="card reveal" key={c.title}>
                <div className="ico">{c.ico}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <Link className="more" href={c.moreHref}>
                  {c.moreLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 발주처/조경사를 위한 자료 */}
      <section className="alt">
        <div className="wrap">
          <div className="sec-label">FOR PARTNERS</div>
          <h2 className="sec-title">발주 담당자·조경사를 위한 자료실</h2>
          <p className="sec-desc">
            설계 단계에서 바로 내역서에 반영할 수 있도록 스펙·도면·인증서를 제공합니다.
          </p>
          <div className="cards">
            {PARTNER_DOCS.map((c) => (
              <div className="card reveal" key={c.title}>
                <div className="ico">{c.ico}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <Link className="more" href={c.moreHref}>
                  {c.moreLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 진행 프로세스 */}
      <section>
        <div className="wrap">
          <div className="sec-label">PROCESS</div>
          <h2 className="sec-title">견적부터 설치까지, 이렇게 진행됩니다</h2>
          <p className="sec-desc">
            나라장터 발주 프로젝트 동행 경험이 풍부합니다. 일정에 맞춘 납기를 약속합니다.
          </p>
          <div className="steps" style={{ marginTop: 30 }}>
            {STEPS.map((s) => (
              <div className="step reveal" key={s.h}>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <div className="callout reveal">
            💬 <b>이미 설계가 진행 중이신가요?</b> 내역서 작성 단계라면 품목별 스펙시트를 먼저
            받아보세요. 규격을 내역서에 반영해두시면 시공 단계가 빨라집니다. —{' '}
            <Link
              href="/contact"
              style={{ fontWeight: 800, color: 'var(--green-dark)', textDecoration: 'underline' }}
            >
              스펙시트 요청
            </Link>
          </div>
        </div>
      </section>

      {/* B2C 분리 배너: 동호인은 파크데이로 */}
      <section className="alt">
        <div className="wrap">
          <div className="b2c reveal">
            <div className="tx">
              <span className="badge b-o">파크골프 동호인이신가요?</span>
              <h3>
                클럽·용품 구매는 <span style={{ color: '#b9821a' }}>파크데이</span>에서
              </h3>
              <p>
                국내 자체공장 생산 프리미엄 클럽 ID-01 시리즈와 용품을 거품 없는 직영가로. 전화
                한 통이면 주문됩니다.
              </p>
            </div>
            {/* TODO: 파크데이 오픈 시 실제 URL로 교체 (parkday.kr) */}
            <a href="#" className="btn btn-orange">
              파크데이 바로가기 →
            </a>
          </div>
        </div>
      </section>

      {/* 마감 CTA */}
      <section>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="sec-title">구장 조성·시설 교체를 계획 중이신가요?</h2>
          <p className="sec-desc" style={{ margin: '0 auto 32px' }}>
            품목 리스트만 보내주셔도 됩니다. 견적은 무료입니다.
          </p>
          <Link href="/contact" className="btn btn-green" style={{ fontSize: 19, padding: '18px 40px' }}>
            📋 무료 견적 요청
          </Link>
        </div>
      </section>

      <Footer variant="full" />
    </>
  );
}
