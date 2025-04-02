document.addEventListener("DOMContentLoaded", () => {

    // ==================================================== 
    // Init
    // ====================================================

    gsap.registerPlugin(ScrollTrigger);

    // ==================================================== 
    // Page Transition Handler
    // ====================================================

    gsap.to(".load-overlay", {
        y: "-100%",
        duration: .75,
        ease: "power3.out",
        onComplete: () => {
            gsap.set(".load-overlay", {display: "none"});
        }
    });

    $('a:not([data-animate="no-page-transition"]):not(.no-page-transition)').on(
        "click",
        function (e) {
            e.preventDefault();
            let destination = $(this).attr("href");
            gsap.set(".load-overlay", {display: "block"});
            gsap.fromTo(".load-overlay", {
                y: "100%"
            }, {
                y: "0%",
                duration: 0.25,
                ease: "power1.out",
                onComplete: () => {
                    window.location = destination;
                }
            });
        }
    );

    // ==================================================== 
    // Animations of the horizontal lines 
    // ====================================================

    let horizontalLines = document.querySelectorAll('[data-animate="h-line"]');

    horizontalLines.forEach(line => {
        gsap.fromTo(line, {
            scaleX: '0%',
            transformOrigin: 'left'
        }, {
            scaleX: '100%',
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: line,
                start: "top 80%", // When 85% of the element is in view
            }
        });
    });

    // ==================================================== 
    // Default fade-in on scroll 
    // ====================================================

    let appearElements = document.querySelectorAll('[data-animate="appear"]');

    appearElements.forEach(appearElement => {
        gsap.fromTo(appearElement, {
            y: 32,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: appearElement,
                start: "top 80%", // When 85% of the element is in view
            }
        });
    });

    // ==================================================== 
    // Staggered slide-in (from right) on scroll
    // ====================================================

    gsap
        .utils
        .toArray("[data-animate='appear-children-fr']")
        .forEach(parent => {
            gsap.set(parent.children, {
                x: 32,
                opacity: 0
            }),
            gsap.to(parent.children, {
                x: 0,
                opacity: 1,
                delay: 0.25,
                duration: .75,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: parent,
                    start: "top 80%"
                }
            });
        });

    // ==================================================== 
    // Staggered letters (from right) on scroll
    // ====================================================
    
    let quoteElements = document.querySelectorAll(
        '[data-animate="letters-fade-in"]'
    );

    quoteElements.forEach((element) => {
        // Split text into words and characters
        let splitText = new SplitType(element, {
            types: "words, chars",
            wordClass: "split-word",
            charClass: "split-char"
        });

        // Set initial opacity and position for each character
        gsap.set(splitText.chars, {
            opacity: 0,
            x: 20
        });

        // GSAP animation
        gsap.to(splitText.chars, { // Target only characters
            opacity: 1,
            delay: 0.1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: {
                amount: 0.3
            }, // Smooth staggered effect
            scrollTrigger: {
                trigger: element,
                start: "top 80%" // Animation starts when 80% of the element is in view
            }
        });
    });

    // ==================================================== 
    // Count up numbers
    // ====================================================

    document.querySelectorAll('[data-countup]').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1.5; // seconden
        const ease = "power1.out";
  
        ScrollTrigger.create({
          trigger: counter,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(counter, 
              { innerText: 0 }, 
              {
                innerText: target,
                duration: duration,
                ease: ease,
                snap: { innerText: 1 },
                onUpdate: function () {
                  counter.innerText = Math.ceil(this.targets()[0].innerText);
                }
              }
            );
          }
        });
      });
});