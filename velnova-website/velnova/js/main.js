const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
gsap.registerPlugin(ScrollTrigger);
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const V=BOTTLE.variants;
const S={rotY:.25,camZ:(innerWidth<900||innerHeight>innerWidth)?13.5:12,camY:.2,lookY:.4,hue:160,lift:0,x:0},U={rotY:0,rotX:0,dz:0,lookX:0,lookY:0};
let R,scene,cam,model,uni,pts,glow,gl=false,narrow=(innerWidth<900||innerHeight>innerWidth);
try{R=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true,alpha:true,powerPreference:'high-performance'});gl=true}catch(e){document.body.classList.add('nogl')}

if(gl){
 R.setPixelRatio(Math.min(devicePixelRatio,narrow?1.5:2));
 R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.05;R.outputEncoding=THREE.sRGBEncoding;
 scene=new THREE.Scene();cam=new THREE.PerspectiveCamera(30,1,.1,100);
 const ec=document.createElement('canvas');ec.width=512;ec.height=256;const ex=ec.getContext('2d');
 const eg=ex.createLinearGradient(0,0,0,256);eg.addColorStop(0,'#cfeee6');eg.addColorStop(.5,'#2a8c93');eg.addColorStop(1,'#04181b');
 ex.fillStyle=eg;ex.fillRect(0,0,512,256);ex.fillStyle='#fff';ex.fillRect(60,70,90,60);ex.fillRect(330,60,120,40);ex.fillStyle='#7fd0ff';ex.fillRect(200,90,50,80);
 const et=new THREE.CanvasTexture(ec);et.mapping=THREE.EquirectangularReflectionMapping;et.encoding=THREE.sRGBEncoding;
 scene.environment=new THREE.PMREMGenerator(R).fromEquirectangular(et).texture;
 const key=new THREE.DirectionalLight(0xffffff,1.5);key.position.set(3,4,5);scene.add(key);
 const rim=new THREE.DirectionalLight(0x39a0ff,2.2);rim.position.set(-5,2,-4);scene.add(rim);
 glow=new THREE.PointLight(0x18d6a0,2.5,14);glow.position.set(-3,-1,3);scene.add(glow);

 const rr=(w,h,rb,rt,P=THREE.Shape)=>{const s=new P(),x=-w/2,y=-h/2;s.moveTo(x+rb,y);s.lineTo(x+w-rb,y);s.quadraticCurveTo(x+w,y,x+w,y+rb);s.lineTo(x+w,y+h-rt);s.quadraticCurveTo(x+w,y+h,x+w-rt,y+h);s.lineTo(x+rt,y+h);s.quadraticCurveTo(x,y+h,x,y+h-rt);s.lineTo(x,y+rb);s.quadraticCurveTo(x,y,x+rb,y);return s};
 const ext=(s,d,b)=>{const g=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:5,curveSegments:24});g.center();return g};
 model=new THREE.Group();scene.add(model);

 // liquid: independent mesh with its own shader
 const B=BOTTLE.body,L=BOTTLE.liquid,DV=V[BOTTLE.defaultVariant],TW=B.width+.24,TOP=B.height/2+.12;
 uni={uC:{value:new THREE.Color(DV.c)},uD:{value:new THREE.Color(DV.c2)},uA:{value:.92},uT:{value:0}};
 const liquid=new THREE.Mesh(ext(rr(L.width,L.height,.22,.03),L.depth,.08),new THREE.ShaderMaterial({uniforms:uni,transparent:true,
  vertexShader:`varying vec3 vN,vV,vP,vO;void main(){vP=position;vO=normal;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=-mv.xyz;gl_Position=projectionMatrix*mv;}`,
  fragmentShader:`uniform vec3 uC,uD;uniform float uA,uT;varying vec3 vN,vV,vP,vO;
  void main(){vec3 N=normalize(vN),V=normalize(vV);
  if(vO.y>.9)N=normalize(N+vec3(.07*sin(vP.x*7.+uT*1.6),0.,.07*cos(vP.z*9.+uT*1.3)));
  float f=pow(1.-max(dot(N,V),0.),2.2);vec3 L=normalize(vec3(.5,.8,.7));float df=max(dot(N,L),0.);
  float sp=pow(max(dot(N,normalize(L+V)),0.),70.),sp2=pow(max(dot(N,normalize(vec3(-.7,.3,.4)+V)),0.),40.);
  vec3 base=mix(uD,uC,smoothstep(-.9,.9,vP.y+.15*sin(vP.x*3.+uT*.6)));
  vec3 col=base*(.55+.5*df)+(sp+.5*sp2)*vec3(1.)+f*mix(uC,vec3(1.),.45)*.6;
  if(vO.y>.9)col+=.12;gl_FragColor=vec4(col,clamp(uA+f*.15,0.,1.));}`}));
 liquid.position.y=-TOP+.17+(L.height+.16)/2;liquid.renderOrder=1;model.add(liquid);

 // translucent plastic shell
 const shell=new THREE.Mesh(ext(rr(B.width,B.height,B.radius,B.radius),B.depth,.12),new THREE.MeshPhysicalMaterial({color:B.color,roughness:.32,clearcoat:.7,clearcoatRoughness:.25,transparent:true,opacity:B.opacity,depthWrite:false,envMapIntensity:1.1}));
 shell.renderOrder=2;model.add(shell);

 // handle (solid, upper right)
 const hs=rr(1,.85,.28,.28);hs.holes.push(rr(.56,.42,.14,.14,THREE.Path));
 const solid=new THREE.MeshPhysicalMaterial({color:BOTTLE.handleColor,roughness:.45,clearcoat:.5,clearcoatRoughness:.4});
 const handle=new THREE.Mesh(ext(hs,.3,.06),solid);handle.position.set(.246*TW,TOP+.285,0);model.add(handle);

 // cap (upper left)
 const cap=new THREE.Group();cap.position.set(-.254*TW,TOP,0);model.add(cap);
 const neck=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,.3,40),solid);neck.position.y=.1;cap.add(neck);
 const dark=new THREE.MeshPhysicalMaterial({color:BOTTLE.capColor,roughness:.35,clearcoat:.6});
 const lid=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.28,48),dark);lid.position.y=.32;cap.add(lid);
 const top=new THREE.Mesh(new THREE.CylinderGeometry(.24,.26,.05,40),dark);top.position.y=.48;cap.add(top);
 for(let i=0;i<30;i++){const a=i/30*Math.PI*2,r=new THREE.Mesh(new THREE.BoxGeometry(.045,.26,.05),dark);r.position.set(Math.cos(a)*.385,.32,Math.sin(a)*.385);r.rotation.y=-a;cap.add(r)}

 // label (identical on both sides, never changes with the chemistry)
 const lc=document.createElement('canvas');lc.width=768;lc.height=330;const lx=lc.getContext('2d'),lt=new THREE.CanvasTexture(lc);lt.encoding=THREE.sRGBEncoding;lt.anisotropy=8;
 const draw=()=>{lx.clearRect(0,0,768,330);lx.fillStyle='rgba(255,255,255,.94)';lx.fillRect(0,0,768,330);
  const g=lx.createLinearGradient(0,0,768,0);g.addColorStop(0,'#12b886');g.addColorStop(1,'#2b86e8');lx.fillStyle=g;lx.fillRect(0,300,768,30);
  lx.fillStyle='#06463a';lx.textAlign='center';lx.font='800 118px Manrope,sans-serif';lx.fillText(BOTTLE.label.title,384,170);
  lx.fillStyle='#4a6a62';lx.font='600 28px Manrope,sans-serif';lx.fillText(BOTTLE.label.subtitle,384,230);
  lx.textAlign='left';lx.font='600 22px Manrope,sans-serif';lx.fillText(BOTTLE.label.tag,30,48);lt.needsUpdate=true};
 draw();document.fonts&&document.fonts.ready.then(draw);
 window.setLabel=o=>{Object.assign(BOTTLE.label,o);draw()};
 const lm=new THREE.MeshStandardMaterial({map:lt,transparent:true,roughness:.5});
 [[B.depth/2+.125,0],[-B.depth/2-.125,Math.PI]].forEach(([z,ry])=>{const p=new THREE.Mesh(new THREE.PlaneGeometry(1.6,.69),lm);p.position.set(0,-.55,z);p.rotation.y=ry;p.renderOrder=3;model.add(p)});

