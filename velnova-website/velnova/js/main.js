const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
gsap.registerPlugin(ScrollTrigger);
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const V=BOTTLE.variants;
const contactEmail=$('#contact-email');
contactEmail.href='mailto:'+CONTENT.contact.email;
contactEmail.textContent=CONTENT.contact.email;
const S={rotY:.1,camZ:(innerWidth<900||innerHeight>innerWidth)?13.5:12,camY:.2,lookY:.4,hue:160,lift:0,x:0},U={rotY:0,rotX:0,dz:0,lookX:0,lookY:0};
let R,scene,cam,model,pts,moleculeMaterials=[],gl=false,narrow=(innerWidth<900||innerHeight>innerWidth);
try{R=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true,alpha:true,powerPreference:'high-performance'});gl=true}catch(e){document.body.classList.add('nogl')}

if(gl){
 R.toneMapping=THREE.NoToneMapping;R.outputEncoding=THREE.sRGBEncoding;
 scene=new THREE.Scene();cam=new THREE.PerspectiveCamera(30,1,.1,100);
 model=new THREE.Group();scene.add(model);

 // Chemistry visual: an interconnected molecular structure rather than a packaged container.
 const DV=V[BOTTLE.defaultVariant];
 const coreMaterial=new THREE.MeshBasicMaterial({color:DV.c});
 const atomMaterial=new THREE.MeshBasicMaterial({color:0x78a9c5});
 const bondMaterial=new THREE.MeshBasicMaterial({color:0x347b9f,transparent:true,opacity:.82});
 moleculeMaterials=[coreMaterial];
 const atoms=[
  [0,0,0, .62],[1.15,.35,.12,.38],[.75,1.25,-.18,.34],[-.78,1.08,.28,.36],
  [-1.38,.12,-.08,.42],[-.82,-1.05,.18,.34],[.48,-1.18,-.22,.38],
  [1.42,-.62,.18,.30],[1.92,.72,-.05,.28],[.62,2.02,.22,.26],
  [-1.55,1.82,-.15,.27],[-2.18,-.46,.12,.30],[-.35,-2.02,.05,.25],
  [1.82,-1.48,.04,.24]
 ];
 const sphereGeometry=new THREE.SphereGeometry(1,16,12);
 const coreAtoms=atoms.filter((_,i)=>i===0||i%3===0);
 const otherAtoms=atoms.filter((_,i)=>i!==0&&i%3!==0);
 const addAtoms=(instances,material)=>{
  const mesh=new THREE.InstancedMesh(sphereGeometry,material,instances.length),transform=new THREE.Object3D();
  instances.forEach((atom,i)=>{
   transform.position.set(atom[0]*1.35,atom[1]*1.35,atom[2]*1.35);
   transform.scale.setScalar(atom[3]);transform.updateMatrix();mesh.setMatrixAt(i,transform.matrix);
  });
  mesh.instanceMatrix.needsUpdate=true;mesh.frustumCulled=false;model.add(mesh);
 };
 addAtoms(coreAtoms,coreMaterial);addAtoms(otherAtoms,atomMaterial);
 const bonds=[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,7],[1,8],[2,8],[2,9],[3,9],[3,10],[4,10],[4,11],[5,11],[5,12],[6,12],[6,13],[7,13]];
 const bondMesh=new THREE.InstancedMesh(new THREE.CylinderGeometry(1,1,1,5),bondMaterial,bonds.length),bondTransform=new THREE.Object3D();
 bonds.forEach(([from,to],i)=>{
  const start=new THREE.Vector3(...atoms[from].slice(0,3)).multiplyScalar(1.35);
  const end=new THREE.Vector3(...atoms[to].slice(0,3)).multiplyScalar(1.35);
  const direction=end.clone().sub(start),length=direction.length();
  bondTransform.position.copy(start).add(end).multiplyScalar(.5);
  bondTransform.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());
  bondTransform.scale.set(.055,length,.055);bondTransform.updateMatrix();bondMesh.setMatrixAt(i,bondTransform.matrix);
 });
 bondMesh.instanceMatrix.needsUpdate=true;bondMesh.frustumCulled=false;model.add(bondMesh);

 const orbitSpecs=[[2.45,.85,.12],[2.8,.18,1.05],[3.12,-.55,.68]];
 const orbitMaterial=new THREE.MeshBasicMaterial({color:0x398f8a,transparent:true,opacity:.42,depthWrite:false});
 const orbitMesh=new THREE.InstancedMesh(new THREE.TorusGeometry(1,.007,3,48),orbitMaterial,orbitSpecs.length),orbitTransform=new THREE.Object3D();
 orbitSpecs.forEach(([radius,tiltX,tiltZ],i)=>{
  orbitTransform.rotation.set(tiltX,.35,tiltZ);orbitTransform.scale.setScalar(radius);
  orbitTransform.updateMatrix();orbitMesh.setMatrixAt(i,orbitTransform.matrix);
 });
 orbitMesh.instanceMatrix.needsUpdate=true;orbitMesh.frustumCulled=false;model.add(orbitMesh);
 const halo=new THREE.Mesh(new THREE.SphereGeometry(.82,24,16),new THREE.MeshBasicMaterial({color:DV.c,transparent:true,opacity:.06,side:THREE.DoubleSide,depthWrite:false}));
 halo.scale.set(1,1,1);model.add(halo);
 // particles
 const N=80,pa=new Float32Array(N*3);for(let i=0;i<N;i++){pa[i*3]=(Math.random()-.5)*14;pa[i*3+1]=(Math.random()-.5)*9;pa[i*3+2]=(Math.random()-.5)*8-1}
 const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pa,3));
 pts=new THREE.Points(pg,new THREE.PointsMaterial({size:.035,color:0x57c3a5,transparent:true,opacity:.55,depthWrite:false,blending:THREE.AdditiveBlending}));scene.add(pts);

 const size=()=>{narrow=(innerWidth<900||innerHeight>innerWidth);R.setPixelRatio(Math.min(devicePixelRatio,narrow ? 0.6 : 0.7));R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};
 size();addEventListener('resize',()=>{size();ScrollTrigger.refresh()});
 let last=performance.now()/1000,lastRender=0;
 (function tick(now){requestAnimationFrame(tick);if(document.hidden||now-lastRender<1000/(narrow?30:60))return;lastRender=now;const t=now/1000,dt=Math.min(t-last,.05);last=t;
  const idle=calm?0:Math.sin(t*.5)*.12;
  model.rotation.y=S.rotY+U.rotY+idle;model.rotation.x=U.rotX;
  model.position.y=S.lift+(calm?0:Math.sin(t*.9)*.04);
  {const hp=Math.min(1,scrollY/innerHeight),hx=narrow?0:2*Math.tan(Math.PI/12)*12*cam.aspect*.19;model.position.x=hx*(1-hp*hp*(3-2*hp))}
  cam.position.set(U.lookX,S.camY,S.camZ+U.dz);cam.lookAt(U.lookX,S.lookY+U.lookY-(narrow?.75:0),0);
  if(!calm){const a=pa;for(let i=0;i<N;i++){a[i*3+1]+=dt*.18;if(a[i*3+1]>4.5)a[i*3+1]=-4.5}pg.attributes.position.needsUpdate=true}
  pts.rotation.y=scrollY*.0004;
  R.render(scene,cam)})(performance.now());
}

