(function(){
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const born=new Date(2002,2,5),now=new Date();
let age=now.getFullYear()-2002;if(now<new Date(now.getFullYear(),2,5))age--;
$('#yr').textContent=now.getFullYear();

// scroll: progress bar, navbar, timeline fill
const fill=$('#spineFill'),tl=$('.timeline');
function onScroll(){
  const h=document.documentElement,max=h.scrollHeight-innerHeight;
  $('#progress').style.width=(h.scrollTop/max*100)+'%';
  $('#nav').classList.toggle('solid',scrollY>50);
  const r=tl.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.6-r.top)/r.height));
  fill.style.height=(p*100)+'%';
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

// reveal + timeline steps + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add('on');io.unobserve(e.target);
  const b=e.target.querySelector('[data-count]');if(b)count(b);
}),{threshold:.25});
$$('.reveal,.step').forEach(el=>io.observe(el));
function count(el){
  const t=el.dataset.count==='age'?age:+el.dataset.count,s=performance.now(),d=1600;
  (function f(n){const k=Math.min(1,(n-s)/d),v=Math.round(t*(1-Math.pow(1-k,3)));
    el.textContent=el.dataset.plain?v:v.toLocaleString();if(k<1)requestAnimationFrame(f)})(s);
}
$$('.nav-link').forEach(a=>a.addEventListener('click',()=>{const m=$('#menu');if(m.classList.contains('show'))bootstrap.Collapse.getOrCreateInstance(m).hide()}));

// chatbot
const KB=[
 {k:['hello','hi','hey','salaam','jambo','habari','good'],a:'Hello! I can tell you about Abdul-Rahman’s background, education, work, ZanLux or how to contact him.'},
 {k:['who','about','introduce','profile','tell me'],a:'Abdul-Rahman Aminu Shehe is a Clinical Medical Assistant and entrepreneur from Zanzibar, Tanzania. He is also the founder of ZanLux, a scents shop in Dodoma.'},
 {k:['born','birth','age','old','birthday','zanzibar','from'],a:'He was born on 5 March 2002 on Zanzibar Island, Tanzania, so he is '+age+' years old.'},
 {k:['education','study','school','university','qualification','degree','course','india','college','o level','olevel','secondary'],a:'He completed O-Level at Glorious School of Zanzibar, then finished his Clinical Medical Assistant course in 2024 at Maharishi Markandeshwar (Deemed to be University), Mullana, Ambala, India.'},
 {k:['work','job','profession','career','doctor','medical','clinical','hospital','occupation','experience'],a:'He currently works as a Medical Assistant at a hospital in Tanzania, supporting patient assessment, treatment and care.'},
 {k:['skill','expertise','speciality','specialty','do you do','services'],a:'His strengths are patient assessment, clinical procedures, compassionate care and business leadership.'},
 {k:['zanlux','business','shop','scent','perfume','fragrance','founder','store','website','online'],a:'ZanLux is a scents shop he founded in Dodoma (Mipango, Mwisho wa Lami). Visit zanlux.online to see more.'},
 {k:['where','location','address','dodoma','located','live'],a:'ZanLux is located at Mipango, Mwisho wa Lami, Dodoma, Tanzania.'},
 {k:['contact','email','mail','reach','phone','call','number','whatsapp','hire','appointment','book'],a:'Email: founder@zanlux.online\nPhone: +255 774 040 506\nYou can also use the Contact section below.'},
 {k:['advice','symptom','sick','pain','medicine','treatment','diagnos','drug','dose','fever'],a:'I can’t give medical advice here. Please see a qualified healthcare professional, or in an emergency go to the nearest hospital.'},
 {k:['thanks','thank','asante','bye'],a:'You’re welcome! Reach out anytime.'}
];
const body=$('#chatBody'),chat=$('#chat');
function add(t,c){const d=document.createElement('div');d.className='msg '+c;d.style.whiteSpace='pre-line';d.textContent=t;body.appendChild(d);body.scrollTop=body.scrollHeight;return d}
function reply(q){
  add(q,'me');
  const ty=document.createElement('div');ty.className='msg bot typing';ty.innerHTML='<span></span><span></span><span></span>';body.appendChild(ty);body.scrollTop=body.scrollHeight;
  const l=q.toLowerCase();
  let best=null,sc=0;KB.forEach(e=>{const s=e.k.filter(w=>l.includes(w)).length;if(s>sc){sc=s;best=e}});
  setTimeout(()=>{ty.remove();add(best?best.a:'I can help with his background, education, work, ZanLux and contact details. Try one of the suggestions below.','bot')},700);
}
add('Hello, I’m the portfolio assistant. What would you like to know?','bot');
['Who is he?','Education','Current work','ZanLux','Contact'].forEach(t=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>reply(t);$('#chips').appendChild(b)});
$('#chatBtn').onclick=()=>chat.classList.toggle('open');
$('#chatClose').onclick=()=>chat.classList.remove('open');
$('#chatForm').onsubmit=e=>{e.preventDefault();const i=$('#chatIn'),v=i.value.trim();if(v){reply(v);i.value=''}};
})();
