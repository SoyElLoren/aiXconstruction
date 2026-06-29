
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

                        toggle.innerHTML = menu.classList.contains("active")
                            ? "&times;"
                            : "&#9776;";

                    });

                    menu.querySelectorAll("a").forEach(link => {

                        link.addEventListener("click", () => {

                            menu.classList.remove("active");

                            toggle.innerHTML = "&#9776;";

                        });

                    });

                    document.addEventListener("click", (event) => {

                        if(
                            !menu.contains(event.target) &&
                            !toggle.contains(event.target)
                        ){

                            menu.classList.remove("active");

                            toggle.innerHTML = "&#9776;";

                        }

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

                        toggle.innerHTML = menu.classList.contains("active")
                            ? "&times;"
                            : "&#9776;";

                    });

                    menu.querySelectorAll("a").forEach(link => {

                        link.addEventListener("click", () => {

                            menu.classList.remove("active");

                            toggle.innerHTML = "&#9776;";

                        });

                    });

                    document.addEventListener("click", (event) => {

                        if(
                            !menu.contains(event.target) &&
                            !toggle.contains(event.target)
                        ){

                            menu.classList.remove("active");

                            toggle.innerHTML = "&#9776;";

                        }

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

    if (!grid || cards.length === 0 || dots.length === 0) {
        return;
    }

    function updateDots() {

        let activeIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, index) => {

            const distance = Math.abs(card.offsetLeft - grid.scrollLeft);

            if (distance < minDistance) {

                minDistance = distance;
                activeIndex = index;

            }

        });

        dots.forEach(dot => dot.classList.remove("active"));
        dots[activeIndex].classList.add("active");

    }

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            grid.scrollTo({

                left: cards[index].offsetLeft,

                behavior: "smooth"

            });

        });

    });

    grid.addEventListener("scroll", () => {

        window.requestAnimationFrame(updateDots);

    });

    updateDots();

});