// colour configurator
let cur=2;
$$('[data-sw]').forEach(w=>V.forEach((v,i)=>{const b=document.createElement('button');b.dataset.i=i;b.setAttribute('aria-label',v.n+' – '+v.d);b.style.background=`linear-gradient(135deg,${v.c},${v.c2})`;b.onclick=()=>setV(i);w.appendChild(b)}));
function setV(i){cur=i;const v=V[i];
 $$('[data-sw] button').forEach(b=>b.classList.toggle('on',+b.dataset.i===i));
 $$('[data-vn]').forEach(e=>e.textContent=v.n);$$('[data-vd]').forEach(e=>e.textContent=v.d);
 if(moleculeMaterials.length){
  const c=new THREE.Color(v.c);
  gsap.to(moleculeMaterials[0].color,{r:c.r,g:c.g,b:c.b,duration:1.1,ease:'power2.inOut'});
 }}
setV(BOTTLE.defaultVariant);

// scroll story: one scrubbed timeline drives the fixed model
const tl=gsap.timeline({defaults:{ease:'power2.inOut',duration:1},scrollTrigger:{trigger:'#showcase',start:'top top',end:'bottom bottom',scrub:true}});
tl.to(S,{rotY:1.5,camZ:7.8,camY:.1,lookY:.3,hue:178})
  .to(S,{rotY:.5,camZ:5.4,camY:.45,lookY:.55,hue:205})
  .to(S,{rotY:.2,camZ:7.4,camY:.1,lookY:.3,hue:185})
  .to(S,{rotY:3.5,camZ:8.2,camY:.3,hue:165})
  .to(S,{rotY:6.9,camZ:9.2,camY:.2,hue:195});
gsap.to(S,{lift:3.5,ease:'none',scrollTrigger:{trigger:'#after',start:'top bottom',end:'top top',scrub:true}});
gsap.to('#prog',{scaleX:1,ease:'none',scrollTrigger:{scrub:.2,start:0,end:'max'}});
gsap.fromTo('.hero-copy,.mega',{opacity:1},{opacity:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom 35%',scrub:true}});
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
const F={core:{lookX:0,lookY:.2,dz:-5.2,f:0},structure:{lookX:.8,lookY:.8,dz:-4.6,f:.65},flow:{lookX:-.6,lookY:-.2,dz:-3.8,f:1.1}};
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
gsap.timeline().from('.hero-copy > *',{y:30,opacity:0,stagger:.1,duration:.9})
 .from('nav',{opacity:0,duration:.8},'<');
