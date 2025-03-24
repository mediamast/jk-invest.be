document.addEventListener("DOMContentLoaded", () => {

    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Swiper – Featured Companies
    const featuredCompanies = document.querySelector(".featured-companies_wrapper");
    const featuredCompaniesSwiper = new Swiper('.swiper.cc-featured-companies', {
        // Optional parameters
        loop: true,
        direction: 'horizontal',
        speed: 500,
        slidesPerView: 1.5, // Mobile Portrait
        spaceBetween: 16,

        breakpoints: {
            // Mobile Landscape: when window width is >= 479px
            479: {
                slidesPerView: 2,
                spaceBetween: 16
              },
            // Tablet: when window width is >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 16
            },
            // Desktop: when window width is >= 992px
            992: {
              slidesPerView: 4,
              spaceBetween: 16
            }
        },
      
        // Navigation arrows
        navigation: {
          nextEl: featuredCompanies?.querySelector("[data-swiper='next-btn']") || null,
          prevEl: featuredCompanies?.querySelector("[data-swiper='prev-btn']") || null,
        }
    });

    // Swiper – Featured Testimonials
    const featuredTestimonials = document.querySelector(".featured-testimonials_wrapper");
    const featuredTestimonialsSwiper = new Swiper('.swiper.cc-featured-testimonials', {
        // Optional parameters
        loop: true,
        direction: 'horizontal',
        speed: 500,
        slidesPerView: 1, // Mobile Portrait
        spaceBetween: 64,

        breakpoints: {
            // Mobile Landscape: when window width is >= 479px
            479: {
                slidesPerView: 1,
                spaceBetween: 64
              },
            // Tablet: when window width is >= 768px
            768: {
              slidesPerView: 1,
              spaceBetween: 64
            },
            // Desktop: when window width is >= 992px
            992: {
              slidesPerView: 2,
              spaceBetween: 64
            }
        },
      
        // Navigation arrows
        navigation: {
          nextEl: featuredTestimonials?.querySelector("[data-swiper='next-btn']") || null,
          prevEl: featuredTestimonials?.querySelector("[data-swiper='prev-btn']") || null,
        }
    });

});