window.addEventListener("DOMContentLoaded", (event) => {

    setTimeout(() => {
        document.querySelectorAll('[data-animate="lines-slide-in"]').forEach((element) => {
          animateTextLines(element);
        });
    }, 500);

    function animateTextLines(textElement) {
        gsap.set(textElement, { autoAlpha: 1 });
        let originalText = textElement.textContent;
        let tl;
      
        function splitText() {
          new SplitType(textElement, { types: "lines", lineClass: "splitline", tagName: "span" });
          textElement.querySelectorAll(".splitline").forEach((splitline) => {
            let lineContent = splitline.innerHTML;
            splitline.innerHTML = `<span class="splitline-inner" style="display: block;">${lineContent}</span>`;
          });
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: textElement,
              start: "top bottom",
              end: "bottom bottom",
              toggleActions: "none play none reset",
            },
          });
          tl.fromTo(
            textElement.querySelectorAll(".splitline-inner"),
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: 0.6,
              stagger: { amount: 0.3, ease: "power1.out" },
            }
          );
        }
        splitText();
      
        let windowWidth = window.innerWidth;
        window.addEventListener("resize", function () {
          if (windowWidth !== window.innerWidth) {
            windowWidth = window.innerWidth;
            tl.kill();
            textElement.textContent = originalText;
            splitText();
          }
        });
      }

});

