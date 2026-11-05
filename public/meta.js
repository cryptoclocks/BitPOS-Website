document.documentElement.classList.add('js');
const TH={
nav1:'ลำดับการใช้งาน',nav2:'ภาพยนตร์',nav3:'ความปลอดภัย',nav4:'สถานะ',nav5:'BitPOS หลัก ↗',
eye:'BITPOS × MUSE · META GLOBAL AI DEVELOPER HACKATHON',h1a:'แตะครั้งเดียว',h1b:'ตกลงครั้งเดียว',lead:'แตะมือถือที่โต๊ะ กดยินยอมครั้งเดียวใน Messenger แล้ว AI ของร้านที่รู้จักเมนู เคารพราคา และทำงานให้เจ้าของร้าน ก็ดูแลต่อให้',
b1:'เปิดร้านเดโม ↗',b2:'ซอร์สโค้ด ↗',b3:'คู่มือกรรมการ ↗',film:'ภาพยนตร์ BITPOS × MUSE',filmlen:'02:57 · จากแตะถึงครัว',filmnote:'วิดีโอ motion ใช้ข้อมูลตัวอย่าง ทุกการจ่ายเป็น Stripe sandbox ไม่ใช้เงินจริง',
t1:'สร้างช่วง 26 ต.ค. – 4 พ.ย. 2026',t2:'ต่อยอดจาก BitPOS POS เดิม',h2a:'จากการแตะ',h2b:'ถึงครัว',lead2:'ลูกค้าไม่ต้องติดตั้งแอปเพิ่ม ทุกขั้นตอนอยู่ใน Messenger โดยมี server คุมราคาและการจ่าย',
k1:'01 / แตะ',c1a:'Messenger เปิด',c1b:'ที่โต๊ะของคุณ',c1p:'กดยินยอมครั้งเดียว ไม่ต้องสมัครสมาชิก สติกเกอร์ NTAG 424 สร้างลิงก์ใช้ครั้งเดียว และ server ตรวจทุกครั้ง',
k2:'02 / โปรและจ่าย',c2a:'Muse Spark เลือก',c2b:'server ตั้งราคา',c2p:'โมเดลเลือกจากโปรที่เจ้าของร้านอนุมัติเท่านั้น และไม่เคยตั้งราคาเอง จ่ายผ่าน Stripe Checkout',
k3:'03 / สั่งในแชท',c3a:'พูดสิ่งที่อยากได้',c3b:'ไม่ต้องจำชื่อเมนู',c3p:'Muse Spark แก้ตะกร้าจริงผ่านเครื่องมือของ server ทั้งไทยและอังกฤษ ทั้งพิมพ์และพูด ส่งรูปอาหารก็หาเมนูที่ใกล้เคียงได้',
k4:'04 / ให้ AI จ่ายแทน',c4a:'ให้ AI จ่าย',c4b:'ภายใต้วงเงินของคุณ',c4p:'ตั้งได้ 1 วันถึง 3 เดือน มีเพดานต่อออเดอร์และยอดรวม สั่งแล้วตัดบัตรที่บันทึกไว้ และหยุดได้ทุกเมื่อ',
k5:'05 / จองและสั่งล่วงหน้า',c5a:'อาหารรอ',c5b:'จนคุณแตะเช็กอิน',c5p:'จองในแชทจากเวลาที่ว่างเท่านั้น ออเดอร์ที่จ่ายล่วงหน้าจะยังไม่เข้าคิวครัวจนกว่าลูกค้าจะแตะที่โต๊ะ',
k6:'06 / MUSE CONNECTOR',c6a:'AI ของลูกค้า',c6b:'ก็สั่งได้',c6p:'Connector แบบ MCP ให้เมนู ใบเสนอราคาจาก server และ checkout โดย agent ส่งแค่ ID ไม่ตั้งราคา และไม่เห็นบัตร',
k7:'07 / เจ้าของร้าน',c7a:'AI ร่าง',c7b:'คนอนุมัติ',c7p:'Muse Spark ร่างโปร Muse Image ทำแบนเนอร์ ไม่มีอะไรขึ้นจริงถ้าไม่อนุมัติ และเปิด Allow All แบบมีขอบเขตและเพดานรายวันได้ ยกเลิกได้ทันที',
t3:'เบื้องหลัง',t4:'ใช้งานจริงได้',h2c:'โมเดลเลือก',h2d:'server ตัดสิน',lead3:'โมเดลของ Meta ทำงานจริงในระบบ โดยมีกติกาที่ server ควบคุม',
g1:'Muse Spark',g1p:'เลือกโปร ขั้นตอนแชท เครื่องมือตะกร้า เทียบรูปกับเมนู และร่างโปร ด้วย structured output จากรายการที่ server สร้าง',g2:'Muse Image · SAM 3.1',g2p:'Muse Image ทำแบนเนอร์และภาพจับคู่เมนู ติดป้ายว่า AI ทำ ส่วน SAM 3.1 นับสต็อกจากรูป',g3:'Muse Wonder · Voice',g3p:'Muse Wonder ตอบเจ้าของร้านผ่านเครื่องมืออ่านอย่างเดียว ส่วน Muse Voice Transcribe ถอดเสียงและแยกออเดอร์ตามผู้พูด',
g4:'PAID ต้องมีหลักฐาน',g4p:'สถานะจ่ายแล้วมาจาก webhook ที่ลงนาม หรือการตรวจฝั่ง server เท่านั้น',g5:'เหตุการณ์ซ้ำไม่มีผล',g5p:'webhook ซ้ำไม่ตัดสต็อกหรือสร้างผลซ้ำ ข้อมูลแต่ละร้านแยกด้วย row-level security',g6:'มีบันทึกและทางสำรอง',g6p:'ทุกการเรียกโมเดลอยู่ในบันทึกหลักฐาน และร้านยังขายได้เมื่อโมเดลล่ม',
flag:'SANDBOX เท่านั้น',h2e:'สถานะตอนนี้',h2f:'บอกตามจริง',l1:'ระบบ deploy แล้ว ใช้ร้านเดโม Muse Café และเมนูตัวอย่าง',l2:'ใช้ Stripe sandbox กับร้านทดสอบในสหรัฐฯ ไม่มีเงินจริง',l3:'แอป Meta ยังอยู่ใน development mode Messenger จึงตอบเฉพาะบัญชีที่มีสิทธิ์ในแอป',l4:'การ์ดจริงที่โต๊ะ 1 ใช้ลิงก์ธรรมดาที่คัดลอกได้ ส่วนการตรวจ NTAG 424 สร้างและทดสอบด้วยการแตะจำลองแล้ว',l5:'ในแอป Muse แต่ละการซื้อยังต้องกดอนุมัติ สิทธิ์ AI จ่ายแทนใช้กับแชท Messenger และ connector ของเรา',l6:'BitPOS POS และ BitPOS Mini มีมาก่อนงานแข่ง',l6a:'รายงานที่มาของงาน',l6b:'แยกงานเก่ากับงานใหม่ไว้',
foot:'สร้างโดย Natthapong Suwanjit เป็นโปรเจกต์อิสระสำหรับงานแข่ง ไม่ได้จัดทำโดย Meta',illus:'ภาพจำลองหน้าจอ · ข้อมูลตัวอย่าง'};
const EN={};const nodes=[...document.querySelectorAll('[data-i18n]')];nodes.forEach(n=>{EN[n.dataset.i18n]=n.textContent});
const btn=document.querySelector('.lang');
function setLang(l){document.documentElement.lang=l;nodes.forEach(n=>{const k=n.dataset.i18n;n.textContent=l==='th'?(TH[k]??EN[k]):EN[k]});btn.textContent=l==='th'?'EN':'TH';btn.setAttribute('aria-label',l==='th'?'Switch to English':'Switch to Thai');try{localStorage.setItem('bitpos-lang',l)}catch{}}
btn.addEventListener('click',()=>setLang(document.documentElement.lang==='th'?'en':'th'));
let saved=null;try{saved=localStorage.getItem('bitpos-lang')}catch{}if(saved==='th')setLang('th');
const bar=document.querySelector('.scroll-progress');const onScroll=()=>{const h=document.documentElement,m=h.scrollHeight-h.clientHeight;bar.style.transform=`scaleX(${m>0?h.scrollTop/m:0})`};addEventListener('scroll',onScroll,{passive:true});onScroll();
const items=[...document.querySelectorAll('.reveal')];if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});items.forEach(i=>io.observe(i))}else items.forEach(i=>i.classList.add('in'));
