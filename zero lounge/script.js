/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const nav = document.getElementById("navMenu");

    nav.classList.toggle("active");

}


/* Close mobile menu after clicking a link */

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        document.getElementById("navMenu")
            .classList.remove("active");

    });

});


/* =========================
   BOOKING MODAL
========================= */

function openBooking(game) {

    const modal = document.getElementById("bookingModal");

    const selectedGame = document.getElementById("selectedGame");

    selectedGame.innerHTML =
        `You selected <strong>${game}</strong>. Reserve your session at ZORO Gaming Lounge.`;

    modal.classList.add("active");

}


function closeBooking() {

    document
        .getElementById("bookingModal")
        .classList.remove("active");

}


/* Close modal when clicking outside */

document.getElementById("bookingModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeBooking();
        }

    });


/* =========================
   BOOKING FORM
========================= */

document.getElementById("bookingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const phone =
            document.getElementById("phone").value;

        const date =
            document.getElementById("date").value;

        const players =
            document.getElementById("players").value;

        const game =
            document.getElementById("game").value;

        const message =
            document.getElementById("bookingMessage");


        if (!name || !phone || !date) {

            message.style.color = "#ff7070";

            message.textContent =
                "Please fill all required details.";

            return;

        }


        message.style.color = "#7cffac";

        message.textContent =
            `Thanks ${name}! Your ${game} booking request for ${players} has been received.`;


        /*
           Later, this section can be connected to:

           1. WhatsApp
           2. PHP + MySQL
           3. Google Sheets
           4. Email
           5. Firebase
        */


        this.reset();

    });


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

window.addEventListener("scroll", function() {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5,5,10,0.96)";

    } else {

        navbar.style.background =
            "rgba(7,7,12,0.82)";

    }

});


/* =========================
   SET MINIMUM BOOKING DATE
========================= */

const dateInput =
    document.getElementById("date");

const today =
    new Date().toISOString().split("T")[0];

dateInput.setAttribute("min", today);