if(BOTTLE.modelUrl){const gs=document.createElement('script');gs.src='https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
  gs.onload=()=>new THREE.GLTFLoader().load(BOTTLE.modelUrl,g=>{const o=g.scene,w=new THREE.Group();
   o.traverse(m=>{if(m.isMesh&&/liquid/i.test(m.name)){m.material=liquid.material;m.renderOrder=1}});
   const bb=new THREE.Box3().setFromObject(o),sz=bb.getSize(new THREE.Vector3());o.position.sub(bb.getCenter(new THREE.Vector3()));
   w.add(o);w.scale.setScalar((BOTTLE.modelHeight||3.2)/sz.y);model.clear();model.add(w)},undefined,e=>console.warn('VELNOVA: could not load',BOTTLE.modelUrl,e));
  document.head.appendChild(gs)}
 // particles
 const N=240,pa=new Float32Array(N*3);for(let i=0;i<N;i++){pa[i*3]=(Math.random()-.5)*14;pa[i*3+1]=(Math.random()-.5)*9;pa[i*3+2]=(Math.random()-.5)*8-1}
 const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pa,3));
 pts=new THREE.Points(pg,new THREE.PointsMaterial({size:.035,color:0x9ff0d6,transparent:true,opacity:.55,depthWrite:false,blending:THREE.AdditiveBlending}));scene.add(pts);

 const size=()=>{narrow=(innerWidth<900||innerHeight>innerWidth);R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};
 size();addEventListener('resize',()=>{size();ScrollTrigger.refresh()});
 let hue=-1,last=performance.now()/1000;
 (function tick(){requestAnimationFrame(tick);const t=performance.now()/1000,dt=Math.min(t-last,.05);last=t;
  uni.uT.value=t;
  const idle=calm?0:Math.sin(t*.5)*.12;
  model.rotation.y+=(S.rotY+U.rotY+idle-model.rotation.y)*.12;model.rotation.x+=(U.rotX-model.rotation.x)*.12;
  model.position.y=S.lift+(calm?0:Math.sin(t*.9)*.04);
  {const hp=Math.min(1,scrollY/innerHeight),hx=narrow?0:2*Math.tan(Math.PI/12)*12*cam.aspect*.19;model.position.x+=(hx*(1-hp*hp*(3-2*hp))-model.position.x)*.1}
  cam.position.set(U.lookX,S.camY,S.camZ+U.dz);cam.lookAt(U.lookX,S.lookY+U.lookY-(narrow?.75:0),0);
  if(!calm){const a=pa;for(let i=0;i<N;i++){a[i*3+1]+=dt*.18;if(a[i*3+1]>4.5)a[i*3+1]=-4.5}pg.attributes.position.needsUpdate=true}
  pts.rotation.y=scrollY*.0004;
  if(hue!==S.hue){hue=S.hue;$('#bg').style.background=`radial-gradient(70% 60% at 50% 45%,hsl(${hue} 70% 22%),hsl(${hue+12} 65% 6%))`}
  R.render(scene,cam)})();
}else{$('#bg').style.background='radial-gradient(70% 60% at 50% 45%,hsl(165 70% 22%),hsl(175 65% 6%))'}

