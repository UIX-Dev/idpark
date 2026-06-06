import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: '견적 요청',
  description:
    '파크골프 시설물 납품·시공 견적 요청. 24시간 내 회신. 지자체·조경사·건설사 환영.',
};

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>견적 요청</h1>
          <p>
            품목 리스트, 내역서, 도면 — 어떤 형태든 좋습니다. 영업일 기준 24시간 내 회신드립니다.
          </p>
        </div>
      </div>

      <section>
        <div className="wrap contact-grid">
          <QuoteForm />

          <div>
            <div className="card reveal" style={{ marginBottom: 16 }}>
              <div className="ico">📞</div>
              <h3>전화가 빠릅니다</h3>
              <p>
                현장에서 급하신가요?
                <br />
                <b style={{ fontSize: 20, color: 'var(--green-dark)' }}>070-7464-4466</b>
                <br />
                평일 10:00–17:00 (점심 12–13시)
              </p>
            </div>
            <div className="card reveal">
              <div className="ico">📐</div>
              <h3>설계 단계라면</h3>
              <p>
                품목별 스펙시트를 먼저 받아 내역서에 반영하세요. 문의 구분에서 "자료 요청"을
                선택하시면 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
