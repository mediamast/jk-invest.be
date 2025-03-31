document.addEventListener("DOMContentLoaded", () => {

    // ✅ Page transitions
    gsap.to(".load-overlay",
        {
            y: "-100%",
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
                gsap.set(".load-overlay", {display: "none"});
            }
        }
    );

    $('a:not([data-animate="no-page-transition"]):not(.no-page-transition)').on("click", function(e){
        e.preventDefault();
        let destination = $(this).attr("href");
        gsap.set(".load-overlay", {display: "block"});
        gsap.fromTo(
            ".load-overlay",
            { y: "100%" },
            {
                y: "0%",
                duration: 0.25,
                ease: "power1.out",
                onComplete: () => {
                    window.location = destination;
                }
            }
        );
    });

    // ✅ Horizontal lines
    gsap.registerPlugin(ScrollTrigger); // Ensure ScrollTrigger is registered

    let horizontalLines = document.querySelectorAll('[data-animate="h-line"]');

    horizontalLines.forEach(line => {
        gsap.fromTo(line, 
            { scaleX: '0%', transformOrigin: 'left' }, 
            { 
                scaleX: '100%', 
                duration: 1, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: line,
                    start: "top 90%", // When 80% of the element is in view
                    end: "bottom bottom", // Animation range
                    toggleActions: "none play none reset" // Play when in view, reset when out
                }
            }
        );
    });

    // ✅ Staggered Appear Animation for Child Elements with `data-animate="appear-children"`
    gsap.utils.toArray("[data-animate='appear-children']").forEach(parent => {
        gsap.set(
            parent.children, 
            { 
                y: "32%", 
                opacity: 0 
            }
        ),
        gsap.to(
            parent.children,
            { 
                y: 0,
                opacity: 1,
                delay: 0.25,
                duration: 0.64,
                stagger: 0.1,
                ease: "power1.out", 
                scrollTrigger: {
                    trigger: parent,
                    start: "top 80%",
                }
            }
        );
    });

    // ✅ Staggered Appear Animation for Child Elements with `data-animate="appear-children"`
    gsap.utils.toArray("[data-animate='appear-children-fr']").forEach(parent => {
        gsap.set(
            parent.children, 
            { 
                x: 32, 
                opacity: 0 
            }
        ),
        gsap.to(
            parent.children,
            { 
                x: 0,
                opacity: 1,
                delay: 0.25,
                duration: 0.64,
                stagger: 0.1,
                ease: "power1.out", 
                scrollTrigger: {
                    trigger: parent,
                    start: "top 80%",
                }
            }
        );
    });

    // ✅ Animate by letters
    // Select all elements with data-animate="letters-fade-in"
    let quoteElements = document.querySelectorAll('[data-animate="letters-fade-in"]');

    quoteElements.forEach((element) => {
        // Split text into words and characters
        let splitText = new SplitType(element, { types: "words, chars", wordClass: "split-word", charClass: "split-char" });

        // Set initial opacity and position for each character
        gsap.set(splitText.chars, { opacity: 0, y: "40%" });

        // GSAP animation
        gsap.to(
            splitText.chars, // Target only characters
            { 
                opacity: 1, 
                delay: 0.1,
                y: 0, 
                duration: 0.9, 
                ease: "power3.out", 
                stagger: { amount: 0.3 }, // Smooth staggered effect
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%", // Animation starts when 80% of the element is in view
                    toggleActions: "play none none reset" // Play when entering, reset when leaving
                }
            }
        );
    });

});