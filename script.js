/* ==================================================
   OTVARANJE I ZATVARANJE POVEZNICA
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
   GUMBI
================================================== */

function buttonClick(button) {

    /*
       Kratki vizualni efekt
       prilikom pritiska gumba.
    */

    button.classList.add("pressed");

    setTimeout(function() {

        button.classList.remove("pressed");

    }, 150);

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

            slika.classList.remove(
                "zoom"
            );

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


    /* ==================================================
       PODACI
    ================================================== */

    const cities = [

        "Zagreb",

        "Osijek",

        "Rijeka",

        "Split"

    ];


    /*
       PLAVI STUPCI = BROJ
    */

    const broj = [

        2,

        2,

        2,

        2

    ];


    /*
       CRVENI STUPCI = RAZRIJEŠENO
    */

    const razrijeseno = [

        2,

        2,

        2,

        2

    ];


    /* ==================================================
       VELIČINA CANVASA
    ================================================== */

    const rect =
        canvas.getBoundingClientRect();


    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        rect.width * dpr;


    canvas.height =
        rect.height * dpr;


    ctx.scale(
        dpr,
        dpr
    );


    const width =
        rect.width;


    const height =
        rect.height;


    /* ==================================================
       POSTAVKE GRAFA
    ================================================== */

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


    /*
       Y OS OD 2 DO 20
    */

    const minY = 2;

    const maxY = 20;


    /* ==================================================
       ČIŠĆENJE CANVASA
       NEMA BIJELE POZADINE
    ================================================== */

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


        /* Grid linija */

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


        /* Broj na Y osi */

        ctx.fillStyle =
            "#ffffff";


        ctx.fillText(
            value,
            marginLeft - 8,
            y + 5
        );

    }


    /* ==================================================
       Y OS
    ================================================== */

    ctx.strokeStyle =
        "rgba(0,0,0,.9)";


    ctx.lineWidth = 2;


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


    /* ==================================================
       X OS
    ================================================== */

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
            groupWidth * 0.22
        );


    cities.forEach(
        function(city, index) {


            const centerX =
                marginLeft +
                groupWidth * index +
                groupWidth / 2;


            /* ==========================================
               PLAVI STUPAC - BROJ
            ========================================== */

            drawBar(

                ctx,

                centerX -
                    barWidth -
                    2,

                broj[index],

                barWidth,

                "#0066ff",

                graphHeight,

                marginTop,

                minY,

                maxY

            );


            /* ==========================================
               CRVENI STUPAC - RAZRIJEŠENO
            ========================================== */

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


            /* ==========================================
               NAZIV GRADA
            ========================================== */

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
        width - 105;


    const legendY = 70;


    /* PLAVO - BROJ */

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


    /* CRVENO - RAZRIJEŠENO */

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
   FUNKCIJA ZA CRTANJE STUPCA
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


    /*
       Minimalna visina da se
       stupac vrijednosti 2
       jasno vidi.
    */

    const visibleHeight =
        Math.max(
            valueHeight,
            8
        );


    const y =
        baseY -
        visibleHeight;


    /* Stupac */

    ctx.fillStyle =
        color;


    ctx.fillRect(

        x,

        y,

        barWidth,

        visibleHeight

    );


    /* Vrijednost iznad stupca */

    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 14px Arial";


    ctx.textAlign =
        "center";


    ctx.fillText(

        value,

        x +
            barWidth / 2,

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


/* ==================================================
   PONOVNO CRTANJE KOD PROMJENE
   VELIČINE PROZORA
================================================== */

window.addEventListener(

    "resize",

    drawChart

);