// register plugin

gsap.registerPlugin(ScrollTrigger);


/* ---------- HERO ANIMATION ---------- */

gsap.from(".hero h1",{

y:60,
opacity:0,
duration:1,
ease:"power3.out"

});


gsap.from(".hero p",{

y:40,
opacity:0,
duration:1,
delay:0.3,
ease:"power3.out"

});


gsap.from(".cta .btn",{

y:30,
opacity:0,
duration:0.8,
stagger:0.2,
delay:0.5,
ease:"power2.out"

});


/* ---------- NAVBAR FADE ---------- */

gsap.from(".navbar",{

y:-40,
opacity:0,
duration:1,
ease:"power2.out"

});


/* ---------- SCROLL ANIMATION FOR SECTIONS ---------- */

gsap.utils.toArray(".container").forEach(section => {

gsap.from(section,{

opacity:0,
y:80,

scrollTrigger:{

trigger:section,
start:"top 85%",
toggleActions:"play none none none"

}

});

});

gsap.to(".navbar",{

padding:"10px 50px",

scrollTrigger:{
trigger:".hero",
start:"bottom top",
scrub:true
}

});