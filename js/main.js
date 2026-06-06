// IDPARK 리브랜딩 사이트 공통 스크립트 v1 (2026.06.05)

// 모바일 내비게이션
function toggleNav() {
  document.querySelector('.gnb nav').classList.toggle('open');
}

// 스크롤 리빌
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// 실적 필터 (portfolio.html)
function filterRows(cat, btn) {
  document.querySelectorAll('.filter-chips .chip').forEach((c) => c.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('table.list tbody tr').forEach((tr) => {
    tr.style.display = cat === 'all' || tr.dataset.cat === cat ? '' : 'none';
  });
}

// 견적 폼 (contact.html) — 실서비스에서는 서버/메일 API로 교체
function submitQuote(ev) {
  ev.preventDefault();
  const f = ev.target;
  const subject = encodeURIComponent('[견적요청] ' + f.org.value + ' - ' + f.category.value);
  const body = encodeURIComponent(
    '소속/회사: ' + f.org.value +
    '\n담당자: ' + f.name.value +
    '\n연락처: ' + f.phone.value +
    '\n구분: ' + f.category.value +
    '\n내용:\n' + f.message.value
  );
  // TODO: 실제 수신 메일 주소로 교체
  window.location.href = 'mailto:contact@idpark.kr?subject=' + subject + '&body=' + body;
  return false;
}
