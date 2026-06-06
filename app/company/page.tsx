import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '회사소개',
  description:
    '아이디파크는 서울 본사와 경남 자체 공장을 보유한 파크골프 시설물 전문 제조기업입니다.',
};

const WHY = [
  {
    ico: '🏭',
    title: '경남 자체 생산공장',
    desc: '외주 없이 직접 생산합니다. 급한 납기, 구장별 맞춤 사양, 소량 추가 발주 — 유통사는 못 하는 대응이 가능합니다.',
  },
  {
    ico: '💰',
    title: '거품 없는 직영가',
    desc: '중간 유통 단계가 없어 같은 품질이면 더 합리적인 견적이 나옵니다. 공공 예산에 맞춘 사양 조정도 제안드립니다.',
  },
  {
    ico: '🛡️',
    title: '하자에 끝까지 책임',
    desc: '만든 사람이 고치는 것이 가장 빠릅니다. 자체 생산이기에 부품 단위 교체·보수가 즉시 가능합니다.',
  },
];

const INFO: { label: string; value: React.ReactNode }[] = [
  { label: '상호', value: '아이디파크 (IDPARK)' },
  { label: '대표', value: '장문경' },
  { label: '사업자등록번호', value: '546-30-01574' },
  { label: '본사', value: '경기도 고양시 덕양구 청초로 10, A동 11층 (덕은동)' },
  { label: '생산공장', value: '경상남도' /* TODO: 공장 주소 확정 표기 */ },
  { label: '인증', value: '대한파크골프협회 공인인증 물품' },
  { label: '대표전화', value: '070-7464-4466 (평일 10:00–17:00)' },
  { label: '이메일', value: 'contact@idpark.kr' },
];

export default function CompanyPage() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>만드는 회사가 다릅니다</h1>
          <p>
            아이디파크는 유통사가 아니라 제조사입니다. 설계, 생산, 설치, 사후관리까지 한 회사가
            책임집니다.
          </p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="sec-label">WHY IDPARK</div>
          <h2 className="sec-title">직접 만들기 때문에 가능한 것들</h2>
          <div className="cards" style={{ marginTop: 30 }}>
            {WHY.map((c) => (
              <div className="card reveal" key={c.title}>
                <div className="ico">{c.ico}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* TODO: 공장 실사 사진·생산 공정 사진 추가 — "직접 제조"의 증거가 핵심 */}
          <div className="callout reveal">
            📷 <b>생산 현장</b> — 공장 전경·생산 공정 사진이 들어갈 영역입니다. 발주처가 가장
            신뢰하는 콘텐츠이니 실사 촬영을 권장합니다.
          </div>

          <div className="sec-label" style={{ marginTop: 56 }}>
            COMPANY
          </div>
          <h2 className="sec-title">회사 정보</h2>
          <table className="list reveal" style={{ marginTop: 24, maxWidth: 680 }}>
            <tbody>
              {INFO.map((row) => (
                <tr key={row.label}>
                  <th style={{ width: 140 }}>{row.label}</th>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="sec-label" style={{ marginTop: 56 }}>
            BRAND
          </div>
          <h2 className="sec-title">IDPARK 브랜드 체계</h2>
          <div className="cards" style={{ marginTop: 26 }}>
            <div className="card reveal">
              <div className="ico">🏗️</div>
              <h3>IDPARK</h3>
              <p>
                시설물 제조·납품·시공. 지자체와 조경·건설사를 위한 파크골프 인프라 파트너 — 지금
                보고 계신 사이트입니다.
              </p>
            </div>
            <div className="card reveal">
              <div className="ico">🟠</div>
              <h3>
                파크데이 <span style={{ fontSize: 13, color: 'var(--sub)' }}>by IDPARK</span>
              </h3>
              <p>
                동호인을 위한 용품 구매·모임 서비스. 큰 글씨, 한눈에 보는 단가표, 전화 주문 —
                시니어를 위해 설계했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
