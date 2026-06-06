'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * 기존 js/main.js의 스크롤 리빌을 이식.
 * .reveal 요소가 뷰포트에 들어오면 .in 클래스를 붙인다.
 * 라우트 이동 시마다 새 페이지의 .reveal 요소를 다시 관찰한다.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
