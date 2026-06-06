# IDPARK 리브랜딩 사이트 v1 (2026-06-05)

기존 idpark.kr(임웹 쇼핑몰형)을 **"파크골프장을 만드는 회사"(B2G 인프라 파트너)** 콘셉트로 재구축한 정적 사이트.
근거: `C:\Claude\Projects\Branding\idpark\idpark_리브랜딩분석_06_05.md` (브랜드 분리·실적 가시화·B2G 키워드 SEO 전략)

## 구조
```
idpark/
├─ index.html        메인 — 히어로·신뢰지표·사업영역·프로세스·파크데이 배너
├─ facilities.html   시설물·제품 카탈로그 + 스펙시트/인증서 영역
├─ portfolio.html    납품·시공 실적 (필터 가능 테이블)
├─ company.html      회사소개·공장·브랜드 체계(IDPARK/파크데이)
├─ contact.html      견적 요청 폼 (현재 mailto 방식)
├─ css/style.css     공통 스타일
└─ js/main.js        모바일 내비·스크롤 리빌·실적 필터·폼 전송
```

## 디자인 원칙
- B2C 쇼핑몰 요소(TIME SALE, 장바구니) 전면 제거 — 발주처·조경사 눈높이
- B2C 용품은 "파크데이 by IDPARK" 배너로 분리 유도
- SEO: "파크골프 시설물", "파크골프장 시공", "홀컵 납품" 등 B2G 키워드 메타 적용

## 이미지 에셋 (2026-06-06 추가)
```
assets/
├─ product/, photo/   원본 (보존용 — 삭제 금지)
├─ std/               규격화 중간본 + 미리보기 시트
└─ img/               ★ 사이트에서 사용하는 최종 에셋
   ├─ products/       1200×1200 흰배경, 시각밀도 보정, 시맨틱 파일명 (50장)
   ├─ photos/         1600×900 크롭 가로형 브랜드 포토 (사용 여부 케이스별 판단)
   └─ MAPPING.md      원본 해시 ↔ 새 파일명 매핑표
```
facilities.html 상품 카드 9개에 img/products 적용 완료. 파일명은 시각 판독 기반이므로 오분류 발견 시 MAPPING.md 참조 후 정정.

## 오픈 전 교체 필요 (TODO 주석으로 표시됨)
1. **portfolio.html 실적 표** — 예시 데이터. 실제 구장명·연도·품목으로 교체 (가장 중요)
2. 저해상 원본 상품 사진 — 추후 재촬영본으로 교체 권장 (MAPPING.md 참고)
3. 공장 사진 — company.html 콜아웃 영역
4. 스펙시트 PDF 링크 — `href="#"` 교체
5. 견적 폼 — mailto → 폼메일러/서버 전송으로 교체 (js/main.js `submitQuote`)
6. 이메일 주소 — contact@idpark.kr 가정. 실제 주소로 통일
7. 파크데이 링크 — index.html B2C 배너 `href="#"` → 실제 URL (parkday.kr)
8. 사업자 정보 — 대표자·법인격 표기 최종 확인 (분석 보고서 §3 약점 5)

## 로컬 확인
브라우저에서 index.html 열기 (빌드 불필요, 의존성: Pretendard CDN뿐)
