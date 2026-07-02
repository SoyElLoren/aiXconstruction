/* ===================================
   SHOWCASE COMPONENT
=================================== */

function initShowcase() {

    document
        .querySelectorAll("[data-showcase]")
        .forEach(initSingleShowcase);

}

/* ===================================
   SINGLE SHOWCASE
=================================== */

function initSingleShowcase(showcase) {

    const items = [...showcase.querySelectorAll(".showcase-item")];

    if (!items.length) return;

    const mode = showcase.dataset.mode || "expand";

    const initial =

        showcase.querySelector(".showcase-item--active") ||

        items[0];

    setActive(initial, items);

    registerEvents(showcase, items, mode);

}

/* ===================================
   ACTIVE PANEL
=================================== */

function setActive(item, items) {

    items.forEach(panel => {

        panel.classList.remove(

            "showcase-item--active",
            "showcase-item--content-visible"

        );

    });

    item.classList.add(

        "showcase-item--active"

    );

    window.setTimeout(() => {

        if (!item.classList.contains(

            "showcase-item--active"

        )) return;

        item.classList.add(

            "showcase-item--content-visible"

        );

        if (window.innerWidth <= 767) {

            item.scrollIntoView({

                behavior: "smooth",

                block: "nearest"

            });

        }

    }, 420);

}

/* ===================================
   EVENTS
=================================== */

function registerEvents(showcase, items, mode) {

    const desktop = window.innerWidth >= 768;

    items.forEach(item => {

        if (desktop) {

            item.addEventListener("mouseenter", () => {

                if (item.classList.contains(

                    "showcase-item--active"

                )) return;

                setActive(item, items);

            });

        }

        else {

            item.addEventListener("click", e => {

                if (

                    !item.classList.contains(

                        "showcase-item--active"

                    )

                ) {

                    e.preventDefault();

                    setActive(item, items);

                    return;

                }

                if (mode === "navigation") {

                    return;

                }

            });

        }

    });

}

/* ===================================
   INIT
=================================== */

window.addEventListener(

    "load",

    initShowcase

);
