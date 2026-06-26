
function loadComponent(id, file){

    fetch(file)

        .then(response => {

            if(!response.ok){

                throw new Error(file);

            }

            return response.text();

        })

        .then(data => {

            document.getElementById(id).innerHTML = data;

            if(id === "navbar"){

                const toggle = document.getElementById("mobileToggle");
                const menu = document.getElementById("mobileMenu");

                if(toggle && menu){

                    toggle.addEventListener("click", () => {

                        menu.classList.toggle("active");

                    });

                }

            }

        })

        .catch(error => {

            console.error("Component could not be loaded:", error);

        });

}

loadComponent("navbar", "components/navbar.html");
loadComponent("footer", "components/footer.html");



/* ===================================
   WHO WE HELP CAROUSEL
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    const grid = document.querySelector(".who-we-help-grid");
    const cards = document.querySelectorAll(".who-card");
    const dots = document.querySelectorAll(".who-dots .dot");

    if(!grid || cards.length === 0 || dots.length === 0){

        return;

    }

    function updateDots(){

        const cardWidth = cards[0].offsetWidth + 20;

        const index = Math.round(grid.scrollLeft / cardWidth);

        dots.forEach(dot => dot.classList.remove("active"));

        if(dots[index]){

            dots[index].classList.add("active");

        }

    }

    dots.forEach((dot,index)=>{

        dot.addEventListener("click",()=>{

            grid.scrollTo({

                left:index*(cards[0].offsetWidth+20),

                behavior:"smooth"

            });

        });

    });

    grid.addEventListener("scroll",()=>{

        window.requestAnimationFrame(updateDots);

    });

    updateDots();

});