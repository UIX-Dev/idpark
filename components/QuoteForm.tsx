'use client';

import { type FormEvent } from 'react';

/**
 * 견적 요청 폼.
 * 현재는 기존 동작과 동일하게 mailto로 메일 작성 화면을 엽니다.
 * TODO: 운영 시 서버 전송(API Route + 폼메일러/스프레드시트 연동)으로 교체.
 */
export default function QuoteForm() {
  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = ev.currentTarget;
    const data = new FormData(f);
    const org = String(data.get('org') ?? '');
    const name = String(data.get('name') ?? '');
    const phone = String(data.get('phone') ?? '');
    const category = String(data.get('category') ?? '');
    const message = String(data.get('message') ?? '');

    const subject = encodeURIComponent(`[견적요청] ${org} - ${category}`);
    const body = encodeURIComponent(
      `소속/회사: ${org}\n담당자: ${name}\n연락처: ${phone}\n구분: ${category}\n내용:\n${message}`
    );
    // TODO: 실제 수신 메일 주소로 교체
    window.location.href = `mailto:contact@idpark.kr?subject=${subject}&body=${body}`;
  }

  return (
    <form className="quote reveal" onSubmit={handleSubmit}>
      <div className="fld">
        <label>
          소속 / 회사명 <span className="req">*</span>
        </label>
        <input name="org" required placeholder="예: ○○시청 체육진흥과 / ○○조경(주)" />
      </div>
      <div className="fld" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label>
            담당자 성함 <span className="req">*</span>
          </label>
          <input name="name" required placeholder="홍길동" />
        </div>
        <div>
          <label>
            연락처 <span className="req">*</span>
          </label>
          <input name="phone" type="tel" required placeholder="010-0000-0000" />
        </div>
      </div>
      <div className="fld">
        <label>
          문의 구분 <span className="req">*</span>
        </label>
        <select name="category" required defaultValue="">
          <option value="" disabled>
            선택해 주세요
          </option>
          <option>신규 구장 조성 — 시설물 일괄</option>
          <option>시설물 부분 납품</option>
          <option>노후 시설 교체·보수</option>
          <option>스펙시트·인증서 자료 요청</option>
          <option>기타</option>
        </select>
      </div>
      <div className="fld">
        <label>내용</label>
        <textarea
          name="message"
          placeholder="구장명(또는 현장 위치), 필요 품목과 수량, 희망 납기 등을 적어주세요. 내역서·도면이 있다면 메일로 첨부해 주시면 더 정확한 견적이 가능합니다."
        />
        <div className="hint">
          ※ 파일 첨부가 필요한 경우: contact@idpark.kr 로 직접 보내주셔도 됩니다.
        </div>
      </div>
      <button type="submit" className="btn btn-green" style={{ width: '100%', justifyContent: 'center', fontSize: 18 }}>
        견적 요청 보내기
      </button>
      <div className="hint" style={{ marginTop: 12, textAlign: 'center' }}>
        버튼을 누르면 메일 작성 화면이 열립니다.
      </div>
    </form>
  );
}
