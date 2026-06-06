// ============================================
// PARKDAY 목 데이터 v1.1 (2026-06-06)
// 실서비스에서는 API(parkday.kr)로 교체 — 웹에서 수정하면
// PWA/TWA/iOS 래퍼 모두 즉시 반영되는 구조
// 좌표·요금은 프로토타입용 근사값. 오픈 전 실데이터로 교체
// ============================================

const COURSES = [
  { id: 1, name: '한강 파크골프장', region: '서울 광진구', lat: 37.5326, lng: 127.0698, holes: 18, fee: '무료', feeNote: '서울시 공공예약 추첨제', reserve: 'online', reserveUrl: 'https://yeyak.seoul.go.kr', phone: '02-000-0001', hours: '06:00~18:00 (월요일 정비휴장)', notice: '서울시 공공서비스예약에서 매월 추첨. 협회 회원증 지참.' },
  { id: 2, name: '잠실 파크골프장', region: '서울 송파구', lat: 37.5180, lng: 127.0721, holes: 9, fee: '무료', feeNote: '서울시 공공예약', reserve: 'online', reserveUrl: 'https://yeyak.seoul.go.kr', phone: '02-000-0002', hours: '06:00~18:00', notice: '보이스파크 앱 현장 체크인 도입 구장.' },
  { id: 3, name: '서남센터 파크골프장', region: '서울 강서구', lat: 37.5666, lng: 126.8265, holes: 18, fee: '무료', feeNote: '서울시 공공예약', reserve: 'online', reserveUrl: 'https://yeyak.seoul.go.kr', phone: '02-000-0003', hours: '06:00~18:00', notice: '물재생센터 부지 — 우천 시 휴장 잦음.' },
  { id: 4, name: '대덕 파크골프장', region: '고양시 덕양구', lat: 37.6310, lng: 126.8120, holes: 18, fee: '5,000원', feeNote: '고양시민 50% 할인', reserve: 'phone', reserveUrl: '', phone: '031-000-0004', hours: '06:00~18:00', notice: '전화 예약 후 현장 결제. 단체(8인+)는 1주 전 예약.' },
  { id: 5, name: '행주 파크골프장', region: '고양시 덕양구', lat: 37.6005, lng: 126.8235, holes: 9, fee: '3,000원', feeNote: '', reserve: 'onsite', reserveUrl: '', phone: '031-000-0005', hours: '06:00~17:00', notice: '현장 접수 선착순. 주말 오전 혼잡.' },
  { id: 6, name: '안양천 파크골프장', region: '서울 양천구', lat: 37.5152, lng: 126.8666, holes: 9, fee: '무료', feeNote: '', reserve: 'onsite', reserveUrl: '', phone: '02-000-0006', hours: '일출~일몰', notice: '하천부지 — 장마철 침수 시 폐장.' },
  { id: 7, name: '미사리 파크골프장', region: '하남시', lat: 37.5705, lng: 127.1850, holes: 36, fee: '6,000원', feeNote: '하남시민 할인', reserve: 'online', reserveUrl: 'https://www.hanam.go.kr', phone: '031-000-0007', hours: '06:00~18:00', notice: '36홀 대형 구장. 대회 개최 시 일부 코스 통제.' },
  { id: 8, name: '의정부 파크골프장', region: '의정부시', lat: 37.7380, lng: 127.0450, holes: 18, fee: '4,000원', feeNote: '', reserve: 'phone', reserveUrl: '', phone: '031-000-0008', hours: '06:00~18:00', notice: '중랑천변. 겨울철 단축 운영.' },
  { id: 9, name: '대구 금호강 파크골프장', region: '대구 북구', lat: 35.9180, lng: 128.5950, holes: 27, fee: '무료', feeNote: '대구파크골프 예약시스템', reserve: 'online', reserveUrl: 'https://dgpg.daegu.go.kr', phone: '053-000-0009', hours: '06:00~18:00', notice: '대구시 통합예약시스템 사용.' },
  { id: 10, name: '부산 삼락 파크골프장', region: '부산 사상구', lat: 35.1796, lng: 128.9750, holes: 36, fee: '무료', feeNote: '', reserve: 'onsite', reserveUrl: '', phone: '051-000-0010', hours: '06:00~18:00', notice: '낙동강변 대형 구장.' },
];

