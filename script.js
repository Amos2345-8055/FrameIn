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
   DOWNLOAD FRONT + BACK SIDE BY SIDE
========================================================= */

async function downloadCard() {

    const front =
        document.querySelector(".card-front");

    const back =
        document.querySelector(".card-back");

    if (!front || !back) {

        alert("Card faces not found.");

        return;

    }


    /* -----------------------------------------------------
       SAVE CURRENT CARD STATE
    ----------------------------------------------------- */

    const card =
        document.getElementById("idCard");

    const wasFlipped =
        card.classList.contains("flipped");


    try {

        /* -------------------------------------------------
           WAIT FOR FONTS
        ------------------------------------------------- */

        if (document.fonts) {
            await document.fonts.ready;
        }


        /* -------------------------------------------------
           GET ORIGINAL CARD SIZE
        ------------------------------------------------- */

        const cardRect =
            front.getBoundingClientRect();

        const cardWidth =
            Math.round(cardRect.width);

        const cardHeight =
            Math.round(cardRect.height);


        /* -------------------------------------------------
           CREATE EXPORT CONTAINER
        ------------------------------------------------- */

        const exportContainer =
            document.createElement("div");


        exportContainer.style.position =
            "fixed";

        exportContainer.style.left =
            "-100000px";

        exportContainer.style.top =
            "0";

        exportContainer.style.display =
            "flex";

        exportContainer.style.flexDirection =
            "row";

        exportContainer.style.alignItems =
            "flex-start";

        exportContainer.style.gap =
            "20px";

        exportContainer.style.padding =
            "0";

        exportContainer.style.margin =
            "0";

        exportContainer.style.background =
            "transparent";

        exportContainer.style.width =
            `${cardWidth * 2 + 20}px`;

        exportContainer.style.height =
            `${cardHeight}px`;

        exportContainer.style.overflow =
            "visible";


        /* -------------------------------------------------
           CLONE FRONT
        ------------------------------------------------- */

        const frontClone =
            front.cloneNode(true);


        frontClone.style.position =
            "relative";

        frontClone.style.left =
            "0";

        frontClone.style.top =
            "0";

        frontClone.style.width =
            `${cardWidth}px`;

        frontClone.style.height =
            `${cardHeight}px`;

        frontClone.style.transform =
            "none";

        frontClone.style.transformStyle =
            "flat";

        frontClone.style.backfaceVisibility =
            "visible";

        frontClone.style.webkitBackfaceVisibility =
            "visible";

        frontClone.style.visibility =
            "visible";

        frontClone.style.display =
            "block";

        frontClone.style.opacity =
            "1";

        frontClone.style.flex =
            "0 0 auto";


        /* -------------------------------------------------
           CLONE BACK
        ------------------------------------------------- */

        const backClone =
            back.cloneNode(true);


        backClone.style.position =
            "relative";

        backClone.style.left =
            "0";

        backClone.style.top =
            "0";

        backClone.style.width =
            `${cardWidth}px`;

        backClone.style.height =
            `${cardHeight}px`;

        /* IMPORTANT:
           Remove the 180deg flip for export
        */

        backClone.style.transform =
            "none";

        backClone.style.transformStyle =
            "flat";

        backClone.style.backfaceVisibility =
            "visible";

        backClone.style.webkitBackfaceVisibility =
            "visible";

        backClone.style.visibility =
            "visible";

        backClone.style.display =
            "block";

        backClone.style.opacity =
            "1";

        backClone.style.flex =
            "0 0 auto";


        /* -------------------------------------------------
           ADD BOTH SIDES
        ------------------------------------------------- */

        exportContainer.appendChild(
            frontClone
        );

        exportContainer.appendChild(
            backClone
        );


        document.body.appendChild(
            exportContainer
        );


        /* -------------------------------------------------
           COPY QR CANVAS DATA
           QRCodeJS may use canvas.
        ------------------------------------------------- */

        const originalCanvases =
            back.querySelectorAll("canvas");

        const clonedCanvases =
            backClone.querySelectorAll("canvas");


        originalCanvases.forEach(
            (sourceCanvas, index) => {

                const targetCanvas =
                    clonedCanvases[index];

                if (!targetCanvas) {
                    return;
                }

                targetCanvas.width =
                    sourceCanvas.width;

                targetCanvas.height =
                    sourceCanvas.height;


                const ctx =
                    targetCanvas.getContext("2d");


                if (ctx) {

                    ctx.drawImage(
                        sourceCanvas,
                        0,
                        0
                    );

                }

            }
        );


        /* -------------------------------------------------
           COPY QR IMAGES IF PRESENT
        ------------------------------------------------- */

        const originalImages =
            back.querySelectorAll("img");

        const clonedImages =
            backClone.querySelectorAll("img");


        originalImages.forEach(
            (sourceImg, index) => {

                const targetImg =
                    clonedImages[index];

                if (!targetImg) {
                    return;
                }

                targetImg.src =
                    sourceImg.src;

            }
        );


        /* -------------------------------------------------
           SMALL DELAY FOR RENDERING
        ------------------------------------------------- */

        await new Promise(
            resolve =>
                setTimeout(resolve, 300)
        );


        /* -------------------------------------------------
           CREATE COMBINED CANVAS
        ------------------------------------------------- */

        const canvas =
            await html2canvas(
                exportContainer,
                {

                    scale: 3,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor:
                        null,

                    logging: false,

                    imageTimeout: 15000

                }
            );


        /* -------------------------------------------------
           REMOVE TEMPORARY CONTAINER
        ------------------------------------------------- */

        document.body.removeChild(
            exportContainer
        );


        /* -------------------------------------------------
           FILE NAME
        ------------------------------------------------- */

        const safeName =
            (
                nameInput.value ||
                "HHGOA26"
            )
            .trim()
            .replace(
                /[^a-z0-9]+/gi,
                "-"
            )
            .replace(
                /^-+|-+$/g,
                ""
            );


        /* -------------------------------------------------
           DOWNLOAD
        ------------------------------------------------- */

        const link =
            document.createElement("a");


        link.download =
            `${safeName}-HHGOA26-FRONT-BACK.png`;


        link.href =
            canvas.toDataURL(
                "image/png"
            );


        link.click();


    } catch (error) {

        console.error(
            "Download error:",
            error
        );


        /* Make sure temporary container
           is removed if something fails */

        const temp =
            document.querySelector(
                'body > div[style*="-100000px"]'
            );


        if (temp) {
            temp.remove();
        }


        alert(
            "Download failed. Please try again."
        );

    }


    /* -----------------------------------------------------
       RESTORE ORIGINAL FLIP STATE
    ----------------------------------------------------- */

    if (wasFlipped) {

        showBack();

    } else {

        showFront();

    }

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
