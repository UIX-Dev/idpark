export type Product = {
  img: string;
  alt: string;
  /** 배지 텍스트 */
  badge: string;
  /** true면 배지를 숨김 처리(레이아웃 정렬용 빈 배지) */
  badgeGhost?: boolean;
  name: string;
  desc: string;
};

export type ProductGroup = {
  /** 영문 섹션 라벨 (예: GREEN & HOLE) */
  label: string;
  /** 한글 섹션 제목 */
  title: string;
  items: Product[];
};

/**
 * 상품 카탈로그 데이터.
 * 새 품목 추가 시 이 배열에만 항목을 넣으면 facilities 페이지에 자동 반영됩니다.
 * 이미지 경로는 /public 기준 (public/assets/img/products/...).
 */
export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    label: 'GREEN & HOLE',
    title: '홀·그린 시설',
    items: [
      {
        img: '/assets/img/products/holecup-green.jpg',
        alt: '파크골프 홀컵',
        badge: '협회 규격',
        name: '홀컵 (스틸/보급형)',
        desc: '지름 20cm 규격 · 그린 지면 1cm 매립형',
      },
      {
        img: '/assets/img/products/holecup-blue.jpg',
        alt: '파크골프 홀컵 뚜껑',
        badge: '협회 규격',
        name: '홀컵 뚜껑',
        desc: '우천·야간 보호용 · 홀컵 전 모델 호환',
      },
      {
        img: '/assets/img/products/flag-set.jpg',
        alt: '파크골프 깃대 깃발',
        badge: '협회 규격',
        name: '깃대·깃발',
        desc: '홀번호 인쇄 · 내후성 원단 · 교체형 구조',
      },
      {
        img: '/assets/img/products/hole-cutter-1.jpg',
        alt: '홀커터',
        badge: '규격',
        badgeGhost: true,
        name: '홀커터',
        desc: '그린 홀 시공·이설용 전문 공구',
      },
    ],
  },
  {
    label: 'TEE & COURSE',
    title: '티잉·코스 시설',
    items: [
      {
        img: '/assets/img/products/teemat.jpg',
        alt: '파크골프 티매트 티박스',
        badge: '협회 규격',
        name: '티매트·티박스',
        desc: '1.5×1.5~2×2m · 고무 5mm+ 인조잔디 접착',
      },
      {
        img: '/assets/img/products/obrope-pin-net.jpg',
        alt: 'OB네트 OB로프 고정핀',
        badge: '규격',
        badgeGhost: true,
        name: 'OB네트·OB로프',
        desc: '8/10mm 로프 · 지지대·고정핀 일괄 공급',
      },
      {
        img: '/assets/img/products/ball-rack-field.jpg',
        alt: '공거치대 출발추첨기',
        badge: '규격',
        badgeGhost: true,
        name: '공거치대·출발추첨기',
        desc: '원형식·터널식·확장형 — 구장 동선에 맞춤',
      },
      {
        img: '/assets/img/products/club-stand-rack.jpg',
        alt: '채걸이대',
        badge: '규격',
        badgeGhost: true,
        name: '채걸이대 (나무/스텐)',
        desc: '대기 공간·클럽 보관용 · 야외 내구 마감',
      },
      {
        img: '/assets/img/products/sign-red.jpg',
        alt: '홀안내판 코스 사인',
        badge: '규격',
        badgeGhost: true,
        name: '홀안내판·코스 사인',
        desc: '홀 정보·코스 맵 · 발주처 디자인 반영 제작',
      },
    ],
  },
];
