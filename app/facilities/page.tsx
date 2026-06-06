import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { PRODUCT_GROUPS } from '@/lib/products';

export const metadata: Metadata = {
  title: '시설물·제품 카탈로그',
  description:
    '파크골프 시설물 전 품목: 홀컵, 홀컵뚜껑, 티매트, 티박스, 깃대, 깃발, OB네트, 공거치대, 출발추첨기. 협회 규격 적합 · 스펙시트 제공.',
};

export default function FacilitiesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>시설물·제품 카탈로그</h1>
          <p>
            전 품목 자체 공장 생산 · 대한파크골프협회 규격 적합. 스펙시트는 설계 내역서에 그대로
            반영하실 수 있습니다.
          </p>
        </div>
      </div>

      <section>
        <div className="wrap">
          {PRODUCT_GROUPS.map((group, gi) => (
            <div key={group.label}>
              <div className="sec-label" style={gi > 0 ? { marginTop: 56 } : undefined}>
                {group.label}
              </div>
              <h2 className="sec-title">{group.title}</h2>
              <div className="prods" style={{ marginTop: 26 }}>
                {group.items.map((p) => (
                  <div className="prod reveal" key={p.name}>
                    <div className="ph">
                      <img src={p.img} alt={p.alt} loading="lazy" />
                    </div>
                    <div className="bd">
                      <span className={`badge${p.badgeGhost ? ' ghost' : ''}`}>{p.badge}</span>
                      <h4>{p.name}</h4>
                      <p className="ds">{p.desc}</p>
                      <div className="row">
                        {/* TODO: 스펙시트 PDF 업로드 후 링크 연결 */}
                        <a href="#" className="a-spec">
                          스펙시트
                        </a>
                        <Link href="/contact" className="a-quote">
                          견적
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 마지막 그룹 끝에 특수 제작 피처 카드 + 준비중 카드 */}
                {gi === PRODUCT_GROUPS.length - 1 && (
                  <>
                    <div className="prod-feature reveal">
                      <div className="fx">
                        <span className="badge">맞춤 제작</span>
                        <h4>특수 기구물 주문 제작</h4>
                        <p>
                          도면 한 장, 사진 한 장이면 시작됩니다. 자체 공장 보유 — 규격품에 없는
                          구장만의 기구물을 설계부터 제작·설치까지.
                        </p>
                        <div className="tags">
                          <span># 맞춤 안내판·조형물</span>
                          <span># 쉼터·대기석 기구</span>
                          <span># 행사·대회용 특수물</span>
                          <span># 소량 제작 OK</span>
                        </div>
                        <Link href="/contact" className="fbtn">
                          제작 문의하기 →
                        </Link>
                      </div>
                    </div>

                    <div className="prod-soon reveal">
                      <div className="se">📦</div>
                      <b>상품 준비중</b>
                      <small>새 품목이 곧 등록됩니다</small>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          <div id="cert" className="callout reveal" style={{ marginTop: 56 }}>
            🏅 <b>인증·시험성적서</b> — 당사 시설물은 대한파크골프협회 공인인증 물품입니다. 인증서
            사본과 자재 시험성적서는 견적 회신 시 함께 제공되며, 입찰 서류용 원본 대조본도
            지원합니다.
            {/* TODO: 인증서 PDF 업로드 후 다운로드 링크 연결 */}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
