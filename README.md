# IDPARK 사이트 (Next.js)

파크골프 시설물 전문 제조기업 **아이디파크(IDPARK)** 의 브랜드/회사 + 상품 카탈로그 사이트.
콘셉트: "파크골프장을 만드는 회사" (B2G 인프라 파트너). 직접 구매 없이 제품을 둘러보는 카탈로그 + 견적 요청 중심.

> 2026-06 정적 HTML 사이트(`index.html` 등)를 **Next.js 15 (App Router) + TypeScript** 로 리팩토링.
> 디자인(CSS)은 기존 그대로 유지.

## 기술 스택
- **Next.js 15** (App Router) — 페이지별 정적 프리렌더(SSG)로 SEO 최적화
- **TypeScript**
- 전역 CSS (`app/globals.css`) — 기존 `css/style.css` 그대로 이식
- 폰트: Pretendard (CDN)

## 실행
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
```

## 구조
```
app/
├─ layout.tsx          공통 레이아웃 — 헤더·메타데이터·Pretendard·스크롤 리빌
├─ globals.css         전역 스타일 (구 css/style.css)
├─ page.tsx            홈 — 히어로·신뢰지표·사업영역·프로세스·파크데이 배너
├─ facilities/page.tsx 시설물·제품 카탈로그
├─ portfolio/page.tsx  납품·시공 실적
├─ company/page.tsx    회사소개·브랜드 체계
└─ contact/page.tsx    견적 요청

components/
├─ Header.tsx          GNB (모바일 메뉴 토글 + 활성 링크) — 클라이언트
├─ Footer.tsx          푸터 (variant: compact | full)
├─ ScrollReveal.tsx    .reveal 스크롤 등장 애니메이션 — 클라이언트
├─ PortfolioTable.tsx  실적 표 + 카테고리 필터 — 클라이언트
└─ QuoteForm.tsx       견적 폼 (현재 mailto) — 클라이언트

lib/
├─ products.ts         상품 카탈로그 데이터 (타입 정의) — 새 품목은 여기에 추가
└─ portfolio.ts        납품 실적 데이터 (예시 — 실제 내역으로 교체 필요)

public/assets/img/      사이트에서 사용하는 이미지 (products/, photos/)
assets/                 원본 보존용 아카이브 (product_original/, photo_original/) — 서빙·배포 안 됨
```

## 콘텐츠 추가 가이드
- **상품 추가**: `lib/products.ts`의 `PRODUCT_GROUPS` 배열에 항목 추가. 이미지는 `public/assets/img/products/`에 넣고 경로를 `/assets/img/products/파일명` 으로 지정.
- **실적 추가**: `lib/portfolio.ts`의 `PORTFOLIO_ROWS` 배열 수정.

## 오픈 전 교체 필요 (코드에 TODO 주석으로 표시됨)
1. **실적 표** (`lib/portfolio.ts`) — 예시 데이터를 실제 구장명·연도·품목으로 교체 (가장 중요)
2. 스펙시트·인증서 PDF — `facilities/page.tsx`의 `href="#"` 링크 연결
3. 공장 사진 — `company/page.tsx` 콜아웃 영역
4. 견적 폼 — mailto → 서버 전송(API Route + 폼메일러)로 교체 (`components/QuoteForm.tsx`)
5. 파크데이 링크 — `app/page.tsx` B2C 배너 `href="#"` → 실제 URL (parkday.kr)
6. 사업자 정보 — 대표자·법인격·공장 주소 최종 확인
7. 저해상 원본 상품 사진 — 재촬영본으로 교체 권장 (`public/assets/img/MAPPING.md` 참고)