// 상품 — 이미지: 기존 idpark.kr 실상품 사진(규격화본) / 가격: price 숫자 또는 null(전화 문의)
// TODO: 오픈 전 실제 판매가로 확정
const PRODUCTS = [
  { id: 'c01', cat: 'club', name: 'ID-01 프리미엄 클럽', spec: '국내 자체공장 생산 · 단풍나무 헤드 · 선수용', price: 1150000, img: 'img/club-head-round-1.jpg' },
  { id: 'c02', cat: 'club', name: 'ID 클럽 (우드 헤드)', spec: '국내생산 · 중급~상급', price: null, img: 'img/club-head-round-2.jpg' },
  { id: 'c03', cat: 'club', name: 'ID 클럽 (스탠다드)', spec: '입문~중급 추천 · 카본 샤프트', price: null, img: 'img/club-blue-shaft.jpg' },
  { id: 'c04', cat: 'club', name: 'ID 클럽 (네이비)', spec: '경량 설계 · 여성 추천', price: null, img: 'img/club-navy.jpg' },
  { id: 'c05', cat: 'club', name: '입문 클럽 2종 세트', spec: '클럽 + 보호 케이스 구성', price: null, img: 'img/club-pair.jpg' },
  { id: 'b01', cat: 'ball', name: '3P 전용 공 세트', spec: '협회 공인 · 고탄성 · 3색 구성', price: 35000, img: 'img/ball-3p-set.jpg' },
  { id: 'b02', cat: 'ball', name: '3P 공 (형광 그린)', spec: '협회 공인 · 시인성 최고', price: 19000, img: 'img/ball-3p-green.jpg' },
  { id: 'b03', cat: 'ball', name: '3P 공 (레드)', spec: '협회 공인', price: 19000, img: 'img/ball-3p-red.jpg' },
  { id: 'b04', cat: 'ball', name: '3P 공 (옐로)', spec: '협회 공인', price: 19000, img: 'img/ball-3p-yellow.jpg' },
  { id: 'g01', cat: 'bag', name: '클럽 케이스 (블루)', spec: '경량 · 어깨끈 포함', price: 78000, img: 'img/bag-blue.jpg' },
  { id: 'g02', cat: 'bag', name: '프리미엄 체크 가방', spec: '클럽+공+소품 수납', price: 128000, img: 'img/bag-check-1.jpg' },
  { id: 'g03', cat: 'bag', name: '체크 가방 (네이비)', spec: '대용량 수납', price: null, img: 'img/bag-check-2.jpg' },
  { id: 'g04', cat: 'bag', name: '클럽 자루 가방 (카키)', spec: '간편 휴대형', price: null, img: 'img/bag-case-khaki.jpg' },
  { id: 'g05', cat: 'bag', name: '소품 가방 (버건디)', spec: '공·티 수납', price: null, img: 'img/bag-burgundy.jpg' },
  { id: 'a01', cat: 'acc', name: '연습용 타깃 링', spec: '퍼팅 연습용 2개입', price: null, img: 'img/target-rings.jpg' },
];

const CLUBS = [
  { id: 1, name: '덕양 파크사랑회', region: '고양시 덕양구', members: 38, desc: '매주 화·목 오전 한강구장 정기 라운드', kakao: 'https://open.kakao.com/o/예시', band: '',
    feed: [
      { img: 'img/club/photo1.jpg', cap: '5월 정기 라운드 단체 사진 📸', date: '6월 4일' },
      { img: 'img/club/photo2.jpg', cap: '김순영 회원 홀인원 축하!! 🎉', date: '6월 2일' },
      { img: 'img/club/photo3.jpg', cap: '신입 회원 환영 라운드', date: '5월 29일' },
    ] },
  { id: 2, name: '행주 동호회', region: '고양시 덕양구', members: 52, desc: '주말 오전 라운드 + 월 1회 친선전', kakao: '', band: 'https://band.us/@예시',
    feed: [
      { img: 'img/club/photo4.jpg', cap: '6월 친선전 우승조 🏆', date: '6월 1일' },
      { img: 'img/club/photo2.jpg', cap: '토요 라운드 풍경', date: '5월 31일' },
    ] },
  { id: 3, name: '강서 실버클럽', region: '서울 강서구', members: 64, desc: '서남센터 기반 · 입문자 교육 운영', kakao: 'https://open.kakao.com/o/예시2', band: 'https://band.us/@예시2',
    feed: [
      { img: 'img/club/photo3.jpg', cap: '입문 교실 3기 수료 💚', date: '6월 3일' },
      { img: 'img/club/photo1.jpg', cap: '서남센터 18홀 정복!', date: '5월 27일' },
    ] },
];

// 클럽 내부 게시판 (공지 / 벙개·정모 / 갤러리)
const CLUB_POSTS = {
  1: {
    notice: [
      { title: '6월 회비 안내 (변동 없음)', date: '6월 1일', by: '총무 박영자' },
      { title: '한강구장 월요일 휴장 — 화요일로 변경', date: '5월 28일', by: '회장 김철수' },
    ],
    meet: [
      { title: '내일 오전 9시 한강구장 벙개 ⛳', date: '오늘', by: '김철수', join: 5, max: 8 },
      { title: '토요일 행주구장 원정 정모', date: '어제', by: '이순자', join: 11, max: 12 },
    ],
  },
  2: {
    notice: [ { title: '친선전 결과 및 다음 일정', date: '6월 2일', by: '회장 정만수' } ],
    meet: [ { title: '일요일 아침 라운드 같이 가실 분', date: '오늘', by: '정만수', join: 3, max: 4 } ],
  },
  3: {
    notice: [ { title: '입문 교실 4기 모집 (무료)', date: '6월 3일', by: '강서구지회' } ],
    meet: [ { title: '수요일 오후 2시 서남센터 정모', date: '2일 전', by: '한복순', join: 9, max: 16 } ],
  },
};

