import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import PortfolioTable from '@/components/PortfolioTable';

export const metadata: Metadata = {
  title: '납품·시공 실적',
  description:
    '아이디파크 전국 파크골프장 시설물 납품·설치·시공 실적. 연도·지역·품목별 실적 리스트.',
};

const SUPPORT_CARDS = [
  {
    ico: '🤝',
    title: '조경·건설사 협력',
    desc: '나라장터 수주 프로젝트의 시설물 파트너로 다수 참여. 도면 검토부터 설치·검수까지 원청 일정에 맞춰 움직입니다.',
  },
  {
    ico: '📑',
    title: '실적 증빙 지원',
    desc: '입찰·심사에 필요한 납품확인서, 거래명세서, 인증서 사본을 신속히 발급해 드립니다.',
  },
  {
    ico: '🔁',
    title: '교체 수요 상담',
    desc: '조성 후 5년 내외 구장의 시설물 교체 시기입니다. 현장 점검 후 우선순위별 교체 견적을 제안드립니다.',
  },
];

export default function PortfolioPage() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>납품·시공 실적</h1>
          <p>
            현재도 전국의 파크골프장에 납품·설치하고 있습니다. 발주 심사·실적 증빙용 상세 자료는
            견적 요청 시 제공됩니다.
          </p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="callout" style={{ marginTop: 0 }}>
            📌 <b>실적 데이터 안내</b> — 아래 표는 예시 형식입니다. 실제 납품·시공 내역으로 교체해
            주세요. 구장명·연도·품목 3개 열만 채워도 발주처 신뢰도가 크게 달라집니다.
          </div>

          <PortfolioTable />

          <div className="cards" style={{ marginTop: 48 }}>
            {SUPPORT_CARDS.map((c) => (
              <div className="card reveal" key={c.title}>
                <div className="ico">{c.ico}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
