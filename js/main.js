function loadComponent(id, file){

    fetch(file)

        .then(response => {

            if(!response.ok){

                throw new Error(file);

            }

            return response.text();

        })

        .then(data => {

            const target = document.getElementById(id);

            if(!target) return;

            target.innerHTML = data;

            if(id === "navbar"){

                initNavbar();

            }

        })

        .catch(error => {

            console.error("Component could not be loaded:", error);

        });

}

function initNavbar(){

    setActiveNavigation();
    setActiveLanguage();
    initMobileMenu();

}

function setActiveNavigation(){

    const currentPage = getCurrentPage();
    const links = document.querySelectorAll(".navbar-links a");

    links.forEach(link => {

        const linkPage = getPageFromHref(link.getAttribute("href"));

        if(linkPage === currentPage){

            link.classList.add("active-page");
            link.setAttribute("aria-current", "page");

        }

    });

}

function getCurrentPage(){

    const page = window.location.pathname.split("/").pop();

    return page || "index.html";

}

function getPageFromHref(href){

    if(!href) return "";

    return href.split("#")[0];

}

function setActiveLanguage(){

    document.querySelectorAll(".lang").forEach(button => {

        button.setAttribute(
            "aria-pressed",
            button.classList.contains("active") ? "true" : "false"
        );

    });

}

function initMobileMenu(){

    const toggle = document.getElementById("mobileToggle");
    const menu = document.getElementById("mobileMenu");
    const icon = toggle ? toggle.querySelector("span") : null;

    if(!toggle || !menu || !icon) return;

    const closeMenu = () => {

        menu.classList.remove("active");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        icon.innerHTML = "&#9776;";

    };

    const openMenu = () => {

        menu.classList.add("active");
        document.body.classList.add("menu-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
        icon.innerHTML = "&times;";

    };

    toggle.addEventListener("click", () => {

        if(menu.classList.contains("active")){

            closeMenu();

            return;

        }

        openMenu();

    });

    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    document.addEventListener("keydown", event => {

        if(event.key === "Escape"){

            closeMenu();
            toggle.focus();

        }

    });

    document.addEventListener("click", event => {

        if(
            menu.classList.contains("active") &&
            !menu.contains(event.target) &&
            !toggle.contains(event.target)
        ){

            closeMenu();

        }

    });

}

loadComponent("navbar", "components/navbar.html");
loadComponent("footer", "components/footer.html");