// 데이거래 — 당근식 동네 중고거래 (파크데이는 장터만 제공, 직거래 원칙)
// seller.score = 그린지수 🌱 (첫 거래 36.5에서 시작, 매너 평가로 오르내림)
const DEALS = [
  { id: 1, title: '혼마 파크골프채 (1년 사용)', price: 450000, cat: 'club', region: '고양시 덕양구', time: '10분 전', img: 'img/club-head-round-2.jpg', status: '판매중',
    desc: '작년 봄에 구입해서 주 1회 정도 사용했습니다. 헤드 상태 깨끗하고 그립도 갈았어요. 키 165~175cm 분께 맞는 길이입니다. 직접 보시고 결정하세요.',
    place: '대덕 파크골프장 입구', views: 86, likes: 7, chats: 3, seller: { name: '김철수', score: 41.2 } },
  { id: 2, title: '3P 공 5개 일괄 (새것 2개 포함)', price: 30000, cat: 'ball', region: '고양시 일산동구', time: '1시간 전', img: 'img/ball-3p-set.jpg', status: '판매중',
    desc: '새것 2개, 몇 번 친 것 3개입니다. 색상 골고루 드려요. 일괄로만 판매합니다.',
    place: '일산호수공원 정문', views: 41, likes: 4, chats: 2, seller: { name: '박영자', score: 38.9 } },
  { id: 3, title: '파크골프 가방 (자주색, 깨끗)', price: 40000, cat: 'bag', region: '서울 은평구', time: '3시간 전', img: 'img/bag-burgundy.jpg', status: '예약중',
    desc: '선물 받았는데 색이 안 맞아서 내놓습니다. 사용감 거의 없어요.',
    place: '은평구 구장 앞', views: 65, likes: 9, chats: 5, seller: { name: '이순자', score: 44.0 } },
  { id: 4, title: '입문용 클럽 — 무료 나눔', price: 0, cat: 'club', region: '고양시 덕양구', time: '어제', img: 'img/club-blue-shaft.jpg', status: '판매중',
    desc: '새 채 장만해서 쓰던 입문용 채 나눔합니다. 처음 시작하시는 분 가져가세요. 흠집 조금 있지만 치는 데 문제 없습니다.',
    place: '행주 파크골프장', views: 203, likes: 31, chats: 12, seller: { name: '정만수', score: 47.5 } },
  { id: 5, title: '미즈노 클럽 + 케이스 세트', price: 380000, cat: 'club', region: '파주시', time: '어제', img: 'img/club-pair.jpg', status: '거래완료',
    desc: '거래 완료되었습니다. 감사합니다.',
    place: '-', views: 154, likes: 12, chats: 8, seller: { name: '한복순', score: 39.6 } },
  { id: 6, title: '파크골프화 265 (2회 착용)', price: 55000, cat: 'etc', region: '고양시 덕양구', time: '2일 전', img: 'img/target-rings.jpg', status: '판매중',
    desc: '사이즈가 안 맞아 판매합니다. 두 번 신었어요. 박스 있습니다.',
    place: '대덕 구장 주차장', views: 38, likes: 2, chats: 1, seller: { name: '최금란', score: 36.5 } },
];

// 채팅 빠른 답장 (시니어 친화 — 타이핑 최소화)
const QUICK_REPLIES = ['아직 있나요?', '어디서 만날까요?', '네, 좋습니다 👍', '조금 깎아주실 수 있나요?', '내일 오전 괜찮으세요?'];

const NOTICES = [
  '⛅ 오늘 고양시 맑음 · 라운드하기 좋은 날씨예요',
  '📢 6월 정기 점검: 행주 구장 6/10(수) 휴장',
];

// 확정 슬로건 (홈 공지 스트립 로테이션용) — 운영 공지와 별개로 슬로건 칸에서만 로테이션
const SLOGANS = [
  '🌿 좋은 날엔, 파크데이',          // 메인 슬로건 — 첫 노출 고정
  '⛳ 오늘이 파크데이',
  '🌞 기분 좋은 한 바퀴',
  '🚩 오늘 라운딩, 어디로 갈까요?',
  '👥 함께 치면 더 즐겁습니다',
  '🏡 우리 동네 파크골프 생활',
];
