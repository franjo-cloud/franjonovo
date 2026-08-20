require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;


/* ==================================================
   MIDDLEWARE
================================================== */

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


/*
   Omogućuje posluživanje HTML/CSS/JS/slika
   iz glavne mape projekta.
*/

app.use(express.static(
    path.join(__dirname)
));


/* ==================================================
   EMAIL KONFIGURACIJA
================================================== */

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASSWORD

    }

});


/* ==================================================
   KONTAKT API
================================================== */

app.post(
    "/api/contact",
    async (req, res) => {

        try {

            const name =
                String(req.body.name || "").trim();

            const message =
                String(req.body.message || "").trim();


            /* ------------------------------------------
               PROVJERA IMENA
            ------------------------------------------ */

            if (!name) {

                return res.status(400).json({

                    message:
                        "Ime je obavezno."

                });

            }


            /* ------------------------------------------
               PROVJERA PORUKE
            ------------------------------------------ */

            if (!message) {

                return res.status(400).json({

                    message:
                        "Poruka je obavezna."

                });

            }


            /* ------------------------------------------
               MAKSIMALNO 500 ZNAKOVA
            ------------------------------------------ */

            if (message.length > 500) {

                return res.status(400).json({

                    message:
                        "Poruka može imati najviše 500 znakova."

                });

            }


            /* ------------------------------------------
               SLANJE EMAILA
            ------------------------------------------ */

            await transporter.sendMail({

                from: process.env.EMAIL_USER,

                to: process.env.CONTACT_EMAIL,

                subject:
                    "Nova poruka sa web stranice",

                text:
`Nova poruka sa web stranice

Ime:
${name}

Poruka:
${message}
`

            });


            /* ------------------------------------------
               USPJEŠAN ODGOVOR
            ------------------------------------------ */

            return res.status(200).json({

                success: true,

                message:
                    "Poruka je uspješno poslana."

            });


        } catch (error) {

            console.error(
                "Greška pri slanju:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Došlo je do greške pri slanju poruke."

            });

        }

    }
);


/* ==================================================
   POKRETANJE SERVERA
================================================== */

app.listen(
    PORT,
    () => {

        console.log(
            `Server radi na http://localhost:${PORT}`
        );

    }
);