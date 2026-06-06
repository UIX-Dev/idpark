'use client';

import { useState } from 'react';
import {
  CATEGORY_FILTERS,
  PORTFOLIO_ROWS,
  type PortfolioCategory,
} from '@/lib/portfolio';

export default function PortfolioTable() {
  const [filter, setFilter] = useState<PortfolioCategory | 'all'>('all');

  const rows = PORTFOLIO_ROWS.filter((r) => filter === 'all' || r.cat === filter);

  return (
    <>
      <div className="filter-chips">
        {CATEGORY_FILTERS.map((c) => (
          <button
            key={c.key}
            className={`chip${filter === c.key ? ' on' : ''}`}
            onClick={() => setFilter(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <table className="list reveal">
        <thead>
          <tr>
            <th>연도</th>
            <th>구장 / 발주처</th>
            <th>구분</th>
            <th>납품·시공 내용</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.year}-${r.place}-${i}`}>
              <td>{r.year}</td>
              <td>{r.place}</td>
              <td>{r.catLabel}</td>
              <td>{r.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
