document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: true,
        syncTouch: true,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 2. Loader Animation
    const tlLoader = gsap.timeline();
    
    tlLoader.to(".loader-line", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    })
    .to(".loader-text", {
        opacity: 1,
        duration: 0.5
    })
    .to(".loader-wrapper", {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.5
    })
    .from(".hero-text-content h1", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    }, "-=0.5")
    .from(".hero-image-wrapper", {
        scale: 0.8,
        opacity: 0,
        rotation: 10,
        duration: 1.5,
        ease: "power4.out"
    }, "-=1")
    .add(() => {
        document.body.classList.remove("loading");
    });

    // 3. Scroll Animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Reveal animations for sections
    const reveals = document.querySelectorAll(".glass-panel, .glass-card, .section-title, .portfolio-item");
    
    reveals.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Parallax effect for profile image
    gsap.to(".profile-img", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 100,
        ease: "none"
    });


    // 4. Portfolio Filtering
    const filterBtns = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update buttons
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                if (filter === "all" || item.classList.contains(filter)) {
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        display: "block"
                    });
                } else {
                    gsap.to(item, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.5,
                        display: "none"
                    });
                }
            });
        });
    });

    // 5. Enhanced 3D Tilt Interaction
    const profileCard = document.querySelector(".profile-card");
    const heroWrapper = document.querySelector(".hero-image-wrapper");
    
    if (profileCard && heroWrapper) {
        heroWrapper.addEventListener("mousemove", (e) => {
            const rect = heroWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(profileCard, {
                rotationX: rotateX,
                rotationY: rotateY,
                rotationZ: -1.5, // Keep the straightening rotation
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        heroWrapper.addEventListener("mouseleave", () => {
            gsap.to(profileCard, {
                rotationX: 0,
                rotationY: 0,
                rotationZ: -1.5, // Reset to straightened position
                scale: 1,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        });
    }

    // 6. Header visibility on scroll
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        const nav = document.querySelector("nav");
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            gsap.to(nav, { y: -100, duration: 0.3 });
        } else {
            gsap.to(nav, { y: 0, duration: 0.3 });
        }
        lastScroll = currentScroll;
    });
});