// colour configurator
let cur=2;
$$('[data-sw]').forEach(w=>V.forEach((v,i)=>{const b=document.createElement('button');b.dataset.i=i;b.setAttribute('aria-label',v.n+' – '+v.d);b.style.background=`linear-gradient(135deg,${v.c},${v.c2})`;b.onclick=()=>setV(i);w.appendChild(b)}));
function setV(i){cur=i;const v=V[i];
 $$('[data-sw] button').forEach(b=>b.classList.toggle('on',+b.dataset.i===i));
 $$('[data-vn]').forEach(e=>e.textContent=v.n);$$('[data-vd]').forEach(e=>e.textContent=v.d);
 $$('.quote').forEach(a=>a.href='mailto:'+CONTENT.contact.email+'?subject='+encodeURIComponent('Quote request – VELNOVA '+v.n));
 if(uni){const c=new THREE.Color(v.c),d=new THREE.Color(v.c2);
  gsap.to(uni.uC.value,{r:c.r,g:c.g,b:c.b,duration:1.1,ease:'power2.inOut'});
  gsap.to(uni.uD.value,{r:d.r,g:d.g,b:d.b,duration:1.1,ease:'power2.inOut'});
  gsap.to(uni.uA,{value:v.a,duration:1.1});gsap.to(glow.color,{r:c.r,g:c.g,b:c.b,duration:1.1})}}
setV(BOTTLE.defaultVariant);

// scroll story: one scrubbed timeline drives the fixed model
const tl=gsap.timeline({defaults:{ease:'power2.inOut',duration:1},scrollTrigger:{trigger:'#showcase',start:'top top',end:'bottom bottom',scrub:.9}});
tl.to(S,{rotY:1.5,camZ:7.8,camY:.1,lookY:.3,hue:178})
  .to(S,{rotY:.5,camZ:5.4,camY:.45,lookY:.55,hue:205})
  .to(S,{rotY:.2,camZ:7.4,camY:.1,lookY:.3,hue:185})
  .to(S,{rotY:3.5,camZ:8.2,camY:.3,hue:165})
  .to(S,{rotY:6.9,camZ:9.2,camY:.2,hue:195});
