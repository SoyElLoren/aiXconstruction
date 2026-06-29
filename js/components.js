/* ===================================
   GENERIC CARD CAROUSEL
=================================== */

function initCarousels() {

    document.querySelectorAll("[data-carousel]").forEach(carousel => {

        const track = carousel.querySelector(".carousel-track");
        const slides = [...carousel.querySelectorAll(".carousel-slide")];
        const pagination = carousel.querySelector(".carousel-pagination");

        if (!track || slides.length <= 1 || !pagination) return;

        /* ---------------------------------
           CREATE DOTS
        --------------------------------- */

        pagination.innerHTML = "";

        slides.forEach((_, index) => {

            const dot = document.createElement("button");

            dot.className = "carousel-dot";

            if(index === 0){
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {

                track.scrollTo({

                    left: slides[index].offsetLeft,

                    behavior: "smooth"

                });

            });

            pagination.appendChild(dot);

        });

        const dots = pagination.querySelectorAll(".carousel-dot");

        /* ---------------------------------
           ACTIVE DOT
        --------------------------------- */

        function updateDots(){

            let activeIndex = 0;

            let minDistance = Infinity;

            slides.forEach((slide,index)=>{

                const distance = Math.abs(

                    slide.offsetLeft - track.scrollLeft

                );

                if(distance < minDistance){

                    minDistance = distance;

                    activeIndex = index;

                }

            });

            dots.forEach(dot=>dot.classList.remove("active"));

            dots[activeIndex].classList.add("active");

        }

        let ticking = false;

        track.addEventListener("scroll",()=>{

            if(ticking) return;

            window.requestAnimationFrame(()=>{

                updateDots();

                ticking = false;

            });

            ticking = true;

        });

        updateDots();

    });

}

document.addEventListener("DOMContentLoaded", initCarousels);