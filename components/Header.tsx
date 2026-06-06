'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/', label: '홈' },
  { href: '/facilities', label: '시설물·제품' },
  { href: '/portfolio', label: '납품·시공 실적' },
  { href: '/company', label: '회사소개' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header>
      <div className="wrap gnb">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          IDPARK <span className="sub">아이디파크</span>
        </Link>
        <button
          className="hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴"
        >
          ☰
        </button>
        <nav className={open ? 'open' : undefined}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? 'on' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`cta-quote${isActive('/contact') ? ' on' : ''}`}
            onClick={() => setOpen(false)}
          >
            견적 요청
          </Link>
        </nav>
      </div>
    </header>
  );
}
