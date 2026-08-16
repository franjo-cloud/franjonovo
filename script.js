/* ==================================================
   MOBILNI IZBORNIK
================================================== */

const menuButton =
    document.getElementById("menuButton");

const mainNav =
    document.querySelector(".main-nav");


if (menuButton && mainNav) {

    menuButton.addEventListener(
        "click",
        function () {

            mainNav.classList.toggle("open");


            if (
                mainNav.classList.contains("open")
            ) {

                menuButton.textContent = "×";

                menuButton.setAttribute(
                    "aria-label",
                    "Zatvori izbornik"
                );

            }

            else {

                menuButton.textContent = "☰";

                menuButton.setAttribute(
                    "aria-label",
                    "Otvori izbornik"
                );

            }

        }
    );

}


/* ==================================================
   ZOOM SLIKA
================================================== */

function zoomImage(image) {

    const images =
        document.querySelectorAll(
            ".gallery img"
        );


    images.forEach(
        function (item) {

            if (item !== image) {

                item.classList.remove(
                    "zoom"
                );

            }

        }
    );


    image.classList.toggle("zoom");

}


/* ==================================================
   GRAF
================================================== */

function drawCrimeChart() {


    const canvas =
        document.getElementById(
            "crimeChart"
        );


    if (!canvas) {

        return;

    }


    const container =
        canvas.parentElement;


    const width =
        container.clientWidth;


    const height =
        container.clientHeight;


    const ratio =
        window.devicePixelRatio || 1;


    canvas.width =
        width * ratio;


    canvas.height =
        height * ratio;


    canvas.style.width =
        width + "px";


    canvas.style.height =
        height + "px";


    const ctx =
        canvas.getContext("2d");


    ctx.scale(
        ratio,
        ratio
    );


    /* ----------------------------------------------
       PODACI
    ---------------------------------------------- */

    const cities = [

        "Zagreb",
        "Osijek",
        "Rijeka",
        "Split"

    ];


    const broj = [

        2,
        2,
        2,
        2

    ];


    const razrijeseno = [

        2,
        2,
        2,
        2

    ];


    /* ----------------------------------------------
       DIMENZIJE
    ---------------------------------------------- */

    const left =
        width < 500
            ? 40
            : 50;


    const right =
        width < 500
            ? 20
            : 105;


    const top = 25;

    const bottom = 55;


    const graphWidth =
        width -
        left -
        right;


    const graphHeight =
        height -
        top -
        bottom;


    const maxValue = 20;


    /* ----------------------------------------------
       PROZIRNA POZADINA
    ---------------------------------------------- */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* ----------------------------------------------
       VODORAVNE LINIJE
    ---------------------------------------------- */

    ctx.font =
        "10px Arial";


    ctx.textAlign =
        "right";


    for (
        let value = 2;
        value <= 20;
        value += 2
    ) {


        const y =
            top +
            graphHeight -
            (
                value /
                maxValue
            ) *
            graphHeight;


        ctx.beginPath();


        ctx.moveTo(
            left,
            y
        );


        ctx.lineTo(
            width - right,
            y
        );


        ctx.strokeStyle =
            "rgba(150,190,210,.18)";


        ctx.lineWidth = 1;


        ctx.stroke();


        ctx.fillStyle =
            "#8FA9B8";


        ctx.fillText(
            value,
            left - 7,
            y + 4
        );

    }


    /* ----------------------------------------------
       OX I OY
    ---------------------------------------------- */

    const baseY =
        top + graphHeight;


    ctx.beginPath();


    ctx.moveTo(
        left,
        top
    );


    ctx.lineTo(
        left,
        baseY
    );


    ctx.lineTo(
        width - right,
        baseY
    );


    ctx.strokeStyle =
        "#527489";


    ctx.lineWidth =
        1.5;


    ctx.stroke();


    /* ----------------------------------------------
       STUPCI
    ---------------------------------------------- */

    const groupWidth =
        graphWidth /
        cities.length;


    const barWidth =
        width < 500
            ? 13
            : 22;


    cities.forEach(
        function (city, index) {


            const center =
                left +
                groupWidth * index +
                groupWidth / 2;


            /* PLAVI - BROJ */

            drawBar(

                ctx,

                center -
                barWidth -
                2,

                broj[index],

                barWidth,

                "#348AC7",

                top,

                graphHeight,

                maxValue,

                baseY

            );


            /* CRVENI - RAZRIJEŠENO */

            drawBar(

                ctx,

                center + 2,

                razrijeseno[index],

                barWidth,

                "#D9534F",

                top,

                graphHeight,

                maxValue,

                baseY

            );


            /* NAZIV GRADA */

            ctx.fillStyle =
                "#B9CBD5";


            ctx.font =
                width < 500
                    ? "9px Arial"
                    : "11px Arial";


            ctx.textAlign =
                "center";


            ctx.fillText(

                city,

                center,

                baseY + 25

            );

        }
    );


    /* ----------------------------------------------
       LEGENDA
    ---------------------------------------------- */

    if (width >= 500) {


        const legendX =
            width -
            right +
            12;


        drawLegend(

            ctx,

            legendX,

            top + 20,

            "#348AC7",

            "Broj"

        );


        drawLegend(

            ctx,

            legendX,

            top + 55,

            "#D9534F",

            "Razriješeno"

        );

    }

}


/* ==================================================
   CRTANJE STUPCA
================================================== */

function drawBar(

    ctx,
    x,
    value,
    width,
    color,
    top,
    graphHeight,
    maxValue,
    baseY

) {


    const barHeight =
        (
            value /
            maxValue
        ) *
        graphHeight;


    const y =
        baseY -
        barHeight;


    ctx.fillStyle =
        color;


    ctx.fillRect(

        x,
        y,
        width,
        barHeight

    );


    /* VRIJEDNOST */

    ctx.fillStyle =
        "#DDEAF0";


    ctx.font =
        "bold 10px Arial";


    ctx.textAlign =
        "center";


    ctx.fillText(

        value,

        x +
        width / 2,

        y - 6

    );

}


/* ==================================================
   LEGENDA GRAFA
================================================== */

function drawLegend(

    ctx,
    x,
    y,
    color,
    text

) {


    ctx.fillStyle =
        color;


    ctx.fillRect(

        x,
        y,
        10,
        10

    );


    ctx.fillStyle =
        "#9FB4C0";


    ctx.font =
        "10px Arial";


    ctx.textAlign =
        "left";


    ctx.fillText(

        text,

        x + 15,

        y + 9

    );

}


/* ==================================================
   POKRETANJE
================================================== */

window.addEventListener(

    "load",

    drawCrimeChart

);


window.addEventListener(

    "resize",

    drawCrimeChart

);