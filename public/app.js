const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reduced.matches;
let language = 'en';
let activeStep = 0;
let soundEnabled = false;
const english = Object.fromEntries($$('[data-i18n]').map(el => [el.dataset.i18n, el.innerHTML]));
const thai = {
navExperience:'ประสบการณ์ใหม่', navMini:'รู้จัก Mini', navCafe:'สำหรับร้านกาแฟ', navPos:'เข้าสู่ POS ↗', talk:'คุยกับเรา',
heroLabel:'เชื่อมทุกช่วงเวลาดี ๆ ในร้านกาแฟ',hero1:'เครื่องเล็ก ๆ',hero2:'เติมพลังให้',hero3:'ร้านกาแฟคุณ',heroDescription:'ตั้งแต่สั่งแก้วแรก จนถึงกลับมาอีกครั้ง เชื่อมโต๊ะ การชำระเงิน และลูกค้าด้วย BitPOS Mini',explore:'ลองสัมผัสประสบการณ์',watchPitch:'ชมวิดีโอ 2 นาที',builtSolana:'สร้างบน Solana เพื่อช่วงเวลาในชีวิตจริง',scanOrder:'สแกน สั่ง แล้วนั่งชิล',connection:'จอเล็ก ๆ ที่เชื่อมเราให้ใกล้กัน',onEveryTable:'ทั้งหน้าเคาน์เตอร์ และบนทุกโต๊ะ',scroll:'เลื่อนเพื่อสำรวจ',
chapter1:'01 — ประสบการณ์ใหม่ในร้านกาแฟ',flow1:'โต๊ะของคุณ',flow2:'จังหวะของคุณ',flowDescription:'เลือกเมนูบนมือถือ ชำระผ่านกระเป๋าของคุณ แล้วให้ร้านจัดการต่อ คุณจึงมีเวลาอยู่กับช่วงเวลาดี ๆ',step1:'สแกนแล้วเลือก',step1sub:'เมนูโปรด อยู่ตรงที่คุณนั่ง',step2:'จ่ายผ่านกระเป๋าของคุณ',step2sub:'ชำระบน Solana ร้านออกค่าธรรมเนียมเครือข่ายให้',step3:'ช่วงเวลาเล็ก ๆ ที่น่าประทับใจ',step3sub:'เห็นสถานะชำระชัดเจนบนจอประจำโต๊ะ',preview:'ลองสลับตัวอย่างหน้าจอ',soundOff:'ปิดเสียงอยู่',
chapter2:'02 — รู้จัก BITPOS MINI',mini1:'เล็กอย่างตั้งใจ',mini2:'ความเป็นไปได้ไม่เล็ก',touch:'แตะเพื่อเริ่มสิ่งดี ๆ',touchsub:'จอทัชสกรีน 3.5 นิ้ว · 480 × 320',audio:'ข่าวดี มีเสียงของมัน',audiosub:'ภาพตอบสนอง พร้อมเสียงแจ้งเตือน',scrollInside:'เลื่อนเพื่อดูใกล้ขึ้น',
chapter3:'03 — เชื่อมทุกมุมของร้าน',cafeTitle:'ให้เวลากับร้าน<br>ลดงานเดินไปมา',cafeDescription:'ทีมและลูกค้าเห็นภาพเดียวกัน จัดการออเดอร์ในที่เดียว มีจอเล็ก ๆ ช่วยให้ทุกคนรู้ความคืบหน้า',tableSide:'ประสบการณ์ใหม่บนโต๊ะ',tableTitle:'พอดีกับโต๊ะ<br>เข้ากับร้านคุณ',walletTitle:'กาแฟเป็นของคุณ<br>ค่าเครือข่ายร้านดูแล',walletDescription:'ลูกค้าเซ็นชำระ ร้านสนับสนุนค่าธรรมเนียมเครือข่าย ลูกค้าจึงไม่ต้องมี SOL สำหรับค่า gas',devnetNote:'ระบบปัจจุบันใช้ test USDG บน Solana devnet',merchantLabel:'พื้นที่ทำงานสำหรับร้าน',merchantTitle:'เห็นภาพรวม<br>ดูแลทุกรายละเอียด',merchantDescription:'เมนู ออเดอร์ ข้อมูลลูกค้า และจอประจำโต๊ะ ในพื้นที่ทำงานที่ออกแบบเพื่อร้านกาแฟ',openWorkspace:'เปิดระบบสำหรับร้านค้า',developing:'อยู่ระหว่างพัฒนา',aiTitle:'เหตุผลดี ๆ<br>ที่จะกลับมา',aiDescription:'AI ช่วยคิดข้อเสนอที่คุณอนุมัติ ของสะสมที่ลูกค้าจดจำ บทต่อไปของร้านคุณ',seeNext:'ดูสิ่งที่กำลังพัฒนา',
realLabel:'จากโต๊ะทำงาน สู่โต๊ะในร้านกาแฟ',real1:'โต๊ะจริง',real2:'ช่วงเวลาจริง',realDescription:'ชมการสั่งและชำระเงินบนฮาร์ดแวร์จริง จากการทดลองในร้านกาแฟ',watchDemo:'ชมการทดลองในร้าน',demoDuration:'2 นาที 32 วินาที · SOLANA DEVNET',
chapter4:'04 — สิ่งที่กำลังพัฒนา',roadmap:'แผนพัฒนาผลิตภัณฑ์',next1:'การกลับมาอีกครั้ง',next2:'เริ่มตรงนี้',nextDescription:'เรากำลังต่อยอดจากการชำระเงิน สู่การต้อนรับลูกค้ากลับมา โดยร้านเป็นผู้ควบคุม',aiLabel:'โปรโมชั่นจาก AI',aiNextTitle:'ถูกจังหวะ<br>ตรงใจลูกค้า',aiNextDescription:'ร่างโปรโมชั่น ตรวจทาน เลือกโต๊ะ แล้วส่ง AI ช่วยคิด แต่คุณคือผู้ตัดสินใจ',loyaltyLabel:'NFT และสิทธิพิเศษ',loyaltyTitle:'รางวัลเล็ก ๆ<br>ความสัมพันธ์ยาวนาน',loyaltyDescription:'ภาพสะสม สิทธิพิเศษในร้าน และเหตุผลที่จะกลับมา ประสบการณ์สะสมแต้มที่ออกแบบเพื่อลูกค้าของคุณ',coffeeReady:'กาแฟของคุณ<br>พร้อมแล้ว',pickCounter:'รับได้ที่เคาน์เตอร์',pickupLabel:'แจ้งเตือนประจำโต๊ะ',pickupTitle:'ลดเสียงเรียก<br>เพิ่มเวลาพูดคุย',pickupDescription:'กดออเดอร์พร้อมรับในระบบร้าน ส่งภาพแจ้งเตือนพร้อมเสียงไปยังโต๊ะที่ถูกต้อง',roadmapNote:'AI โปรโมชั่น NFT สะสมแต้ม การแจ้งรับสินค้า และ stablecoin เพิ่มเติม อยู่ระหว่างพัฒนา การทดลองในร้านใช้ test USDG บน Solana devnet',
contactLabel:'เรื่องดี ๆ เริ่มจากการพูดคุย',contact1:'ร้านกาแฟคุณ',contact2:'การเชื่อมต่อครั้งใหม่',contactDescription:'สร้างจากประเทศไทย คิดไปไกลกว่าพรมแดน<br>ให้ BitPOS มาอยู่บนโต๊ะของคุณ',source:'สำรวจซอร์สโค้ด ↗',guide:'คู่มือผลิตภัณฑ์',pauseMotion:'พักภาพเคลื่อนไหว',openYoutube:'เปิดบน YouTube ↗'
};
Object.assign(thai,{
dragModel:'ลากเพื่อหมุนดู · 360°',autoScreens:'สลับจออัตโนมัติ',pitchLabel:'เรื่องราวทั้งหมด ในสองนาที',pitchHeading:'จอเล็ก ๆ<br>เรื่องราวที่ใหญ่กว่า',pitchIntro:'ดูว่า BitPOS เชื่อมประสบการณ์ในร้านกาแฟเข้าด้วยกันอย่างไร',benefitLabel:'ดีต่อร้านคุณ ดีต่อระบบนิเวศ',forCafe:'สำหรับร้านกาแฟ',benefitCafeTitle:'รอน้อยลง<br>กลับมาบ่อยขึ้น',queueTitle:'ลดคิวหน้าร้าน',queueText:'ลูกค้าสั่งและจ่ายจากโต๊ะได้เลย',dataTitle:'รู้จักลูกค้าดีขึ้น',dataText:'ประวัติที่ลูกค้ายินยอม แยกตามโต๊ะ',repeatTitle:'เพิ่มการกลับมาใช้บริการ',repeatText:'ข้อเสนอและรางวัลที่อยากกลับมารับ',pilotTarget:'เป้าหมายช่วงทดลอง',repeatMetric:'เพิ่มอัตราการกลับมา',forSolana:'สำหรับ SOLANA',benefitSolanaTitle:'Stablecoin<br>บนโต๊ะร้านกาแฟ',stableTitle:'การใช้ Stablecoin ในชีวิตจริง',stableText:'เปลี่ยนออเดอร์ประจำวันเป็นการจ่ายบนเชน',gasTitle:'ลูกค้าไม่ต้องมี SOL สำหรับ gas',gasText:'ร้านสนับสนุนค่าธรรมเนียมเครือข่าย',usersTitle:'ต้อนรับผู้ใช้กลุ่มใหม่',usersText:'เข้าถึงผู้คนในสถานที่ที่คุ้นเคย',adoptionTarget:'เป้าหมายช่วงทดลอง',paidMetric:'ออเดอร์ที่จ่ายบน Solana',targetNote:'ตัวเลขเป้าหมายสำหรับการทดลอง ยังไม่ใช่ผลที่วัดได้จริง การกลับมาใช้บริการเทียบกับค่าฐานของร้านที่เข้าร่วม'
});
const stageMessages = {
en:['The next good thing starts with a scan.','Your order. Your wallet. A simpler checkout.','Payment received. A little moment worth celebrating.'],
th:['สิ่งดี ๆ ครั้งต่อไป เริ่มจากการสแกน','ออเดอร์ของคุณ กระเป๋าของคุณ ชำระง่ายขึ้น','ชำระแล้ว ช่วงเวลาเล็ก ๆ ที่น่าฉลอง']
};
function refreshControls(){
$('.sound-toggle span').textContent = language === 'th' ? (soundEnabled ? 'เปิดเสียงอยู่' : 'ปิดเสียงอยู่') : (soundEnabled ? 'Sound on' : 'Sound off');
$('.motion-toggle').textContent = language === 'th' ? (paused ? 'เปิดภาพเคลื่อนไหว' : 'พักภาพเคลื่อนไหว') : (paused ? 'Resume motion' : 'Pause motion');
$('#stage-text').textContent=stageMessages[language][activeStep];
}
$('.lang').addEventListener('click',()=>{
language=language==='en'?'th':'en';document.documentElement.lang=language;
$$('[data-i18n]').forEach(el=>{el.innerHTML=(language==='th'?thai:english)[el.dataset.i18n]??english[el.dataset.i18n];});
$('.lang').textContent=language==='en'?'TH':'EN';$('.lang').setAttribute('aria-label',language==='en'?'Switch to Thai':'Switch to English');refreshControls();requestScroll();
});
const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');$('#mobile-nav').hidden=!open;});
$$('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');$('#mobile-nav').hidden=true;}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');$('#mobile-nav').hidden=true;}});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
if(!paused)document.documentElement.classList.add('js-motion');
$$('.reveal').forEach(el=>observer.observe(el));
const audio=new Audio('/assets/payment-success.wav');audio.preload='none';audio.volume=.25;
$('.sound-toggle').addEventListener('click',()=>{soundEnabled=!soundEnabled;$('.sound-toggle').setAttribute('aria-pressed',String(soundEnabled));$('.sound-toggle').setAttribute('aria-label',soundEnabled?'Disable preview sound':'Enable preview sound');refreshControls();if(soundEnabled){audio.currentTime=0;audio.play().catch(()=>{});}});
const stepImages=['mini-order.webp','mini-qr.webp','mini-paid.webp'];
stepImages.forEach(src=>{const im=new Image();im.src='/assets/'+src;});
let stepTransition;
$$('.step').forEach(button=>button.addEventListener('click',()=>{
activeStep=Number(button.dataset.step);$$('.step').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
clearTimeout(stepTransition);$('.device-preview').classList.add('changing');
stepTransition=setTimeout(()=>{const img=$('#experience-device');img.src='/assets/'+stepImages[activeStep];img.alt=['BitPOS Mini scan-to-order screen preview','BitPOS Mini payment QR screen preview','BitPOS Mini payment received screen preview'][activeStep];$('.device-preview').classList.remove('changing');refreshControls();window.dispatchEvent(new CustomEvent('mini-step',{detail:activeStep}));if(activeStep===2){if(!paused)celebrate();if(soundEnabled){audio.currentTime=0;audio.play().catch(()=>{});}}},paused?0:160);
}));
function celebrate(){const root=$('.confetti');root.replaceChildren();for(let i=0;i<24;i++){const p=document.createElement('i');p.style.setProperty('--x',`${(Math.random()-.5)*360}px`);p.style.setProperty('--y',`${150+Math.random()*210}px`);p.style.setProperty('--r',`${Math.random()*800}deg`);p.style.background=['#ff8500','#64188a','#e0b8ef','#91ad67'][i%4];p.style.left=`${25+Math.random()*50}%`;p.style.animationDelay=`${Math.random()*.12}s`;root.append(p);}setTimeout(()=>root.replaceChildren(),1800);}
const dialog=$('.video-dialog');let videoTrigger;
$$('.video-open').forEach(btn=>btn.addEventListener('click',()=>{
videoTrigger=btn;$$('.scroll-video').forEach(v=>v.pause());$('#video-title').textContent=btn.dataset.title;$('.youtube-link').href=`https://youtu.be/${btn.dataset.video}`;
const frame=document.createElement('iframe');frame.src=`https://www.youtube-nocookie.com/embed/${btn.dataset.video}?autoplay=1&rel=0`;frame.title=btn.dataset.title;frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;$('.video-frame').replaceChildren(frame);dialog.showModal();
}));
function closeVideo(){dialog.close();}
$('.video-close').addEventListener('click',closeVideo);dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)closeVideo();}});dialog.addEventListener('close',()=>{$('.video-frame').replaceChildren();videoTrigger?.focus();});
const anatomy=$('.anatomy');const canvas=$('#anatomy-canvas');const context=canvas.getContext('2d');const frames=new Map();let loadStarted=false;let frameIndex=-1;let desiredFrame=0;let scrollPending=false;let lastY=0;
function drawFrame(){if(!context)return;const img=frames.get(desiredFrame);if(img&&frameIndex!==desiredFrame){context.drawImage(img,0,0,canvas.width,canvas.height);anatomy.classList.add('sequence-ready');frameIndex=desiredFrame;}}
async function loadSequence(){if(loadStarted||paused)return;loadStarted=true;let cursor=0;async function worker(){while(cursor<91){const i=cursor++;await new Promise(resolve=>{const img=new Image();img.onload=()=>{frames.set(i,img);drawFrame();resolve();};img.onerror=resolve;img.src=`/assets/sequence/${String(i).padStart(3,'0')}.webp`;});}}await Promise.all(Array.from({length:4},worker));requestScroll();}
const sequenceObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))loadSequence();},{rootMargin:'650px'});sequenceObserver.observe(anatomy);
function updateScroll(){scrollPending=false;const y=window.scrollY;const max=document.documentElement.scrollHeight-innerHeight;$('.scroll-progress').style.transform=`scaleX(${max>0?y/max:0})`;const rect=anatomy.getBoundingClientRect();const progress=Math.min(1,Math.max(0,-rect.top/Math.max(1,anatomy.offsetHeight-innerHeight)));$('.anatomy-meter span').style.transform=`scaleX(${progress})`;$('.anatomy-percent').textContent=String(Math.round(progress*100)).padStart(2,'0');anatomy.classList.toggle('exploded',progress>.27&&progress<.85);
if(!paused){desiredFrame=Math.round(progress*90);drawFrame();$('.film-image').style.transform=`translateY(${Math.max(-35,Math.min(35,($('.film-section').getBoundingClientRect().top-innerHeight*.4)*.08))}px) scale(1.08)`;}updateBenefits();lastY=y;}
function requestScroll(){if(!scrollPending){scrollPending=true;requestAnimationFrame(updateScroll);}}
window.addEventListener('scroll',requestScroll,{passive:true});window.addEventListener('resize',requestScroll,{passive:true});requestScroll();
function setMotion(value){paused=value;document.documentElement.classList.toggle('motion-paused',paused);$('.motion-toggle').setAttribute('aria-pressed',String(paused));if(paused){$$('.reveal').forEach(el=>el.classList.add('visible'));$('.hero-product').style.transform='';$('.film-image').style.transform='';}else{loadSequence();requestScroll();}refreshControls();}
$('.motion-toggle').addEventListener('click',()=>setMotion(!paused));reduced.addEventListener('change',e=>setMotion(e.matches));setMotion(paused);
if(matchMedia('(hover:hover) and (pointer:fine)').matches){$('.hero-product').addEventListener('pointermove',e=>{if(paused)return;const r=$('.hero-product').getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;$('.hero-product').style.transform=`perspective(1000px) rotateY(${x*12-6}deg) rotateX(${-y*8}deg)`;});$('.hero-product').addEventListener('pointerleave',()=>{$('.hero-product').style.transform='';});$$('.magnetic').forEach(button=>{button.addEventListener('pointermove',e=>{if(paused)return;const r=button.getBoundingClientRect();button.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.1}px)`;});button.addEventListener('pointerleave',()=>button.style.transform='');});}
document.addEventListener('visibilitychange',()=>{document.documentElement.classList.toggle('tab-hidden',document.hidden);});

// The same order/pay/paid story is selectable or automatically cycled on the 3D screen.
let cycleScreens=true, stageVisible=false, cycleTimer=0;
const cycleButton=$('.screen-cycle');
function cycleLabel(){cycleButton.textContent=language==='th'?(cycleScreens?'สลับจออัตโนมัติ':'พักการสลับจอ'):(cycleScreens?'Auto screens on':'Auto screens paused');cycleButton.setAttribute('aria-pressed',String(cycleScreens));}
cycleButton.addEventListener('click',()=>{cycleScreens=!cycleScreens;cycleLabel();cycleTimer=performance.now();});
$$('.step').forEach(b=>b.addEventListener('click',()=>{cycleTimer=performance.now();}));
new IntersectionObserver(entries=>{stageVisible=entries[0].isIntersecting;if(stageVisible)cycleTimer=performance.now();},{threshold:.3}).observe($('.experience-stage'));
setInterval(()=>{if(cycleScreens&&stageVisible&&!paused&&!document.hidden&&performance.now()-cycleTimer>4800){cycleTimer=performance.now();$$('.step')[(activeStep+1)%3].click();}},700);
let modelStarted=false;
new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!modelStarted){modelStarted=true;import('/mini-viewer.js').then(m=>m.mountMini($('.model-host'))).catch(()=>{});}},{rootMargin:'450px'}).observe($('.model-host'));
// Videos are same-origin, muted on first play, and paused outside the viewport.
const players=$$('[data-player]');
function labelPlayer(root){const v=$('video',root);const th=language==='th';$('.inline-play span',root).textContent=v.paused?(th?'เล่น':'Play'):(th?'หยุด':'Pause');$('.inline-play',root).dataset.playing=String(!v.paused);$('.inline-play',root).setAttribute('aria-label',v.paused?'Play video':'Pause video');$('.inline-sound span',root).textContent=v.muted?(th?'ปิดเสียงอยู่':'Sound off'):(th?'เปิดเสียงอยู่':'Sound on');$('.inline-sound',root).setAttribute('aria-pressed',String(!v.muted));$('.inline-sound',root).setAttribute('aria-label',v.muted?'Enable video sound':'Mute video');}
function loadVideo(v){if(!v.getAttribute('src')){v.src=v.dataset.src;v.load();}}
function playVideo(v){loadVideo(v);players.forEach(p=>{const other=$('video',p);if(other!==v)other.pause();});return v.play().catch(()=>{});}
players.forEach(root=>{
 const v=$('video',root);v.muted=true;v.volume=.6;
 let onScreen=false, manuallyPaused=false;
 new IntersectionObserver(entries=>{if(entries[0].isIntersecting)loadVideo(v);},{rootMargin:'250px'}).observe(root);
 new IntersectionObserver(entries=>{onScreen=entries[0].isIntersecting;if(onScreen&&!paused&&!document.hidden&&!manuallyPaused)playVideo(v);else v.pause();},{threshold:.55}).observe(root);
 $('.inline-play',root).addEventListener('click',()=>{manuallyPaused=!v.paused;if(v.paused){manuallyPaused=false;playVideo(v);}else v.pause();});
 $('.inline-sound',root).addEventListener('click',()=>{v.muted=!v.muted;labelPlayer(root);if(v.paused){manuallyPaused=false;playVideo(v);}});
 $('.inline-full',root).addEventListener('click',()=>{if(v.requestFullscreen)v.requestFullscreen().catch(()=>{});else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen();});
 ['play','pause','volumechange','loadedmetadata'].forEach(event=>v.addEventListener(event,()=>labelPlayer(root)));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)v.pause();else if(onScreen&&!paused&&!manuallyPaused)playVideo(v);});
 $('.motion-toggle').addEventListener('click',()=>{if(paused)v.pause();else if(onScreen&&!manuallyPaused)playVideo(v);});
 reduced.addEventListener('change',()=>{if(paused)v.pause();});
 labelPlayer(root);
});
$('.lang').addEventListener('click',()=>{cycleLabel();players.forEach(labelPlayer);});
// Wide screens pin the split canvas; phones reveal each benefit in normal document flow.
function updateBenefits(){
 const section=$('.benefits-scroll');if(!section)return;
 const mobile=matchMedia('(max-width:760px)').matches;
 const rect=section.getBoundingClientRect();
 const progress=paused?1:Math.max(0,Math.min(1,-rect.top/Math.max(1,section.offsetHeight-innerHeight)));
 section.style.setProperty('--benefit-progress',progress);
 $$('.benefit-side').forEach(side=>{
  const r=side.getBoundingClientRect();
  const p=paused?1:mobile?Math.max(0,Math.min(1,(innerHeight*.82-r.top)/(r.height*.75))):progress;
  $$('.benefit-row',side).forEach((row,i)=>{
   const t=paused?1:Math.max(0,Math.min(1,(p-(i*.14+.02))/.18));
   row.style.opacity=String(.12+t*.88);row.style.transform=`translateY(${(1-t)*22}px)`;
  });
  const stat=$('.benefit-stat',side), t=Math.max(0,Math.min(1,(p-.42)/.4));
  stat.style.opacity=String(.1+.9*t);stat.style.transform=`translateY(${(1-t)*30}px)`;
  $('[data-counter]',side).textContent=String(Math.round(20*(1-Math.pow(1-t,3))));
 });
}
requestScroll();
