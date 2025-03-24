document.addEventListener('DOMContentLoaded', () => {

    // Menu
    let menuWrapper = document.querySelector('[data-animate="stagger-nav"]'); // Target element
    let menuItems = menuWrapper ? menuWrapper.children : []; // Direct children of the target element
    let menuButton = document.querySelector(".w-nav-button"); // Webflow menu button
    let menuLogo = document.querySelector(".nav-logo");

    function isMobile() {
        return window.innerWidth < 992;
    }

    // --- Mobile: open/close animations when menu toggles ---
    function openMenu() {
        if (!menuWrapper || !isMobile()) return;

        gsap.fromTo(
            menuItems,
            { opacity: 0, x: 64 },
            { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }
        );
    }

    function closeMenu() {
        if (!menuWrapper || !isMobile()) return;

        gsap.to(menuItems, {
            opacity: 0,
            x: 64,
            duration: 0.2,
            stagger: 0.05,
            ease: "power1.in"
        });
    }

    // Toggle mobile menu animation on click
    menuButton.addEventListener("click", function () {
        if (!isMobile()) return;

        if (!menuButton.classList.contains("w--open")) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    // --- Desktop: Animate nav items on page load ---
    window.addEventListener("DOMContentLoaded", () => {
        if (!menuWrapper || isMobile()) return;

        // Animate desktop nav items from top on page load
        gsap.fromTo(
            menuItems,
            { opacity: 0, y: -24 },
            { opacity: 1, y: 0, delay: 0.2, duration: 0.5, stagger: 0.05, ease: "power2.out" }
        );

        gsap.fromTo(
            menuLogo,
            { opacity: 0, y: -24 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
    });

    // Show/hide navigation on scroll
    const mainNav = document.querySelector('.nav');
    let lastScrollY = 0;
    const scrollUpThreshold = 16; // Threshold for scrolling up
    const scrollDownThreshold = 4; // Threshold for scrolling down
    const topThreshold = 64; // State 1 applies within the first 64px of the page

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // State 1: Within the first 64px of the page
        if (currentScrollY <= topThreshold) {
            mainNav.classList.remove('is-scroll');
            mainNav.style.transform = 'translateY(0)'; // Reset navbar position
            lastScrollY = currentScrollY; // Update last scroll position
            return;
        }

        // Determine scrolling direction with separate thresholds
        if (currentScrollY > lastScrollY + scrollDownThreshold) {
            // State 2: Scrolling down by at least 4px
            mainNav.style.transform = 'translateY(-100%)'; // Slide navbar up
        } else if (currentScrollY < lastScrollY - scrollUpThreshold) {
            // State 3: Scrolling up by at least 16px
            mainNav.style.transform = 'translateY(0)'; // Slide navbar down
            mainNav.classList.add('is-scroll'); // Apply `is-scroll` class
        }

        // Update lastScrollY for the next scroll event
        lastScrollY = currentScrollY;
    });
});