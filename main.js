window.onload=()=>{
  const fill=document.getElementById('loadFill');let w=0;
  const t=setInterval(()=>{
    w+=8;fill.style.width=w+'%';
    if(w>=100){clearInterval(t);setTimeout(()=>{
      document.getElementById('load').style.opacity=0;
      setTimeout(()=>{
        document.getElementById('load').style.display='none';
        loadLinks();startChar();checkScroll();dynamicBg();
      },1000)
    },600)}
  },220)
};

function dynamicBg(){
  window.addEventListener('scroll',()=>{
    const st=window.scrollY;
    const dh=document.documentElement.scrollHeight-window.innerHeight;
    const sp=(st/dh)*100;
    const dk=Math.min(sp/1.8,22);
    document.getElementById('bg').style.background=`linear-gradient(180deg,rgb(${26-dk*2},${75-dk*3},${122-dk*4}),rgb(${5-dk},${19-dk},${41-dk}),rgb(${1-dk},${5-dk},${15-dk}))`;
  })
}

function checkScroll(){
  window.onscroll=()=>{
    const top=window.scrollY;
    const r=document.getElementById('rainbow');
    const h=document.getElementById('hint');
    top<120?(r.classList.add('show'),h.style.display='none'):(r.classList.remove('show'),h.style.display='block');
  }
}

function startChar(){
  const c=document.getElementById('char');
  const t=document.getElementById('talk');
  const b=document.getElementById('btns');
  setTimeout(()=>c.classList.add('arrive'),1200);
  setTimeout(()=>{t.textContent='สวัสดีครับ! ยินดีต้อนรับสู่ HhUB ที่รวมลิงก์ดีดีครับ 🎉';t.classList.add('show')},3800);
  setTimeout(()=>{t.textContent='ชอบลิงก์เยอะๆ และก๊อปปี้ง่ายแบบนี้ไหมครับ?';b.style.display='flex'},6500);
}

function replyYes(){
  const t=document.getElementById('talk');
  const b=document.getElementById('btns');
  b.style.display='none';
  t.textContent='ขอบคุณมากครับ! ก๊อปปี้ได้เลยครับ ลิงก์เยอะแยะเลย ✨';
  setTimeout(()=>t.classList.remove('show'),5000);
}

function replyNo(){
  const t=document.getElementById('talk');
  const b=document.getElementById('btns');
  b.style.display='none';
  t.textContent='ไม่เป็นไรครับ ไว้ปรับปรุงใหม่นะครับ!';
  setTimeout(()=>t.classList.remove('show'),4500);
}

// ฟังก์ชันก๊อปปี้ลิงก์
async function copyLink(url){
  try{
    await navigator.clipboard.writeText(url);
    alert('✅ ก๊อปปี้ลิงก์เรียบร้อยแล้ว!');
  }catch{
    alert('❌ ก๊อปปี้ไม่ได้ คัดลอกเองได้นะครับ');
  }
}

async function loadLinks(){
  try{
    const res=await fetch('data.json');
    const d=await res.json();
    const list=document.getElementById('links');
    d.cards.forEach(card=>{
      const el=document.createElement('div');
      el.className='ddCard';
      let linkHtml='<div class="linkRow">';
      card.links.forEach(l=>{
        linkHtml+=`
        <div class="linkBtn">
        <a href="${l.url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">${l.name}</a>
        <button class="copyBtn" onclick="copyLink('${l.url}')">📋</button>
        </div>`;
      });
      linkHtml+='</div>';
      el.innerHTML=`<h2>${card.title}</h2><p>${card.desc}</p>${linkHtml}`;
      list.appendChild(el);
    })
  }catch{
    document.getElementById('links').innerHTML='<div class="ddCard"><h2>แจ้งเตือน</h2><p>โหลดข้อมูลไม่สำเร็จครับ</p></div>';
  }
}
