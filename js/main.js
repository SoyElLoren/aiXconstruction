
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