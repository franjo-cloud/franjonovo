/* =========================================
   MOBILNI IZBORNIK
========================================= */

const menuButton =
    document.getElementById("menuButton");

const mainNav =
    document.querySelector(".main-nav");


if (menuButton && mainNav) {

    menuButton.addEventListener(
        "click",
        function () {

            mainNav.classList.toggle("open");

        }
    );

}


/* =========================================
   KONTAKTNI OBRAZAC
========================================= */

const contactButton =
    document.getElementById("contactButton");

const contactFormContainer =
    document.getElementById(
        "contactFormContainer"
    );

const closeContactForm =
    document.getElementById(
        "closeContactForm"
    );

const contactForm =
    document.getElementById(
        "contactForm"
    );

const questionInput =
    document.getElementById(
        "question"
    );

const characterCount =
    document.getElementById(
        "characterCount"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


/* =========================================
   OTVARANJE OBRASCA
========================================= */

if (contactButton) {

    contactButton.addEventListener(
        "click",
        function () {

            contactFormContainer.classList.toggle(
                "active"
            );


            if (
                contactFormContainer.classList.contains(
                    "active"
                )
            ) {

                contactFormContainer.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }

        }
    );

}


/* =========================================
   ZATVARANJE OBRASCA
========================================= */

if (closeContactForm) {

    closeContactForm.addEventListener(
        "click",
        function () {

            contactFormContainer.classList.remove(
                "active"
            );

        }
    );

}


/* =========================================
   BROJAČ ZNAKOVA
========================================= */

if (questionInput) {

    questionInput.addEventListener(
        "input",
        function () {

            characterCount.textContent =
                questionInput.value.length;

        }
    );

}


/* =========================================
   SLANJE PITANJA NA BACKEND
========================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const question =
                questionInput
                    .value
                    .trim();


            /* PROVJERA IMENA */

            if (!name) {

                formMessage.textContent =
                    "Molimo upišite ime.";

                formMessage.style.color =
                    "red";

                return;

            }


            if (name.length > 100) {

                formMessage.textContent =
                    "Ime može imati najviše 100 znakova.";

                formMessage.style.color =
                    "red";

                return;

            }


            /* PROVJERA PITANJA */

            if (!question) {

                formMessage.textContent =
                    "Molimo upišite pitanje.";

                formMessage.style.color =
                    "red";

                return;

            }


            if (question.length > 500) {

                formMessage.textContent =
                    "Pitanje može sadržavati najviše 500 znakova.";

                formMessage.style.color =
                    "red";

                return;

            }


            /* PORUKA TIJEKOM SLANJA */

            formMessage.textContent =
                "Slanje pitanja...";

            formMessage.style.color =
                "#003366";


            try {


                const response =
                    await fetch(
                        "/api/contact",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body: JSON.stringify({

                                name: name,

                                question: question

                            })

                        }
                    );


                const result =
                    await response.json();


                /* GREŠKA SERVERA */

                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Došlo je do pogreške."
                    );

                }


                /* USPJEŠNO */

                formMessage.textContent =
                    "Vaše pitanje je uspješno poslano.";

                formMessage.style.color =
                    "green";


                /* OČISTI FORMU */

                contactForm.reset();

                characterCount.textContent =
                    "0";


            } catch (error) {

                console.error(
                    "Greška:",
                    error
                );


                formMessage.textContent =
                    "Pitanje nije poslano. Pokušajte ponovno.";

                formMessage.style.color =
                    "red";

            }

        }
    );

}


/* =========================================
   GALERIJA
========================================= */

function zoomImage(image) {

    const overlay =
        document.createElement("div");

    overlay.style.position =
        "fixed";

    overlay.style.top =
        "0";

    overlay.style.left =
        "0";

    overlay.style.width =
        "100%";

    overlay.style.height =
        "100%";

    overlay.style.background =
        "rgba(0,0,0,0.85)";

    overlay.style.display =
        "flex";

    overlay.style.alignItems =
        "center";

    overlay.style.justifyContent =
        "center";

    overlay.style.zIndex =
        "9999";

    overlay.style.cursor =
        "pointer";


    const enlargedImage =
        document.createElement("img");


    enlargedImage.src =
        image.src;


    enlargedImage.alt =
        image.alt;


    enlargedImage.style.maxWidth =
        "95%";

    enlargedImage.style.maxHeight =
        "90%";

    enlargedImage.style.objectFit =
        "contain";

    enlargedImage.style.borderRadius =
        "8px";


    overlay.appendChild(
        enlargedImage
    );


    document.body.appendChild(
        overlay
    );


    overlay.addEventListener(
        "click",
        function () {

            overlay.remove();

        }
    );

}


/* =========================================
   GRAF
========================================= */

const chartCanvas =
    document.getElementById(
        "crimeChart"
    );


if (chartCanvas) {

    const ctx =
        chartCanvas.getContext("2d");


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


    const crimeData = [
        8,
        10,
        12,
        15,
        18,
        22,
        25,
        28,
        30
    ];


    const solvedData = [
        4,
        5,
        6,
        8,
        10,
        13,
        15,
        18,
        20
    ];


    function drawChart() {

        const canvas =
            chartCanvas;


        const width =
            canvas.clientWidth;

        const height =
            canvas.clientHeight;


        const dpr =
            window.devicePixelRatio || 1;


        canvas.width =
            width * dpr;

        canvas.height =
            height * dpr;


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        const padding = 40;


        const chartWidth =
            width - padding * 2;


        const chartHeight =
            height - padding * 2;


        const maxValue =
            Math.max(
                ...crimeData,
                ...solvedData
            ) + 5;


        /* MREŽA */

        ctx.strokeStyle =
            "#dddddd";

        ctx.lineWidth =
            1;


        for (
            let i = 0;
            i <= 5;
            i++
        ) {

            const y =
                padding +
                chartHeight -
                (chartHeight / 5) * i;


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


        /* FUNKCIJA ZA CRTANJE LINIJE */

        function drawLine(
            data,
            color
        ) {

            ctx.strokeStyle =
                color;

            ctx.lineWidth =
                3;

            ctx.beginPath();


            data.forEach(
                function (
                    value,
                    index
                ) {

                    const x =
                        padding +
                        (
                            chartWidth /
                            (data.length - 1)
                        ) *
                        index;


                    const y =
                        padding +
                        chartHeight -
                        (
                            value /
                            maxValue
                        ) *
                        chartHeight;


                    if (index === 0) {

                        ctx.moveTo(
                            x,
                            y
                        );

                    } else {

                        ctx.lineTo(
                            x,
                            y
                        );

                    }

                }
            );


            ctx.stroke();


            /* TOČKE */

            ctx.fillStyle =
                color;


            data.forEach(
                function (
                    value,
                    index
                ) {

                    const x =
                        padding +
                        (
                            chartWidth /
                            (data.length - 1)
                        ) *
                        index;


                    const y =
                        padding +
                        chartHeight -
                        (
                            value /
                            maxValue
                        ) *
                        chartHeight;


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

        }


        drawLine(
            crimeData,
            "#003366"
        );


        drawLine(
            solvedData,
            "#cc0000"
        );


        /* GODINE */

        ctx.fillStyle =
            "#555555";

        ctx.font =
            "11px Arial";

        ctx.textAlign =
            "center";


        years.forEach(
            function (
                year,
                index
            ) {

                const x =
                    padding +
                    (
                        chartWidth /
                        (years.length - 1)
                    ) *
                    index;


                ctx.fillText(
                    year,
                    x,
                    height - 12
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