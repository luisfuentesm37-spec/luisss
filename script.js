const c=document.getElementById('c'),x=c.getContext('2d');
let W,H;
function rs(){W=c.width=innerWidth;H=c.height=innerHeight}
rs();onresize=rs;

// tulipanes (altura en vh, retraso de la animación)
const jardin=document.getElementById('jardin');
[[52,-1],[68,-2.5],[58,-.5]].forEach(t=>{
  jardin.innerHTML+='<svg class="tulip" style="height:min('+t[0]+'vh,'+t[0]*.9+'vw);width:min('+t[0]/2+'vh,'+t[0]*.45+'vw);animation-delay:'+t[1]+'s" viewBox="0 0 100 200"><use href="#tulipan"/></svg>';
});

// Hierba mejorada: baja y natural
const pasto = document.getElementById('pasto');

for(let i = 0; i < 150; i++){

    const lado = Math.random() * 100;

    // Hierba más alta en los extremos
    const borde = lado < 20 || lado > 80;

    const h = borde
        ? 5 + Math.random() * 12
        : 3 + Math.random() * 7;

    const d = document.createElement('div');

    d.className = 'hoja';

    d.innerHTML = `
        <svg viewBox="0 0 20 100"
             preserveAspectRatio="none"
             width="100%"
             height="100%">

            <path
                d="M0 100 Q3 45 10 0 Q14 50 20 100Z"
                fill="hsl(${120 + Math.random()*45},65%,${22 + Math.random()*20}%)"
            />
        </svg>
    `;

    d.style.cssText = `
        left: ${lado}%;
        height: ${h}vh;
        width: ${5 + Math.random()*9}px;
        animation-delay: ${-Math.random()*3}s;
    `;

    pasto.appendChild(d);
}

// estrellas, fugaces, partículas y pétalos
const stars=Array.from({length:160},()=>({x:Math.random(),y:Math.random()*.7,r:Math.random()*1.4+.3,t:Math.random()*6}));
let ps=[],sh=[],pe=[];

function loop(){
  x.clearRect(0,0,W,H);

  stars.forEach(s=>{
    s.t+=.03;
    x.globalAlpha=.5+.5*Math.sin(s.t);
    x.fillStyle='#fff';
    x.beginPath();x.arc(s.x*W,s.y*H,s.r,0,7);x.fill();
  });

  if(Math.random()<.012)sh.push({x:Math.random()*W+200,y:Math.random()*H*.4,vx:-10,vy:5,l:1});
  sh=sh.filter(s=>s.l>0);
  sh.forEach(s=>{
    s.x+=s.vx;s.y+=s.vy;s.l-=.015;
    x.globalAlpha=s.l;
    x.strokeStyle='#fff';x.lineWidth=2;
    x.beginPath();x.moveTo(s.x,s.y);x.lineTo(s.x-s.vx*5,s.y-s.vy*5);x.stroke();
  });

  // partículas repartidas por todo el campo
  if(Math.random()<.7)ps.push({x:Math.random()*W,y:H*(.6+Math.random()*.35),vx:(Math.random()-.5)*.4,vy:-.3-Math.random()*.9,r:Math.random()*2.2+.8,l:1,h:Math.random()*45});
  ps=ps.filter(p=>p.l>0);
  ps.forEach(p=>{
    p.x+=p.vx+Math.sin(p.y/30)*.3;p.y+=p.vy;p.l-=.004;
    x.globalAlpha=p.l;
    x.shadowBlur=12;x.shadowColor='hsl('+p.h+',100%,60%)';
    x.fillStyle='hsl('+p.h+',100%,60%)';
    x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill();
  });

  // pétalos que caen
  if(Math.random()<.04)pe.push({x:Math.random()*W,y:-10,vy:.7+Math.random()*.8,a:Math.random()*6,s:5+Math.random()*4});
  pe=pe.filter(p=>p.y<H);
  pe.forEach(p=>{
    p.y+=p.vy;p.x+=Math.sin(p.y/40)*.8;p.a+=.03;
    x.globalAlpha=.85;x.shadowBlur=8;x.shadowColor='#ff1f3d';
    x.fillStyle='#e0152f';
    x.beginPath();x.ellipse(p.x,p.y,p.s,p.s/2,p.a,0,7);x.fill();
  });

  x.shadowBlur=0;x.globalAlpha=1;
  requestAnimationFrame(loop);
}
loop();

// portada y música
const audio=document.getElementById('audio'),mus=document.getElementById('musica');
document.getElementById('abrir').onclick=()=>{
  document.getElementById('portada').classList.add('off');
  document.getElementById('escena').classList.add('on');
  audio.play().catch(()=>{});
};
mus.onclick=()=>{
  if(audio.paused){audio.play();mus.textContent='⏸ Música'}
  else{audio.pause();mus.textContent='▶ Música'}
};
