import Link from 'next/link';

/**
 * 홈(랜딩) 우하단 플로팅닷 — 파크데이 서비스로 연결.
 * 로고(마크) + 슬로건 노출. 모바일에선 동그란 닷으로 축소.
 */
export default function ParkdayFab() {
  return (
    <Link href="/parkday" className="pd-fab" aria-label="파크데이 — 동호인 서비스 보기">
      <img src="/brand/parkday-mark.svg" alt="" className="pd-fab-mark" />
      <span className="pd-fab-tx">
        <b>좋은 날엔, 파크데이</b>
        <small>동호인 서비스 보기 →</small>
      </span>
    </Link>
  );
}
