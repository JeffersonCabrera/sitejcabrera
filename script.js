/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== PARTICLES.JS CONFIG (Network Topology) ====================*/
if(document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#64ffda" /* Highlight Color */
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#64ffda",
                "opacity": 0.2, /* Low opacity for subtle network effect */
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2, /* Slow movement */
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "window", /* Better mouse detection */
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab" /* Grab effect on hover */
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 200,
                    "line_linked": {
                        "opacity": 0.4
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

/*==================== GSAP ANIMATIONS ====================*/
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Hero Animations
const heroTimeline = gsap.timeline();
heroTimeline
    .from('.home__greeting', { y: 20, opacity: 0, duration: 0.8, delay: 0.5 })
    .from('.home__title', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from('.home__subtitle', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from('.home__description', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from('.home__buttons', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from('.home__img-container', { scale: 0.8, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.8");

// 2. About/Skills Animations
gsap.from('.about__card-glass', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
    },
    x: -50,
    opacity: 0,
    duration: 1
});

gsap.from('.skill__item', {
    scrollTrigger: {
        trigger: '.about__skills',
        start: 'top 85%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1
});

// 3. Projects Animations
gsap.from('.project__card', {
    scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// 4. Timeline (Experience) Animations
const timelineItems = document.querySelectorAll('.timeline__item');

timelineItems.forEach((item, index) => {
    // Determine direction based on index (even left, odd right - though here layout is all left, so just fade up)
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1
    });
});

// Animate the line drawing
gsap.from('.timeline__line', {
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top 80%',
        end: 'bottom 80%',
        scrub: 1, // Link to scroll position
    },
    scaleY: 0,
    transformOrigin: "top center",
    ease: "none"
});

// 5. Contact Animations
gsap.from('.contact__card', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 85%',
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
});