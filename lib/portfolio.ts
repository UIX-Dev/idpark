export type PortfolioCategory = 'new' | 'supply' | 'repair';

export type PortfolioRow = {
  year: string;
  place: string;
  cat: PortfolioCategory;
  catLabel: string;
  content: string;
};

export const CATEGORY_FILTERS: { key: PortfolioCategory | 'all'; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'new', label: '신규 조성' },
  { key: 'supply', label: '시설물 납품' },
  { key: 'repair', label: '교체·보수' },
];

/**
 * ⚠️ 아래는 사이트 구조를 보여주기 위한 예시 데이터입니다.
 * 실제 납품·시공 내역(구장명·연도·품목)으로 반드시 교체하세요.
 */
export const PORTFOLIO_ROWS: PortfolioRow[] = [
  {
    year: '2026',
    place: '○○시 △△천 파크골프장 (예시)',
    cat: 'new',
    catLabel: '신규 조성',
    content: '18홀 시설물 일괄 — 홀컵·티매트·깃대·OB네트·안내판',
  },
  {
    year: '2026',
    place: '□□군 파크골프장 (예시)',
    cat: 'supply',
    catLabel: '시설물 납품',
    content: '공거치대·출발추첨기·채걸이대',
  },
  {
    year: '2025',
    place: '◇◇시 강변 파크골프장 (예시)',
    cat: 'repair',
    catLabel: '교체·보수',
    content: '노후 티매트 36개소 전면 교체',
  },
  {
    year: '2025',
    place: '☆☆구 생활체육공원 (예시)',
    cat: 'supply',
    catLabel: '시설물 납품',
    content: '홀컵·홀컵뚜껑·깃발 일괄 납품',
  },
  {
    year: '2025',
    place: '▽▽군 9홀 구장 (예시)',
    cat: 'new',
    catLabel: '신규 조성',
    content: '조경사 협력 — 코스 시설물 설치 일체',
  },
  {
    year: '2024',
    place: '◎◎시 체육공원 (예시)',
    cat: 'repair',
    catLabel: '교체·보수',
    content: 'OB로프·지지대 보수, 안내판 교체',
  },
];
