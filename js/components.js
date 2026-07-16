/* ===================================
   SHOWCASE COMPONENT
=================================== */

function initShowcase() {

    document
        .querySelectorAll("[data-showcase]")
        .forEach(initSingleShowcase);

}

const mobileExperience = window.matchMedia(
    "(max-width: 767px), (orientation: landscape) and (max-height: 600px) and (pointer: coarse)"
);

/* ===================================
   SINGLE SHOWCASE
=================================== */

function initSingleShowcase(showcase) {

    const items = [...showcase.querySelectorAll(".showcase-item")];

    if (!items.length) return;

    const mode = showcase.dataset.mode || "expand";

    const initial = showcase.querySelector(".showcase-item--active") || items[0];

    if (mobileExperience.matches) {

        clearActive(items);

    }

    else {

        setActive(initial, items);

    }

    registerEvents(showcase, items, mode);

}

function clearActive(items) {

    items.forEach(panel => panel.classList.remove(
        "showcase-item--active",
        "showcase-item--content-visible"
    ));

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

        if (mobileExperience.matches) {

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

    const desktop = !mobileExperience.matches;

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

                if (e.target.closest("a")) {

                    return;

                }

                e.preventDefault();
                clearActive(items);

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
