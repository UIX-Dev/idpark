import Link from 'next/link';

/** 페이지에 따라 법인 정보 줄을 조금 다르게(메인은 상세) 표기할 수 있도록 variant 지원 */
export default function Footer({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div>
            <div className="flogo">IDPARK 아이디파크</div>
            <p style={{ opacity: 0.8, maxWidth: 340 }}>
              파크골프 시설물 전문 제조기업.
              <br />
              자체 공장 생산 · 대한파크골프협회 공인인증.
            </p>
          </div>
          <div>
            <h5>바로가기</h5>
            <Link href="/facilities">시설물·제품</Link>
            <Link href="/portfolio">납품·시공 실적</Link>
            <Link href="/company">회사소개</Link>
            <Link href="/contact">견적 요청</Link>
            <Link href="/parkday" className="foot-parkday">
              파크데이 <span>by IDPARK</span>
            </Link>
          </div>
          <div>
            <h5>문의</h5>
            <a href="tel:07074644466">📞 070-7464-4466</a>
            <a href="mailto:contact@idpark.kr">✉️ contact@idpark.kr</a>
            {variant === 'full' && (
              <p style={{ opacity: 0.7, fontSize: 13, marginTop: 8 }}>
                평일 10:00–17:00
                <br />
                (점심 12:00–13:00)
              </p>
            )}
          </div>
        </div>
        <div className="legal">
          {variant === 'full' ? (
            <>
              {/* TODO: 사업자 정보 실제 등기 정보와 일치하도록 최종 확인 */}
              아이디파크 · 대표 장문경 · 사업자등록번호 546-30-01574
              <br />
              경기도 고양시 덕양구 청초로 10, A동 11층 (덕은동) · 생산공장: 경상남도
              <br />© 2026 IDPARK. All rights reserved. ·{' '}
              <a href="#" style={{ display: 'inline' }}>
                이용약관
              </a>{' '}
              ·{' '}
              <a href="#" style={{ display: 'inline' }}>
                개인정보처리방침
              </a>
            </>
          ) : (
            <>
              아이디파크 · 대표 장문경 · 사업자등록번호 546-30-01574 · 경기도 고양시 덕양구
              청초로 10 · © 2026 IDPARK
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