gsap.to(S,{lift:3.5,ease:'none',scrollTrigger:{trigger:'#after',start:'top bottom',end:'top top',scrub:true}});
gsap.to('#prog',{scaleX:1,ease:'none',scrollTrigger:{scrub:.2,start:0,end:'max'}});
gsap.to('.hero-copy,.mega',{opacity:0,y:-40,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom 35%',scrub:true}});
$$('.in').forEach(p=>gsap.from(p,{opacity:0,y:36,duration:.8,scrollTrigger:{trigger:p.parentElement,start:'top 60%',toggleActions:'play none none reverse'}}));

// 360 inspection
const U0={rotY:0,rotX:0,dz:0,lookX:0,lookY:0},clamp=v=>Math.max(-6.4,Math.min(4,v));
const resetU=()=>{gsap.killTweensOf(U);gsap.to(U,{...U0,duration:1.1,ease:'power3.inOut'})};
const ins=$('#inspect');let dn=false,px=0,py=0;
ins.addEventListener('pointerdown',e=>{if(e.target.closest('button,a'))return;dn=true;px=e.clientX;py=e.clientY;gsap.killTweensOf(U);ins.classList.add('drag')});
addEventListener('pointermove',e=>{if(!dn)return;U.rotY+=(e.clientX-px)*.009;U.rotX=Math.max(-.6,Math.min(.6,U.rotX+(e.clientY-py)*.006));px=e.clientX;py=e.clientY});
['pointerup','pointercancel'].forEach(n=>addEventListener(n,()=>{dn=false;ins.classList.remove('drag')}));
ins.addEventListener('wheel',e=>{if(e.ctrlKey){e.preventDefault();U.dz=clamp(U.dz+e.deltaY*.01)}},{passive:false});
$$('[data-z]').forEach(b=>b.onclick=()=>gsap.to(U,{dz:clamp(U.dz+ +b.dataset.z*1.4),duration:.6}));
const F={cap:{lookX:-.62,lookY:1.45,dz:-6.2,f:0},handle:{lookX:.6,lookY:1.65,dz:-6.2,f:0},liquid:{lookX:0,lookY:.3,dz:-4.8,f:.35}};
$$('[data-f]').forEach(b=>b.onclick=()=>{const p=F[b.dataset.f],T=Math.PI*2,tot=p.f+T*Math.round((S.rotY-p.f)/T);gsap.killTweensOf(U);gsap.to(U,{rotY:tot-S.rotY,rotX:0,dz:p.dz,lookX:p.lookX,lookY:p.lookY,duration:1.3,ease:'power3.inOut'})});
$('#reset').onclick=resetU;
ScrollTrigger.create({trigger:'#inspect',start:'top 70%',end:'bottom 30%',onToggle:s=>{if(!s.isActive)resetU()}});

// cursor, magnetic buttons, card glow
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
 document.documentElement.classList.add('fx');document.body.classList.add('fx');
 let mx=0,my=0,cx=0,cy=0;const c1=$('#cur'),c2=$('#cur2');
 addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
 gsap.ticker.add(()=>{cx+=(mx-cx)*.18;cy+=(my-cy)*.18;c1.style.transform=`translate(${mx}px,${my}px)`;c2.style.transform=`translate(${cx}px,${cy}px)`});
 document.addEventListener('pointerover',e=>c2.classList.toggle('big',!!e.target.closest('a,button,.card')));
 $$('.mag').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.35,duration:.3})});el.addEventListener('pointerleave',()=>gsap.to(el,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'}))});
}
$$('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--x',(e.clientX-r.left)+'px');c.style.setProperty('--y',(e.clientY-r.top)+'px')}));

// loading + hero entrance
gsap.timeline().to('#load i',{scaleX:1,duration:1,ease:'power2.inOut'}).to('#load',{yPercent:-100,duration:.9,ease:'power4.inOut'})
 .from('.mega span',{yPercent:110,stagger:.06,duration:1,ease:'power4.out'},'-=.4')
 .from('.hero-copy > *',{y:30,opacity:0,stagger:.1,duration:.9},'-=.7').from('nav',{opacity:0,duration:.8},'<');
