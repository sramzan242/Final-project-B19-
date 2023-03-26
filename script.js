var ctrh, ctrw;

if(window.innerWidth > 500){
  ctrh = 1.5;
  ctrw = .7;
}
else{
  ctrh = 1.2;
  ctrw = 2.2;
}


function gsapScrollTriggerInitialize() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}



// const scroll = new LocomotiveScroll({
//   el: document.querySelector('#main'),
//   smooth: true
// });


function navAnimator(){
  document.querySelector("#nav")
  .addEventListener("mouseenter", function () {
    gsap.to(".cover", {
      ease: Expo.easeInOut,
      duration: .5,
      height: "100%"
    })
    gsap.to(".cover span", {
      ease: Expo.easeInOut,
      duration: .5,
      opacity: 1
    })
  });

document.querySelector("#nav")
  .addEventListener("mouseleave", function () {
    gsap.to(".one", {
      ease: Expo.easeInOut,
      duration: .5,
      height: "3%"
    })
    gsap.to(".others", {
      ease: Expo.easeInOut,
      duration: .5,
      height: "0%"
    })
    gsap.to(".cover span", {
      ease: Expo.easeInOut,
      duration: .5,
      opacity: 0
    })
  });

}

function textHoverLineAnimation(){
  document.querySelectorAll(".text")
  .forEach(function(text){
    text.addEventListener("mouseenter",function(dets){
      gsap.to(dets.target.children[1],{
        width:"100%",
        ease: Expo.easeInOut,
        duration:.8
      })

    })

    text.addEventListener("mouseleave",function(dets){
      gsap.to(dets.target.children[1],{
        width:"0%",
        left:"100%", 
        ease: Expo.easeInOut,
        duration:.8,
        onComplete: function(){
          dets.target.children[1].style.left ="0"
        }
      })
    })
  });
}

function textAnim(){
  var h1 = document.querySelector("#fs h1");
  var clutter = "";

  var j = 0;
  for(var i=0; i<=Math.floor(h1.textContent.length/2); i++){
     clutter += `<span data-chacha="lab lab" data-delay="${i}">${h1.textContent.charAt(j)}</span>`;
     j++;
  }

  for(var i=Math.floor(h1.textContent.length/2); i>=0; i--){
     clutter += `<span data-chacha="lab lab" data-delay="${i}">${h1.textContent.charAt(j)}</span>`;
     j++;
  }

  document.querySelector("h1").innerHTML = clutter;

  document.querySelectorAll("h1 span")
  .forEach(function(elem){
     gsap.to(elem, {
         y:0,
         duration:2,
         ease:Expo.easeInOut,
         delay:elem.dataset.delay*.1
     })
  })
}

function animateCubeSize(){
  // Animating cube img
  gsap.to("#cube img", {
    stagger:1,
    opacity:1,
    duration:.8*3,
    ease:Circ.easeInOut
  })
  

// Animating cube size
  var tl = gsap.timeline();
 tl.to("#fs #cube", {
  height:"60%",
  width:"35%",
  delay:.5,
  ease: Power3.easeInOut,
  duration:.8

})
 .to("#fs #cube", {
  height:"80%",
  width:"25%",
  ease: Power3.easeInOut,
  duration:.8

})
 .to("#fs #cube", {
  height:`${30 * ctrh}%`,
  width:`${ctrw * 40}%`,
  ease: Power3.easeInOut,
  duration:.8

})
//  .to("#cube h1 span", {
//   y:"-150%",
//   ease: Expo.easeInOut,
//   duration:1

// })
 .to("#fs #cube", {
  height:"100%",
  width:"100%",
  delay:-.7,
  ease: Circ.easeInOut,
  duration:.8,
onComplete: function(){
  document.querySelector("#fs").style.display="none";
animateAllHeadings();

}
})
}

function animateAllHeadings(){
  document.querySelectorAll(".text h1")
  .forEach(function(harh1){
    var clutter = "";
    harh1.textContent.split("").forEach(function(char){
      clutter += `<span> ${char}</span>`;
    })
    harh1.innerHTML=clutter;
  })
  document.querySelectorAll(".text h1")
  .forEach(function(harh1){
    gsap.to(harh1.children, {
      y:0,
      scrollTrigger:{
        scroller:"#main",     
        trigger:harh1,
        start:"top 80%"
      },
      ease: Expo.easeInOut,
      duration:1,
      stagger:.1
    })
  })
}

gsapScrollTriggerInitialize();

textAnim();
animateCubeSize();
textHoverLineAnimation();
navAnimator();





 