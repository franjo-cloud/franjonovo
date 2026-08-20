/* ==================================================
   MOBILNA NAVIGACIJA
================================================== */

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

if (menuButton && mainNav) {

    menuButton.addEventListener("click", function () {

        mainNav.classList.toggle("open");

    });

}


/* ==================================================
   GALERIJA - POVEĆANJE SLIKE
================================================== */

function zoomImage(image) {

    image.classList.toggle("zoom");

}


/* ==================================================
   KONTAKTNI PROZOR
================================================== */

const contactButton =
    document.getElementById("contactButton");

const contactModal =
    document.getElementById("contactModal");

const closeContact =
    document.getElementById("closeContact");

const cancelContact =
    document.getElementById("cancelContact");


function openContactModal() {

    if (contactModal) {
        contactModal.classList.add("active");

        document.body.style.overflow = "hidden";
    }

}


function closeContactModal() {

    if (contactModal) {

        contactModal.classList.remove("active");

        document.body.style.overflow = "";
    }

}


if (contactButton) {

    contactButton.addEventListener(
        "click",
        openContactModal
    );

}


if (closeContact) {

    closeContact.addEventListener(
        "click",
        closeContactModal
    );

}


if (cancelContact) {

    cancelContact.addEventListener(
        "click",
        closeContactModal
    );

}


/* ==================================================
   KLIK IZVAN PROZORA
================================================== */

if (contactModal) {

    contactModal.addEventListener(
        "click",
        function (event) {

            if (event.target === contactModal) {

                closeContactModal();

            }

        }
    );

}


/* ==================================================
   ESC ZA ZATVARANJE
================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            contactModal &&
            contactModal.classList.contains("active")
        ) {

            closeContactModal();

        }

    }
);


/* ==================================================
   BROJAČ ZNAKOVA
================================================== */

const messageInput =
    document.getElementById("message");

const characterCount =
    document.getElementById("characterCount");


if (messageInput && characterCount) {

    messageInput.addEventListener(
        "input",
        function () {

            characterCount.textContent =
                messageInput.value.length;

        }
    );

}


/* ==================================================
   SLANJE KONTAKTNOG OBRASCA
================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const message =
                document.getElementById("message").value.trim();


            if (!name || !message) {

                formMessage.textContent =
                    "Molimo ispunite sva polja.";

                formMessage.style.color =
                    "#D9534F";

                return;

            }


            if (message.length > 500) {

                formMessage.textContent =
                    "Poruka može sadržavati najviše 500 znakova.";

                formMessage.style.color =
                    "#D9534F";

                return;

            }


            formMessage.textContent =
                "Slanje poruke...";

            formMessage.style.color =
                "#69C8F4";


            try {

                const response =
                    await fetch("/api/contact", {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            name: name,
                            message: message

                        })

                    });


                const data =
                    await response.json();


                if (response.ok) {

                    formMessage.textContent =
                        "Poruka je uspješno poslana.";

                    formMessage.style.color =
                        "#5DB9E5";


                    contactForm.reset();

                    characterCount.textContent = "0";


                    setTimeout(
                        closeContactModal,
                        1800
                    );


                } else {

                    formMessage.textContent =
                        data.message ||
                        "Došlo je do greške.";

                    formMessage.style.color =
                        "#D9534F";

                }


            } catch (error) {

                console.error(error);

                formMessage.textContent =
                    "Nije moguće poslati poruku.";

                formMessage.style.color =
                    "#D9534F";

            }

        }
    );

}


/* ==================================================
   JEDNOSTAVAN GRAF
================================================== */

const canvas =
    document.getElementById("crimeChart");


if (canvas) {

    const ctx =
        canvas.getContext("2d");


    function drawChart() {

        const width =
            canvas.clientWidth;

        const height =
            canvas.clientHeight;


        const ratio =
            window.devicePixelRatio || 1;


        canvas.width =
            width * ratio;

        canvas.height =
            height * ratio;


        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        const values = [
            2, 2, 2, 2, 2,
            2, 2, 2, 2
        ];


        const years = [
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
            "2025",
            "2026"
        ];


        const padding = 35;

        const graphWidth =
            width - padding * 2;

        const graphHeight =
            height - padding * 2;


        ctx.strokeStyle =
            "#294D63";

        ctx.lineWidth = 1;


        for (let i = 0; i <= 4; i++) {

            const y =
                padding +
                (graphHeight / 4) * i;


            ctx.beginPath();

            ctx.moveTo(
                padding,
                y
            );

            ctx.lineTo(
                width - padding,
                y
            );

            ctx.stroke();

        }


        ctx.strokeStyle =
            "#5DB9E5";

        ctx.lineWidth = 2;


        ctx.beginPath();


        values.forEach(
            function (value, index) {

                const x =
                    padding +
                    (graphWidth /
                    (values.length - 1))
                    * index;


                const y =
                    height -
                    padding -
                    (value / 4) *
                    graphHeight;


                if (index === 0) {

                    ctx.moveTo(x, y);

                } else {

                    ctx.lineTo(x, y);

                }

            }
        );


        ctx.stroke();


        ctx.fillStyle =
            "#5DB9E5";


        values.forEach(
            function (value, index) {

                const x =
                    padding +
                    (graphWidth /
                    (values.length - 1))
                    * index;


                const y =
                    height -
                    padding -
                    (value / 4) *
                    graphHeight;


                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    4,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }
        );


        ctx.fillStyle =
            "#8EA6B4";

        ctx.font =
            "10px Arial";

        ctx.textAlign =
            "center";


        years.forEach(
            function (year, index) {

                const x =
                    padding +
                    (graphWidth /
                    (years.length - 1))
                    * index;


                ctx.fillText(
                    year,
                    x,
                    height - 10
                );

            }
        );

    }


    drawChart();


    window.addEventListener(
        "resize",
        drawChart
    );

}