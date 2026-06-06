// ============================================
// PARKDAY 앱 로직 v1 (2026-06-06)
// 프로토타입: 프론트 단독 동작 (목 데이터)
// 실서비스: fetch('https://parkday.kr/api/...')로 교체
// ============================================

// 기본 동네 — 위치 미설정 시 폴백 (고양시 덕양구)
const DEFAULT_LOC = { lat: 37.631, lng: 126.812, name: '고양시 덕양구' };

const App = {
  state: {
    loc: null,          // {lat, lng, name}
    radius: 10,
    booking: null,      // 마지막 예약
    fs: 1,
  },

  // ───── 초기화 ─────
  init() {
    const saved = localStorage.getItem('pd_state');
    if (saved) {
      try { Object.assign(this.state, JSON.parse(saved)); } catch (e) {}
    }
    document.documentElement.style.setProperty('--fs', this.state.fs);
    if (this.state.loc) {
      document.getElementById('onboard').classList.add('hidden');
      this.applyLoc();
    }
    this.startNoticeRotation();
    this.renderCourses();
    this.renderShop('all');
    this.renderClubs();
    this.renderDeals();
    /* 서비스워커 등록 비활성화 (idpark.vercel.app에 임베드된 사본 — 캐시 꼬임 방지) */
  },

  save() { localStorage.setItem('pd_state', JSON.stringify(this.state)); },

  // ───── 공지 스트립: 운영 공지(고정) + 슬로건(로테이션) ─────
  // 휴장 등 운영 공지는 항상 고정 노출(시니어가 놓치지 않게), 슬로건만 별도 칸에서 로테이션
  startNoticeRotation() {
    const el = document.getElementById('noticeStrip');
    if (!el) return;
    const notices = (typeof NOTICES !== 'undefined' ? NOTICES : []);
    const slogans = (typeof SLOGANS !== 'undefined' ? SLOGANS : []);
    if (!notices.length && !slogans.length) { el.style.display = 'none'; return; }
    el.style.display = '';

    const noticeHtml = notices.length ? `<div class="ns-notice">${notices.join('<br>')}</div>` : '';
    const sloganHtml = slogans.length ? `<div class="ns-slogan" id="nsSlogan"></div>` : '';
    el.innerHTML = noticeHtml + sloganHtml;

    if (!slogans.length) return; // 공지만 있으면 고정 표시로 끝

    const slot = document.getElementById('nsSlogan');
    // 모션 최소화 선호 시: 로테이션 없이 메인 슬로건만 표시 (접근성)
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || slogans.length === 1) { slot.innerHTML = slogans[0]; return; }

    let i = 0;
    const show = () => { slot.innerHTML = slogans[i]; i = (i + 1) % slogans.length; };
    show(); // 첫 노출 = 메인 슬로건(slogans[0])
    clearInterval(this._noticeTimer);
    this._noticeTimer = setInterval(() => {
      slot.classList.add('fade');
      setTimeout(() => { show(); slot.classList.remove('fade'); }, 280);
    }, 4500);
  },

  // ───── 동네 설정 (당근식) ─────
  setLocation() {
    if (!navigator.geolocation) return this.skipLocation();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // 프로토타입: 좌표만 저장, 동네명은 최근접 구장 지역으로 표기
        // 실서비스: 카카오/네이버 역지오코딩 API로 행정동 변환
        const { latitude: lat, longitude: lng } = pos.coords;
        const nearest = COURSES.map(c => ({ c, d: this.dist(lat, lng, c.lat, c.lng) }))
          .sort((a, b) => a.d - b.d)[0];
        this.state.loc = { lat, lng, name: nearest.c.region + ' 부근' };
        this.afterLoc();
      },
      () => this.skipLocation(),
      { timeout: 8000 }
    );
  },
  skipLocation() {
    this.state.loc = { ...DEFAULT_LOC };
    this.afterLoc();
  },
  afterLoc() {
    this.save();
    document.getElementById('onboard').classList.add('hidden');
    this.applyLoc();
    this.renderCourses();
  },
  applyLoc() {
    document.getElementById('locName').textContent = this.state.loc.name;
    document.getElementById('locName2').textContent = this.state.loc.name;
    const l3 = document.getElementById('locName3');
    if (l3) l3.textContent = this.state.loc.name;
  },

  // ───── 거리 계산 (하버사인) ─────
  dist(lat1, lng1, lat2, lng2) {
    const R = 6371, toR = Math.PI / 180;
    const dLat = (lat2 - lat1) * toR, dLng = (lng2 - lng1) * toR;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*toR) * Math.cos(lat2*toR) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  },

  // ───── 화면 전환 ─────
  show(v, btn) {
    document.querySelectorAll('.view').forEach(e => e.classList.remove('on'));
    document.getElementById('v-' + v).classList.add('on');
    const tabKey = (v === 'detail' || v === 'ticket') ? 'home'
      : (v === 'clubhome' ? 'club'
      : (['dealdetail', 'dealnew', 'chat'].includes(v) ? 'deal' : v));
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('on', t.dataset.v === tabKey));
    window.scrollTo(0, 0);
    if (v === 'ticket') this.renderTicket();
  },

  // ───── 반경 필터 ─────
  setRadius(km, btn) {
    this.state.radius = km; this.save();
    document.querySelectorAll('#radiusChips .chip').forEach(c => c.classList.remove('on'));
    btn.classList.add('on');
    this.renderCourses();
  },

  // ───── 구장 리스트 ─────
  renderCourses() {
    const loc = this.state.loc || DEFAULT_LOC;
    const rows = COURSES
      .map(c => ({ ...c, d: this.dist(loc.lat, loc.lng, c.lat, c.lng) }))
      .filter(c => c.d <= this.state.radius)
      .sort((a, b) => a.d - b.d);
    const rsvLabel = { online: '온라인 예약', phone: '전화 예약', onsite: '현장 접수' };
    const el = document.getElementById('courseList');
    if (!rows.length) {
      el.innerHTML = '<div class="card" style="text-align:center;color:var(--sub)">이 반경에는 등록된 구장이 없어요.<br>반경을 넓혀 보세요.</div>';
      return;
    }
    el.innerHTML = rows.map(c => `
      <div class="course">
        <div class="hd">
          <div class="nm">${c.name}</div>
          <div class="dist">${c.d < 1 ? Math.round(c.d*1000)+'m' : c.d.toFixed(1)+'km'}</div>
        </div>
        <span class="rsv-tag rsv-${c.reserve}">${rsvLabel[c.reserve]}</span>
        <div class="meta">
          <span>⛳ <b>${c.holes}홀</b></span>
          <span>💰 <b>${c.fee}</b></span>
          <span>🕐 ${c.hours.split(' ')[0]}</span>
        </div>
        <div class="acts">
          <button class="btn btn-line" onclick="App.detail(${c.id})">자세히</button>
          <button class="btn btn-pri" onclick="App.detail(${c.id})">예약 안내</button>
        </div>
      </div>`).join('');
  },

  // ───── 구장 상세 + 예약 ─────
  detail(id) {
    const loc = this.state.loc || DEFAULT_LOC;
    const c = COURSES.find(x => x.id === id);
    const d = this.dist(loc.lat, loc.lng, c.lat, c.lng);
    const rsvLabel = { online: '온라인 예약', phone: '전화 예약', onsite: '현장 접수' };
    const slots = ['06:00','08:00','10:00','12:00','14:00','16:00'];
    const v = document.getElementById('v-detail');
    v.innerHTML = `
      <button class="back" onclick="App.show('home')">← 목록으로</button>
      <h2 class="vt">${c.name}</h2>
      <p class="vd">${c.region} · 내 동네에서 ${d < 1 ? Math.round(d*1000)+'m' : d.toFixed(1)+'km'}</p>
      <div class="kv">
        <div class="r"><span class="k">예약 방법</span><span class="v">${rsvLabel[c.reserve]}</span></div>
        <div class="r"><span class="k">이용료</span><span class="v">${c.fee}${c.feeNote ? ' · ' + c.feeNote : ''}</span></div>
        <div class="r"><span class="k">운영 시간</span><span class="v">${c.hours}</span></div>
        <div class="r"><span class="k">규모</span><span class="v">${c.holes}홀</span></div>
        <div class="r"><span class="k">전화</span><span class="v">${c.phone}</span></div>
      </div>
      <div class="infobox">ℹ️ ${c.notice}</div>
      <div class="alertbox"><b>꼭 확인하세요</b> — 예약 후 못 가시게 되면 미리 취소 부탁드려요. 무단 노쇼가 반복되면 구장 이용이 제한될 수 있습니다. 현장 분쟁 시 구장 관리사무소 안내에 따라 주세요.</div>
      ${c.reserve === 'online' ? `
        <h2 class="vt" style="font-size:calc(18px*var(--fs))">방문 시간 선택</h2>
        <p class="vd">선택하시면 예약 메모를 만들어 드려요</p>
        <div class="slots">${slots.map((s,i) => `<button class="slot${i===1?' off':''}" onclick="App.pickSlot(this)" ${i===1?'disabled':''}>${s}</button>`).join('')}</div>
        <button class="btn btn-pri" style="margin-bottom:10px" onclick="App.book(${c.id})">이 시간으로 예약 메모 만들기</button>
        <button class="btn btn-line" onclick="window.open('${c.reserveUrl}','_blank')">공식 예약 사이트 열기 ↗</button>
        <p class="platform-note">파크데이는 예약을 안내·중개합니다. 예약 확정은 구장(지자체) 공식 시스템에서 완료됩니다.</p>
      ` : c.reserve === 'phone' ? `
        <button class="btn btn-call" onclick="App.call('${c.phone.replace(/-/g,'')}')">📞 구장에 전화해서 예약하기</button>
        <p class="platform-note">통화 후 아래 버튼으로 내 예약을 기록해 두세요.</p>
        <button class="btn btn-line" onclick="App.book(${c.id})">통화로 예약했어요 — 예약 메모 만들기</button>
      ` : `
        <div class="infobox">🚶 이 구장은 현장 접수예요. 운영 시간 안에 방문해서 접수하시면 됩니다.</div>
        <button class="btn btn-line" onclick="App.book(${c.id})">방문 계획 메모 만들기</button>
      `}
    `;
    this.show('detail');
  },

  pickSlot(btn) {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('on'));
    btn.classList.add('on');
  },

  // ───── 예약 메모(확인증) ─────
  book(id) {
    const c = COURSES.find(x => x.id === id);
    const slot = document.querySelector('.slot.on')?.textContent || '시간 미지정';
    const num = 'PD' + Date.now().toString().slice(-6);
    const today = new Date();
    const dateStr = (today.getMonth()+1) + '월 ' + today.getDate() + '일';
    this.state.booking = { num, course: c.name, phone: c.phone, slot, date: dateStr, notice: c.notice };
    this.save();
    this.show('ticket');
  },

  renderTicket() {
    const v = document.getElementById('v-ticket');
    const b = this.state.booking;
    if (!b) {
      v.innerHTML = `<button class="back" onclick="App.show('home')">← 돌아가기</button>
        <div class="card" style="text-align:center;padding:40px 20px;color:var(--sub)">
        <div style="font-size:44px;margin-bottom:10px">🎫</div>아직 예약 메모가 없어요.<br>구장을 골라 예약을 시작해 보세요.</div>`;
      return;
    }
    v.innerHTML = `
      <button class="back" onclick="App.show('home')">← 홈으로</button>
      <h2 class="vt">예약 메모가 만들어졌어요</h2>
      <p class="vd">현장에서 이 화면을 보여주시면 안내가 빨라요</p>
      <div class="ticket">
        <div class="tno">PARKDAY 예약 메모</div>
        <div class="tnum">${b.num}</div>
        <div class="trow"><span class="k">구장</span><span>${b.course}</span></div>
        <div class="trow"><span class="k">일자</span><span>${b.date}</span></div>
        <div class="trow"><span class="k">시간</span><span>${b.slot}</span></div>
      </div>
      <div class="alertbox"><b>노쇼 방지 약속</b> — 못 가시게 되면 구장(${b.phone})에 꼭 미리 연락해 주세요. 미리 연락 주신 취소는 불이익이 없습니다.</div>
      <button class="btn btn-call" onclick="App.call('${b.phone.replace(/-/g,'')}')">📞 구장에 전화하기</button>
      <p class="platform-note">이 메모는 방문 계획 기록이며, 공식 예약 확정은 구장 시스템 기준입니다.</p>
    `;
  },

  // ───── 상품 ─────
  shopFilter(cat, btn) {
    document.querySelectorAll('#shopChips .chip').forEach(c => c.classList.remove('on'));
    btn.classList.add('on');
    this.renderShop(cat);
  },
  renderShop(cat) {
    const rows = PRODUCTS.filter(p => cat === 'all' || p.cat === cat);
    document.getElementById('shopList').innerHTML = rows.map(p => `
      <div class="pt-row">
        <img class="pimg" src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="pi">
          <div class="pn">${p.name}</div>
          <div class="ps">${p.spec}</div>
          <div class="pp">${p.price ? p.price.toLocaleString() + '원' : '가격 문의'}</div>
        </div>
        <button class="pcall" onclick="App.call('07074644466')">📞 문의</button>
      </div>`).join('');
  },

  // ───── 클럽 ─────
  renderClubs() {
    document.getElementById('clubList').innerHTML = CLUBS.map(c => `
      <div class="club">
        <div class="ch">
          <div class="cn">${c.name}</div>
          <div class="cm">👥 ${c.members}명</div>
        </div>
        <div class="cd">📍 ${c.region} · ${c.desc}</div>
        <div class="slider">
          ${c.feed.map(f => `<div class="slide"><img src="${f.img}" alt="" loading="lazy"><div class="cap">${f.cap}<small>${f.date}</small></div></div>`).join('')}
        </div>
        <button class="btn btn-pri" style="margin-bottom:8px" onclick="App.clubHome(${c.id})">🏠 우리 클럽 가기</button>
        <div class="links">
          ${c.kakao ? `<button class="btn k-kakao" onclick="window.open('${c.kakao}','_blank')">💬 카카오 채팅방</button>` : ''}
          ${c.band ? `<button class="btn k-band" onclick="window.open('${c.band}','_blank')">🟢 밴드 바로가기</button>` : ''}
        </div>
      </div>`).join('');
  },

  // ───── 클럽 홈 (공지 / 벙개·정모 / 갤러리) ─────
  clubHome(id, tab = 'notice') {
    const c = CLUBS.find(x => x.id === id);
    const posts = CLUB_POSTS[id] || { notice: [], meet: [] };
    let body = '';
    if (tab === 'notice') {
      body = posts.notice.map(p => `
        <div class="post"><div class="pt">📌 ${p.title}</div><div class="pm">${p.date} · ${p.by}</div></div>`).join('')
        || '<div class="card" style="text-align:center;color:var(--sub)">아직 공지가 없어요</div>';
    } else if (tab === 'meet') {
      body = posts.meet.map(p => `
        <div class="post">
          <div class="pt">⛳ ${p.title}</div>
          <div class="pm">${p.date} · ${p.by}</div>
          <div class="join">
            <span class="cnt">${p.join}/${p.max}명</span>
            <button class="btn ${p.join >= p.max ? 'btn-line' : 'btn-pri'}" onclick="alert('프로토타입: 참여 신청')">${p.join >= p.max ? '마감' : '참여하기'}</button>
          </div>
        </div>`).join('')
        || '<div class="card" style="text-align:center;color:var(--sub)">예정된 모임이 없어요</div>';
    } else {
      body = `<div class="gal">
        ${c.feed.map(f => `<div class="g"><img src="${f.img}" loading="lazy"><div class="gc">${f.cap}<small>${f.date}</small></div></div>`).join('')}
        <div class="g" onclick="alert('프로토타입: 사진·영상 올리기')" style="display:flex;align-items:center;justify-content:center;min-height:120px;border:2px dashed #c8d8cd;font-size:34px;color:var(--sub)">＋</div>
      </div>`;
    }
    document.getElementById('v-clubhome').innerHTML = `
      <button class="back" onclick="App.show('club')">← 클럽 목록</button>
      <h2 class="vt">${c.name}</h2>
      <p class="vd">📍 ${c.region} · 👥 ${c.members}명</p>
      <div class="subtabs">
        <button class="subtab ${tab==='notice'?'on':''}" onclick="App.clubHome(${id},'notice')">📌 공지</button>
        <button class="subtab ${tab==='meet'?'on':''}" onclick="App.clubHome(${id},'meet')">⛳ 벙개·정모</button>
        <button class="subtab ${tab==='gallery'?'on':''}" onclick="App.clubHome(${id},'gallery')">📸 갤러리</button>
      </div>
      ${body}
      ${c.kakao || c.band ? `<div class="links" style="margin-top:14px">
        ${c.kakao ? `<button class="btn k-kakao" onclick="window.open('${c.kakao}','_blank')">💬 카카오 채팅방</button>` : ''}
        ${c.band ? `<button class="btn k-band" onclick="window.open('${c.band}','_blank')">🟢 밴드</button>` : ''}
      </div>` : ''}
    `;
    this.show('clubhome');
  },

  // ───── 데이거래 ─────
  dealCat: 'all',
  allDeals() {
    // 내가 등록한 글(localStorage) + 기본 목록
    let mine = [];
    try { mine = JSON.parse(localStorage.getItem('pd_mydeals') || '[]'); } catch (e) {}
    return [...mine, ...DEALS];
  },
  myLikes() {
    try { return JSON.parse(localStorage.getItem('pd_likes') || '[]'); } catch (e) { return []; }
  },
  dealFilter(cat, btn) {
    this.dealCat = cat;
    document.querySelectorAll('#dealChips .chip').forEach(c => c.classList.remove('on'));
    btn.classList.add('on');
    this.renderDeals();
  },
  renderDeals() {
    const cls = { '판매중': 'ds-sale', '예약중': 'ds-rsv', '거래완료': 'ds-done' };
    const likes = this.myLikes();
    const rows = this.allDeals().filter(d =>
      this.dealCat === 'all' ? true :
      this.dealCat === 'free' ? d.price === 0 : d.cat === this.dealCat);
    document.getElementById('dealList').innerHTML = rows.length ? rows.map(d => `
      <div class="deal ${d.status === '거래완료' ? 'done' : ''}" onclick="App.dealDetail(${d.id})">
        <img class="dimg" src="${d.img}" alt="" loading="lazy">
        <div class="di">
          <div class="dt">${this.esc(d.title)}</div>
          <div class="dm">${this.esc(d.region)} · ${this.esc(d.time)}</div>
          <div class="dp ${d.price === 0 ? 'free' : ''}"><span class="dstat ${cls[d.status]}">${d.status}</span>${d.price === 0 ? '무료 나눔 💚' : d.price.toLocaleString() + '원'}</div>
          <div class="dstats">${likes.includes(d.id) ? '❤️' : '🤍'} ${d.likes + (likes.includes(d.id) ? 1 : 0)} · 💬 ${d.chats}</div>
        </div>
      </div>`).join('')
      : '<div class="card" style="text-align:center;color:var(--sub);padding:40px 20px">이 분류에는 아직 글이 없어요.<br>첫 판매글을 올려보세요!</div>';
  },

  // 거래글 상세
  dealDetail(id) {
    const d = this.allDeals().find(x => x.id === id);
    if (!d) return;
    const liked = this.myLikes().includes(id);
    const scorePct = Math.min(100, Math.round((d.seller.score / 60) * 100));
    document.getElementById('v-dealdetail').innerHTML = `
      <button class="back" onclick="App.show('deal')">← 데이거래</button>
      <img class="dd-hero" src="${d.img}" alt="${this.esc(d.title)}">
      <div class="dd-seller">
        <div class="dd-avatar">${this.esc(d.seller.name.charAt(0))}</div>
        <div class="dd-sinfo">
          <b>${this.esc(d.seller.name)}</b>
          <small>${this.esc(d.region)}</small>
        </div>
        <div class="dd-score">
          <b>${d.seller.score.toFixed(1)} 🌱</b>
          <div class="dd-bar"><div style="width:${scorePct}%"></div></div>
          <small>그린지수</small>
        </div>
      </div>
      <h2 class="vt" style="margin-top:16px">${this.esc(d.title)}</h2>
      <p class="vd">${this.esc(d.time)} · 조회 ${d.views}</p>
      <div class="dd-price ${d.price === 0 ? 'free' : ''}">${d.price === 0 ? '무료 나눔 💚' : d.price.toLocaleString() + '원'}</div>
      <p class="dd-desc">${this.esc(d.desc)}</p>
      <div class="kv" style="margin-top:16px">
        <div class="r"><span class="k">거래 희망 장소</span><span class="v">📍 ${this.esc(d.place)}</span></div>
        <div class="r"><span class="k">상태</span><span class="v">${d.status}</span></div>
      </div>
      <div class="infobox">🤝 만나서 물건 확인 후 거래하세요. 계좌 선입금 요구는 거절하시고, 낮 시간 구장 앞 같은 공개 장소를 권장합니다.</div>
      <div class="dd-actions">
        <button class="dd-like ${liked ? 'on' : ''}" onclick="App.toggleLike(${d.id})">${liked ? '❤️' : '🤍'}</button>
        ${d.status === '거래완료'
          ? '<button class="btn btn-line" style="flex:1" disabled>거래가 완료된 글이에요</button>'
          : `<button class="btn btn-pri" style="flex:1" onclick="App.chat(${d.id})">💬 채팅으로 거래하기</button>`}
      </div>
    `;
    this.show('dealdetail');
  },

  toggleLike(id) {
    let likes = this.myLikes();
    likes = likes.includes(id) ? likes.filter(x => x !== id) : [...likes, id];
    localStorage.setItem('pd_likes', JSON.stringify(likes));
    this.dealDetail(id);
    this.renderDeals();
  },

  // 채팅 (프로토타입: 자동 응답)
  chat(id) {
    const d = this.allDeals().find(x => x.id === id);
    this._chatDeal = d;
    this._chatMsgs = [{ me: false, t: `안녕하세요! "${d.title}" 보고 연락 주셨군요 😊` }];
    this.renderChat();
    this.show('chat');
  },
  renderChat() {
    const d = this._chatDeal;
    document.getElementById('v-chat').innerHTML = `
      <button class="back" onclick="App.dealDetail(${d.id})">← 거래글로</button>
      <div class="chat-head">
        <img src="${d.img}" alt="">
        <div><b>${this.esc(d.seller.name)}</b><small>${this.esc(d.title)} · ${d.price === 0 ? '무료 나눔' : d.price.toLocaleString() + '원'}</small></div>
      </div>
      <div class="chat-body" id="chatBody">
        ${this._chatMsgs.map(m => `<div class="bubble ${m.me ? 'me' : ''}">${this.esc(m.t)}</div>`).join('')}
      </div>
      <div class="quick">
        ${QUICK_REPLIES.map(q => `<button class="chip" onclick="App.sendMsg('${q}')">${q}</button>`).join('')}
      </div>
      <div class="chat-input">
        <input id="chatText" placeholder="메시지를 입력하세요" onkeydown="if(event.key==='Enter')App.sendMsg()">
        <button class="btn btn-pri" style="min-height:52px;padding:0 22px" onclick="App.sendMsg()">보내기</button>
      </div>
    `;
    const body = document.getElementById('chatBody');
    if (body) body.scrollTop = body.scrollHeight;
  },
  sendMsg(text) {
    const input = document.getElementById('chatText');
    const t = text || (input && input.value.trim());
    if (!t) return;
    this._chatMsgs.push({ me: true, t });
    // 프로토타입 자동 응답
    setTimeout(() => {
      this._chatMsgs.push({ me: false, t: '네~ 확인했습니다. 편하신 시간 말씀해 주세요 🙂' });
      this.renderChat();
    }, 700);
    this.renderChat();
  },

  // 판매글 등록
  dealNew() {
    document.getElementById('v-dealnew').innerHTML = `
      <button class="back" onclick="App.show('deal')">← 데이거래</button>
      <h2 class="vt">판매글 올리기</h2>
      <p class="vd">사진과 설명이 자세할수록 빨리 팔려요</p>
      <div class="nf">
        <label>사진</label>
        <label class="photo-add" id="photoAdd">📷 사진 올리기<input type="file" accept="image/*" hidden onchange="App.previewPhoto(this)"></label>
        <label>제목 <span class="req">*</span></label>
        <input id="nTitle" placeholder="예: 혼마 파크골프채 (1년 사용)">
        <label>분류 <span class="req">*</span></label>
        <select id="nCat">
          <option value="club">클럽(채)</option>
          <option value="ball">공</option>
          <option value="bag">가방</option>
          <option value="etc">기타 (신발·장갑·모자 등)</option>
        </select>
        <label>가격</label>
        <input id="nPrice" type="number" inputmode="numeric" placeholder="숫자만 입력 (원)">
        <label class="freecheck"><input type="checkbox" id="nFree" onchange="document.getElementById('nPrice').disabled=this.checked"> 무료 나눔 할게요 💚</label>
        <label>설명</label>
        <textarea id="nDesc" placeholder="사용 기간, 상태, 거래 가능한 시간을 적어주세요"></textarea>
        <label>거래 희망 장소</label>
        <input id="nPlace" placeholder="예: 대덕 파크골프장 입구">
        <button class="btn btn-pri" style="margin-top:8px" onclick="App.submitDeal()">등록하기</button>
        <p class="platform-note">등록하면 동네 이웃에게 공개됩니다. 직거래 원칙 · 선입금 유도 금지</p>
      </div>
    `;
    this._newPhoto = null;
    this.show('dealnew');
  },
  previewPhoto(input) {
    const f = input.files && input.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (e) => {
      this._newPhoto = e.target.result;
      document.getElementById('photoAdd').innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">`;
    };
    r.readAsDataURL(f);
  },
  submitDeal() {
    const title = document.getElementById('nTitle').value.trim();
    if (!title) { alert('제목을 입력해 주세요'); return; }
    const free = document.getElementById('nFree').checked;
    const price = free ? 0 : (parseInt(document.getElementById('nPrice').value) || 0);
    const deal = {
      id: Date.now(), title,
      cat: document.getElementById('nCat').value,
      price,
      region: (this.state.loc && this.state.loc.name) || '내 동네',
      time: '방금 전',
      img: this._newPhoto || 'img/club-blue-shaft.jpg',
      status: '판매중',
      desc: document.getElementById('nDesc').value.trim() || '설명이 없습니다.',
      place: document.getElementById('nPlace').value.trim() || '협의',
      views: 0, likes: 0, chats: 0,
      seller: { name: '나', score: 36.5 },
    };
    let mine = [];
    try { mine = JSON.parse(localStorage.getItem('pd_mydeals') || '[]'); } catch (e) {}
    mine.unshift(deal);
    try { localStorage.setItem('pd_mydeals', JSON.stringify(mine)); }
    catch (e) { alert('사진 용량이 커서 저장은 생략되지만 목록에는 표시됩니다'); DEALS.unshift(deal); }
    this.renderDeals();
    this.show('deal');
  },

  // ───── 공통 ─────
  // 사용자 입력(판매글 제목·설명·장소, 채팅 메시지 등)을 innerHTML에 넣기 전 escape — 저장형 XSS 방지
  esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, m =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  },
  call(num) { location.href = 'tel:' + num; },
  setFS(v, btn) {
    this.state.fs = v; this.save();
    document.documentElement.style.setProperty('--fs', v);
    document.querySelectorAll('.fs-group .chip').forEach(c => c.classList.remove('on'));
    btn.classList.add('on');
  },
};

App.init();
