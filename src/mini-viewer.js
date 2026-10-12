import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export async function mountMini(host) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({alpha:true, antialias:true, powerPreference:'low-power'}); }
  catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-label','Interactive BitPOS Mini 3D model. Drag to rotate. Use arrow keys to turn.');
  renderer.domElement.setAttribute('role','img');
  renderer.domElement.tabIndex=0;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(32,1,.1,1000);
  camera.position.set(90,65,175);
  const controls=new OrbitControls(camera,renderer.domElement);
  controls.enableDamping=true;controls.enablePan=false;controls.enableZoom=false;
  controls.minPolarAngle=.35;controls.maxPolarAngle=Math.PI*.65;
  controls.autoRotateSpeed=.75;
  scene.add(new THREE.HemisphereLight(0xfff5ff,0x655074,3));
  for(const [color,intensity,x,y,z] of [[0xffffff,4,100,180,160],[0xb47aff,3,-140,70,-70],[0xffa958,2,120,30,-90]]){
    const light=new THREE.DirectionalLight(color,intensity);light.position.set(x,y,z);scene.add(light);
  }
  try {
    const gltf=await new GLTFLoader().loadAsync('/assets/model/bitpos-mini.glb');
    const model=gltf.scene;
    const box=new THREE.Box3().setFromObject(model), centre=box.getCenter(new THREE.Vector3());
    model.position.sub(centre);scene.add(model);
    model.traverse(o=>{
      if(!o.isMesh)return;
      if(o.name==='ScreenSurface')return;
      const materials=Array.isArray(o.material)?o.material:[o.material];
      for(const m of materials){
        if(m.name.includes('glass')||m.name.includes('Glass')){m.color.set('#211329');m.metalness=.15;m.roughness=.22;}
        if(m.name.includes('Case')){m.color.set('#54305f');m.metalness=.25;m.roughness=.36;}
      }
    });
    const screen=model.getObjectByName('ScreenSurface');
    const face=document.createElement('canvas');face.width=720;face.height=480;
    const ctx=face.getContext('2d');const texture=new THREE.CanvasTexture(face);
    texture.colorSpace=THREE.SRGBColorSpace;texture.flipY=false;
    texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
    if(screen){screen.translateY(.12);screen.material=new THREE.MeshBasicMaterial({map:texture,side:THREE.FrontSide,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});}
    const logo=new Image();logo.src='/assets/logo.webp';await logo.decode().catch(()=>{});
    let step=Number(document.querySelector('.step.active')?.dataset.step??0), visible=false, last=0, manualOrbit=false;
    const homeOrbit=new THREE.Spherical().setFromVector3(camera.position);
    function drawScreen(){
      const w=720,h=480;
      ctx.fillStyle='#241032';ctx.fillRect(0,0,w,h);
      ctx.fillStyle='#fff8f0';ctx.beginPath();ctx.roundRect(32,26,156,55,10);ctx.fill();
      if(logo.naturalWidth)ctx.drawImage(logo,42,33,136,42);
      ctx.textAlign='right';ctx.font='500 17px sans-serif';ctx.fillStyle='#d8bfdc';ctx.fillText('TABLE 01',685,58);
      ctx.textAlign='center';
      if(step===0){
        ctx.font='700 39px sans-serif';ctx.fillStyle='#fff8f0';ctx.fillText('Your next favourite.',360,146);
        ctx.font='21px sans-serif';ctx.fillStyle='#d8bfdc';ctx.fillText('Scan. Choose. Enjoy.',360,185);
        ctx.fillStyle='#fff8f0';ctx.beginPath();ctx.roundRect(273,213,174,174,14);ctx.fill();
        // A stylized preview code, deliberately not a live checkout QR.
        ctx.fillStyle='#371048';
        for(const [x,y] of [[288,228],[382,228],[288,322]]){
          ctx.fillRect(x,y,50,50);ctx.fillStyle='#fff8f0';ctx.fillRect(x+7,y+7,36,36);ctx.fillStyle='#371048';ctx.fillRect(x+14,y+14,22,22);
        }
        for(let y=0;y<9;y++)for(let x=0;x<9;x++)if((x*7+y*11)%5<2 && !(x<3&&y<3) && !(x>5&&y<3) && !(x<3&&y>5))ctx.fillRect(288+x*16,y*16+228,11,11);
        ctx.font='600 18px sans-serif';ctx.fillStyle='#ff9d36';ctx.fillText('SCAN TO ORDER',360,435);
      } else if(step===1){
        ctx.font='700 35px sans-serif';ctx.fillStyle='#fff8f0';ctx.fillText('A little coffee break.',360,151);
        ctx.font='21px sans-serif';ctx.fillStyle='#d8bfdc';ctx.fillText('Iced latte  +  Butter croissant',360,201);
        ctx.font='700 73px sans-serif';ctx.fillStyle='#ff9d36';ctx.fillText('$4.80',360,303);
        ctx.fillStyle='#fff8f0';ctx.beginPath();ctx.roundRect(135,345,450,66,16);ctx.fill();
        ctx.font='700 24px sans-serif';ctx.fillStyle='#3a1649';ctx.fillText('PAY WITH USDG',360,388);
        ctx.font='17px sans-serif';ctx.fillStyle='#d8bfdc';ctx.fillText('Network fee on the café',360,449);
      } else {
        ctx.fillStyle='#b8edb9';ctx.beginPath();ctx.arc(360,174,52,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle='#241032';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(337,174);ctx.lineTo(354,192);ctx.lineTo(387,155);ctx.stroke();
        ctx.font='700 43px sans-serif';ctx.fillStyle='#fff8f0';ctx.fillText('Payment received.',360,294);
        ctx.font='22px sans-serif';ctx.fillStyle='#d8bfdc';ctx.fillText('Good coffee. Great company.',360,342);
        ctx.fillStyle='#ff9d36';ctx.font='700 22px sans-serif';ctx.fillText('THANK YOU ♡',360,417);
      }
      texture.needsUpdate=true;
    }
    drawScreen();
    host.prepend(renderer.domElement);host.classList.add('model-ready');
    host.dataset.modelLoaded='true';
    renderer.domElement.addEventListener('webglcontextlost',()=>{host.classList.remove('model-ready');},{once:true});
    controls.addEventListener('start',()=>{manualOrbit=true;});
    renderer.domElement.addEventListener('keydown',e=>{
      if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;
      e.preventDefault();manualOrbit=true;
      if(e.key==='Home'){camera.position.set(90,65,175);controls.target.set(0,0,0);manualOrbit=false;}
      else{const spherical=new THREE.Spherical().setFromVector3(camera.position);spherical.theta+=e.key==='ArrowLeft'?.15:e.key==='ArrowRight'?-.15:0;spherical.phi+=e.key==='ArrowUp'?-.1:e.key==='ArrowDown'?.1:0;spherical.phi=THREE.MathUtils.clamp(spherical.phi,.35,Math.PI*.65);camera.position.setFromSpherical(spherical);}
      controls.update();renderer.render(scene,camera);
    });
    function resize(){const r=host.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();renderer.render(scene,camera);}
    new ResizeObserver(resize).observe(host);resize();
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:.15}).observe(host);
    window.addEventListener('mini-step',e=>{step=e.detail;drawScreen();renderer.render(scene,camera);});
    renderer.setAnimationLoop(now=>{
      if(!visible||document.hidden)return;
      const paused=document.documentElement.classList.contains('motion-paused');
      controls.autoRotate=false;
      if(!paused&&!manualOrbit){const orbit=homeOrbit.clone();orbit.theta+=Math.sin(now*.00018)*.26;orbit.phi+=Math.sin(now*.00013)*.035;camera.position.setFromSpherical(orbit);}
      controls.update(Math.min((now-last)/1000,.05));last=now;
      renderer.render(scene,camera);
    });
  } catch {renderer.dispose();}
}
