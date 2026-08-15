/* ==================================================
   GLAVNI GUMB - OTVARANJE POVEZNICA
================================================== */

function showLinks() {

    const links =
        document.getElementById("linkovi");

    const btn =
        document.getElementById("btn");


    if (links.style.display === "block") {

        links.style.display = "none";

        btn.classList.remove("rotate");

        btn.setAttribute(
            "aria-label",
            "Otvori poveznice"
        );

    }

    else {

        links.style.display = "block";

        btn.classList.add("rotate");

        btn.setAttribute(
            "aria-label",
            "Zatvori poveznice"
        );

    }

}


/* ==================================================
   ZOOM SLIKA
================================================== */

function zoom(img) {

    const slike =
        document.querySelectorAll(
            ".gallery img"
        );


    slike.forEach(function(slika) {

        if (slika !== img) {

            slika.classList.remove("zoom");

        }

    });


    img.classList.toggle("zoom");

}


/* ==================================================
   GRAF
================================================== */

function drawChart() {

    const canvas =
        document.getElementById("myChart");


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    const cities = [
        "Zagreb",
        "Osijek",
        "Rijeka",
        "Split"
    ];


    /* PLAVI = BROJ */

    const broj = [
        2,
        2,
        2,
        2
    ];


    /* CRVENI = RAZRIJEŠENO */

    const razrijeseno = [
        2,
        2,
        2,
        2
    ];


    const rect =
        canvas.getBoundingClientRect();


    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        rect.width * dpr;

    canvas.height =
        rect.height * dpr;


    ctx.scale(dpr, dpr);


    const width =
        rect.width;

    const height =
        rect.height;


    const marginLeft = 55;

    const marginRight = 125;

    const marginTop = 20;

    const marginBottom = 60;


    const graphWidth =
        width -
        marginLeft -
        marginRight;


    const graphHeight =
        height -
        marginTop -
        marginBottom;


    const minY = 2;

    const maxY = 20;


    /* Prozirna pozadina */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* ==================================================
       HORIZONTALNE LINIJE
    ================================================== */

    ctx.lineWidth = 1;

    ctx.strokeStyle =
        "rgba(220,220,220,.75)";

    ctx.font =
        "bold 14px Arial";

    ctx.textAlign =
        "right";


    for (
        let value = 2;
        value <= 20;
        value += 2
    ) {

        const y =
            marginTop +
            graphHeight -
            (
                (value - minY) /
                (maxY - minY)
            ) *
            graphHeight;


        ctx.beginPath();

        ctx.moveTo(
            marginLeft,
            y
        );

        ctx.lineTo(
            width - marginRight,
            y
        );

        ctx.stroke();


        ctx.fillStyle =
            "#ffffff";

        ctx.fillText(
            value,
            marginLeft - 8,
            y + 5
        );

    }


    /* ==================================================
       OSI
    ================================================== */

    ctx.strokeStyle =
        "rgba(0,0,0,.9)";

    ctx.lineWidth = 2;


    /* Y */

    ctx.beginPath();

    ctx.moveTo(
        marginLeft,
        marginTop
    );

    ctx.lineTo(
        marginLeft,
        marginTop + graphHeight
    );

    ctx.stroke();


    /* X */

    ctx.beginPath();

    ctx.moveTo(
        marginLeft,
        marginTop + graphHeight
    );

    ctx.lineTo(
        width - marginRight,
        marginTop + graphHeight
    );

    ctx.stroke();


    /* ==================================================
       STUPCI
    ================================================== */

    const groupWidth =
        graphWidth /
        cities.length;


    const barWidth =
        Math.min(
            35,
            groupWidth * .22
        );


    cities.forEach(
        function(city, index) {

            const centerX =
                marginLeft +
                groupWidth * index +
                groupWidth / 2;


            /* PLAVI - BROJ */

            drawBar(
                ctx,
                centerX - barWidth - 2,
                broj[index],
                barWidth,
                "#0066ff",
                graphHeight,
                marginTop,
                minY,
                maxY
            );


            /* CRVENI - RAZRIJEŠENO */

            drawBar(
                ctx,
                centerX + 2,
                razrijeseno[index],
                barWidth,
                "#ff0000",
                graphHeight,
                marginTop,
                minY,
                maxY
            );


            /* GRAD */

            ctx.fillStyle =
                "#ffffff";

            ctx.font =
                "bold 14px Arial";

            ctx.textAlign =
                "center";

            ctx.fillText(
                city,
                centerX,
                marginTop +
                graphHeight +
                25
            );

        }
    );


    /* ==================================================
       LEGENDA
    ================================================== */

    const legendX =
        width - 110;

    const legendY = 70;


    /* PLAVI */

    ctx.fillStyle =
        "#0066ff";

    ctx.fillRect(
        legendX,
        legendY,
        18,
        18
    );


    ctx.fillStyle =
        "#ffffff";

    ctx.font =
        "bold 14px Arial";

    ctx.textAlign =
        "left";

    ctx.fillText(
        "broj",
        legendX + 25,
        legendY + 14
    );


    /* CRVENI */

    ctx.fillStyle =
        "#ff0000";

    ctx.fillRect(
        legendX,
        legendY + 35,
        18,
        18
    );


    ctx.fillStyle =
        "#ffffff";

    ctx.fillText(
        "razriješeno",
        legendX + 25,
        legendY + 49
    );

}


/* ==================================================
   CRTANJE STUPCA
================================================== */

function drawBar(
    ctx,
    x,
    value,
    barWidth,
    color,
    graphHeight,
    marginTop,
    minY,
    maxY
) {

    const baseY =
        marginTop +
        graphHeight;


    const valueHeight =
        (
            (value - minY) /
            (maxY - minY)
        ) *
        graphHeight;


    const visibleHeight =
        Math.max(
            valueHeight,
            8
        );


    const y =
        baseY -
        visibleHeight;


    ctx.fillStyle =
        color;


    ctx.fillRect(
        x,
        y,
        barWidth,
        visibleHeight
    );


    /* Vrijednost */

    ctx.fillStyle =
        "#ffffff";

    ctx.font =
        "bold 14px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        value,
        x + barWidth / 2,
        y - 6
    );

}


/* ==================================================
   POKRETANJE GRAFA
================================================== */

window.addEventListener(
    "load",
    drawChart
);


window.addEventListener(
    "resize",
    drawChart
);