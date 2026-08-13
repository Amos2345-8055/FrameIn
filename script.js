/* =========================================================
   HHGOA26
   FRAMEIN GOA
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const idCard =
    document.getElementById("idCard");

const cardName =
    document.getElementById("cardName");

const cardRole =
    document.getElementById("cardRole");

const nameInput =
    document.getElementById("nameInput");

const roleInput =
    document.getElementById("roleInput");

const profileImage =
    document.getElementById("profileImage");

const profilePlaceholder =
    document.getElementById("profilePlaceholder");

const photoInput =
    document.getElementById("photoInput");

const uploadPreview =
    document.getElementById("uploadPreview");

const uploadIcon =
    document.getElementById("uploadIcon");

const frontBtn =
    document.getElementById("frontBtn");

const backBtn =
    document.getElementById("backBtn");

const aboutModal =
    document.getElementById("aboutModal");


/* =========================================================
   PROFILE URL
========================================================= */

function getProfileUrl() {

    const base =
        window.location.origin +
        window.location.pathname;

    const params =
        new URLSearchParams();

    params.set(
        "name",
        nameInput.value.trim()
    );

    params.set(
        "role",
        roleInput.value.trim()
    );

    return base + "?" + params.toString();

}


/* =========================================================
   UPDATE CARD
========================================================= */

function updateCard() {

    const name =
        nameInput.value.trim()
        || "YOUR NAME";


    const role =
        roleInput.value.trim()
        || "FULL STACK DEVELOPER";


    cardName.textContent =
        name.toUpperCase();


    cardRole.textContent =
        role.toUpperCase();


    updateQR();

}


/* =========================================================
   LIVE INPUT
========================================================= */

nameInput.addEventListener(
    "input",
    updateCard
);


roleInput.addEventListener(
    "input",
    updateCard
);


/* =========================================================
   PHOTO UPLOAD
========================================================= */

photoInput.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];


        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            alert(
                "Please select an image file."
            );

            return;

        }


        if (file.size > 5 * 1024 * 1024) {

            alert(
                "Please choose an image below 5MB."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                profileImage.src =
                    event.target.result;


                profileImage.style.display =
                    "block";


                profilePlaceholder.style.display =
                    "none";


                uploadPreview.src =
                    event.target.result;


                uploadPreview.style.display =
                    "block";


                uploadIcon.style.display =
                    "none";

            };


        reader.readAsDataURL(file);

    }
);


/* =========================================================
   THEME IMAGES
========================================================= */

const themes = {

    sunset:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb74E8mIo9tthbRZPxuWQENiKeBN5ZUbH3KT06auYVog&s",

    ocean:
        "https://pbs.twimg.com/media/HPIiasea8AI61GB.jpg",

    monsoon:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROVS71pLC2DfZVwkebtMIKT-pkq1BQ49aJKc_c8582C-Qlz8t_D6aa3Zb&s=10",

    carnival:
        "https://hhgoa.com/assets/details.png"

};


const themeButtons =
    document.querySelectorAll(
        ".theme-btn"
    );


themeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                themeButtons.forEach(
                    btn =>
                        btn.classList.remove(
                            "active"
                        )
                );


                this.classList.add(
                    "active"
                );


                const theme =
                    this.dataset.theme;


                document.documentElement.style
                    .setProperty(
                        "--theme-image",
                        `url("${themes[theme]}")`
                    );

            }
        );

    }
);


/* =========================================================
   FLIP CARD
========================================================= */

function flipCard() {

    idCard.classList.toggle(
        "flipped"
    );


    updateFlipButtons();

}


function showFront() {

    idCard.classList.remove(
        "flipped"
    );


    updateFlipButtons();

}


function showBack() {

    idCard.classList.add(
        "flipped"
    );


    updateFlipButtons();

}


function updateFlipButtons() {

    const flipped =
        idCard.classList.contains(
            "flipped"
        );


    if (flipped) {

        frontBtn.classList.remove(
            "active"
        );

        backBtn.classList.add(
            "active"
        );

    } else {

        frontBtn.classList.add(
            "active"
        );

        backBtn.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   CLICK CARD TO FLIP
========================================================= */

idCard.addEventListener(
    "click",
    function (event) {

        if (
            event.target.closest(
                ".qr-container"
            )
        ) {

            return;

        }


        flipCard();

    }
);


/* =========================================================
   QR CODE
========================================================= */

let qr;


function updateQR() {

    const qrElement =
        document.getElementById(
            "qrcode"
        );


    if (!qrElement) {
        return;
    }


    qrElement.innerHTML = "";


    const url =
        getProfileUrl();


    qr =
        new QRCode(
            qrElement,
            {

                text: url,

                width: 130,

                height: 130,

                colorDark:
                    "#063d2f",

                colorLight:
                    "#ffffff",

                correctLevel:
                    QRCode.CorrectLevel.H

            }
        );


    document.getElementById(
        "backUrl"
    ).textContent =
        window.location.host ||
        "HHGOA26.NETLIFY.APP";

}


/* =========================================================
   OPEN PROFILE
========================================================= */

function openProfile() {

    const url =
        getProfileUrl();


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   LOAD PROFILE FROM URL
========================================================= */

function loadProfileFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    if (
        params.has("name")
    ) {

        nameInput.value =
            params.get("name");

    }


    if (
        params.has("role")
    ) {

        roleInput.value =
            params.get("role");

    }


    updateCard();

}


/* =========================================================
   DOWNLOAD CARD
========================================================= */

async function downloadCard() {

    showFront();


    const card =
        document.getElementById(
            "downloadCard"
        );


    const originalTransform =
        card.style.transform;


    card.style.transform =
        "none";


    try {

        const canvas =
            await html2canvas(
                card,
                {

                    scale: 3,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor:
                        null,

                    logging: false

                }
            );


        const link =
            document.createElement(
                "a"
            );


        const safeName =
            (
                nameInput.value ||
                "HHGOA26"
            )
            .trim()
            .replace(
                /[^a-z0-9]+/gi,
                "-"
            );


        link.download =
            `${safeName}-HHGOA26.png`;


        link.href =
            canvas.toDataURL(
                "image/png"
            );


        link.click();


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Download failed. If an external theme image is blocking export, save the theme images locally in your assets folder."
        );

    }


    card.style.transform =
        originalTransform;

}


/* =========================================================
   SHARE TO X
========================================================= */

function shareCard() {

    const name =
        nameInput.value.trim()
        || "a Hacker House Goa builder";


    const profileUrl =
        getProfileUrl();


    const text =
        `My Hacker House Goa 2026 Builder ID 🌴🚀\n\n${name}\n\n#FrameInGoa #HHGoa26`;


    const xUrl =
        "https://x.com/intent/post" +
        "?text=" +
        encodeURIComponent(
            text
        ) +
        "&url=" +
        encodeURIComponent(
            profileUrl
        );


    window.open(
        xUrl,
        "_blank",
        "width=650,height=550"
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function goHome() {

    document.getElementById(
        "home"
    ).scrollIntoView({

        behavior: "smooth"

    });

}


function goCreate() {

    document.getElementById(
        "create"
    ).scrollIntoView({

        behavior: "smooth"

    });

}


/* =========================================================
   ABOUT
========================================================= */

function showAbout() {

    aboutModal.classList.add(
        "show"
    );

}


function closeAbout() {

    aboutModal.classList.remove(
        "show"
    );

}


aboutModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            aboutModal
        ) {

            closeAbout();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

loadProfileFromURL();

updateFlipButtons();