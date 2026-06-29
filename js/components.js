/* ===================================
   SHOWCASE COMPONENT
=================================== */

function initShowcase(){

    document.querySelectorAll("[data-showcase]").forEach(showcase=>{

        const items=[...showcase.querySelectorAll(".showcase-item")];

        if(!items.length) return;

        /* ===================================
           DESIGN SYSTEM
        =================================== */

        const styles=getComputedStyle(document.documentElement);

        const startColor=styles
            .getPropertyValue("--showcase-start")
            .trim();

        const endColor=styles
            .getPropertyValue("--showcase-end")
            .trim();

        const whiteMix=parseFloat(

            styles
                .getPropertyValue("--showcase-white")
                .trim()

        );

        /* ===================================
           COLOR HELPERS
        =================================== */

        function hexToRgb(hex){

            hex=hex.replace("#","");

            return{

                r:parseInt(hex.substring(0,2),16),

                g:parseInt(hex.substring(2,4),16),

                b:parseInt(hex.substring(4,6),16)

            };

        }

        function interpolate(a,b,t){

            return Math.round(

                a+(b-a)*t

            );

        }

        function mixWithWhite(value){

            return Math.round(

                value*(100-whiteMix)/100+

                255*whiteMix/100

            );

        }

        function calculateColor(position){

            const start=hexToRgb(startColor);

            const end=hexToRgb(endColor);

            const r=mixWithWhite(

                interpolate(

                    start.r,

                    end.r,

                    position

                )

            );

            const g=mixWithWhite(

                interpolate(

                    start.g,

                    end.g,

                    position

                )

            );

            const b=mixWithWhite(

                interpolate(

                    start.b,

                    end.b,

                    position

                )

            );

            return `rgb(${r}, ${g}, ${b})`;

        }

        /* ===================================
           POSITION + COLOR
        =================================== */

        items.forEach((item,index)=>{

            const position=

                items.length===1
                    ? 0
                    : index/(items.length-1);

            item.style.setProperty(

                "--position",

                position

            );

            item.style.setProperty(

                "--card-active-color",

                calculateColor(position)

            );

        });

        /* ===================================
           ACTIVE PANEL
        =================================== */

        function setActive(item){

            items.forEach(panel=>{

                panel.classList.remove(

                    "showcase-item--active",
                    "showcase-item--content-visible"

                );

            });

            item.classList.add(

                "showcase-item--active"

            );

            setTimeout(()=>{

                if(item.classList.contains("showcase-item--active")){

                    item.classList.add(

                        "showcase-item--content-visible"

                    );

                    if(window.innerWidth<=768){

                        item.scrollIntoView({

                            behavior:"smooth",

                            block:"nearest"

                        });

                    }

                }

            },420);

        }

        /* ===================================
           INITIAL
        =================================== */

        const initial=

            showcase.querySelector(

                ".showcase-item--active"

            ) ||

            items[0];

        setActive(initial);

        /* ===================================
           EVENTS
        =================================== */

        if(window.innerWidth>768){

            items.forEach(item=>{

                item.addEventListener(

                    "mouseenter",

                    ()=>{

                        if(item.classList.contains(

                            "showcase-item--active"

                        )) return;

                        setActive(item);

                    }

                );

            });

        }

        else{

            items.forEach(item=>{

                item.addEventListener(

                    "click",

                    ()=>{

                        if(item.classList.contains(

                            "showcase-item--active"

                        )) return;

                        setActive(item);

                    }

                );

            });

        }

    });

}

window.addEventListener("load",initShowcase);