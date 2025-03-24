document.addEventListener("DOMContentLoaded", () => {

    // Select marquee elements
    const marqueeWrapper = document.querySelector('[data-animate="marquee-wrapper"]');
    const marqueeContent = document.querySelector('[data-animate="marquee-content"]');

    // Ensure elements exist before running the script
    if (!marqueeWrapper || !marqueeContent) {
        console.error("Error: Marquee elements not found.");
        return;
    }

    // Function to duplicate marquee content
    const duplicateContent = (count) => {
        for (let i = 0; i < count; i++) {
            marqueeWrapper.appendChild(marqueeContent.cloneNode(true));
        }
    };

    // Duplicate marquee content
    duplicateContent(3);

    // Get all marquee content elements after cloning
    const allMarquees = document.querySelectorAll('[data-animate="marquee-content"]');

    // Get the total width of one set of logos
    const totalWidth = marqueeContent.offsetWidth;

    // GSAP Infinite Scroll Animation
    gsap.to(allMarquees, {
        x: `-${totalWidth}px`, // Move by one full set width
        duration: 15, // Adjust speed as needed
        ease: "linear",
        repeat: -1
    });

});