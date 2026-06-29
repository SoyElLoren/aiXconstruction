/* ===================================
   SHOWCASE COMPONENT
=================================== */

function initShowcase() {

    document.querySelectorAll("[data-showcase]").forEach(showcase => {

        const items = showcase.querySelectorAll(".showcase-item");

        if(!items.length) return;

        function setActive(item){

            items.forEach(panel => {

                panel.classList.remove(
                    "showcase-item--active",
                    "showcase-item--content-visible"
                );

            });

            item.classList.add("showcase-item--active");

            setTimeout(() => {

                if(item.classList.contains("showcase-item--active")){

                    item.classList.add("showcase-item--content-visible");

                }

            },360);

        }

        /* ---------- Initial card ---------- */

        const initial =
            showcase.querySelector(".showcase-item--active") ||
            items[0];

        setActive(initial);

        /* ---------- Desktop ---------- */

        if(window.innerWidth > 768){

            items.forEach(item=>{

                item.addEventListener("mouseenter",()=>{

                    if(item.classList.contains("showcase-item--active")){
                        return;
                    }

                    setActive(item);

                });

            });

        }

        /* ---------- Mobile ---------- */

        else{

            items.forEach(item=>{

                item.addEventListener("click",()=>{

                    if(item.classList.contains("showcase-item--active")){
                        return;
                    }

                    setActive(item);

                });

            });

        }

    });

}

window.addEventListener("load", initShowcase);