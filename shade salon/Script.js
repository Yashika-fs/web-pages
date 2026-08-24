/* =====================================================
   SHADES A UNISEX SALON
   FRONTEND ONLY
   HTML + CSS + JAVASCRIPT + LOCAL STORAGE
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

let selectedTime = "";

const bookingModal =
    document.getElementById("bookingModal");

const authModal =
    document.getElementById("authModal");

const dashboardModal =
    document.getElementById("dashboardModal");


/* =====================================================
   NAVBAR
===================================================== */

window.addEventListener("scroll", function () {

    const header =
        document.getElementById("header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


function toggleMenu() {

    document
        .getElementById("navLinks")
        .classList.toggle("active");

}


/* =====================================================
   LOCAL STORAGE
===================================================== */

/*
    Users are stored inside browser LocalStorage.
*/

function getUsers() {

    return JSON.parse(
        localStorage.getItem("shadesUsers")
    ) || [];

}


function saveUsers(users) {

    localStorage.setItem(
        "shadesUsers",
        JSON.stringify(users)
    );

}


function getAppointments() {

    return JSON.parse(
        localStorage.getItem("shadesAppointments")
    ) || [];

}


function saveAppointments(appointments) {

    localStorage.setItem(
        "shadesAppointments",
        JSON.stringify(appointments)
    );

}


/* =====================================================
   REGISTER
===================================================== */

function showRegister() {

    document
        .getElementById("loginForm")
        .classList.add("hidden");

    document
        .getElementById("registerForm")
        .classList.remove("hidden");

}


function showLogin() {

    document
        .getElementById("registerForm")
        .classList.add("hidden");

    document
        .getElementById("loginForm")
        .classList.remove("hidden");

}


function register() {

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const phone =
        document.getElementById("registerPhone").value.trim();

    const password =
        document.getElementById("registerPassword").value;


    if (!name || !email || !phone || !password) {

        alert("Please fill all fields.");

        return;

    }


    const users = getUsers();


    const existingUser =
        users.find(
            user =>
                user.email.toLowerCase() ===
                email.toLowerCase()
        );


    if (existingUser) {

        alert("An account with this email already exists.");

        return;

    }


    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        phone: phone,

        password: password

    };


    users.push(newUser);

    saveUsers(users);


    alert(
        "Account created successfully! ✨"
    );


    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPhone").value = "";
    document.getElementById("registerPassword").value = "";


    showLogin();

}


/* =====================================================
   LOGIN
===================================================== */

function login() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    const users = getUsers();


    const user =
        users.find(
            u =>
                u.email.toLowerCase() ===
                email.toLowerCase()
                &&
                u.password === password
        );


    if (!user) {

        alert(
            "Invalid email or password."
        );

        return;

    }


    localStorage.setItem(
        "shadesCurrentUser",
        JSON.stringify(user)
    );


    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";


    closeAuth();

    updateNavbar();

    alert(
        "Welcome back, " + user.name + "! ✨"
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "shadesCurrentUser"
    );


    closeDashboard();

    updateNavbar();

    alert("You have been logged out.");

}


/* =====================================================
   CURRENT USER
===================================================== */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("shadesCurrentUser")
    );

}


/* =====================================================
   NAV ACCOUNT
===================================================== */

function updateNavbar() {

    const account =
        document.getElementById("navAccount");

    const user = getCurrentUser();


    if (user) {

        account.innerHTML = `
            <button class="nav-book"
                    onclick="openDashboard()">
                ${user.name.split(" ")[0]} 👤
            </button>
        `;

    } else {

        account.innerHTML = `
            <button class="nav-book"
                    onclick="openAuth()">
                Login
            </button>
        `;

    }

}


updateNavbar();


/* =====================================================
   AUTH MODAL
===================================================== */

function openAuth() {

    authModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeAuth() {

    authModal.classList.remove("active");

    document.body.style.overflow = "auto";

}


/* =====================================================
   BOOKING MODAL
===================================================== */

function openBooking(service = "") {

    const user = getCurrentUser();


    /*
       Customer must login before booking.
    */

    if (!user) {

        alert(
            "Please login or create an account before booking."
        );

        openAuth();

        return;

    }


    bookingModal.classList.add("active");

    document.body.style.overflow = "hidden";


    if (service) {

        document.getElementById(
            "bookingService"
        ).value = service;

    }

}


function closeBooking() {

    bookingModal.classList.remove("active");

    document.body.style.overflow = "auto";

}


/* =====================================================
   DATE SETUP
===================================================== */

const dateInput =
    document.getElementById("bookingDate");


if (dateInput) {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1).padStart(2, "0");

    const day =
        String(today.getDate()).padStart(2, "0");


    dateInput.min =
        `${year}-${month}-${day}`;

}


/* =====================================================
   TIME SLOTS
===================================================== */

const timeSlots = [

    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM"

];


function loadSlots() {

    const date =
        document.getElementById("bookingDate").value;

    const container =
        document.getElementById("slots");


    selectedTime = "";


    if (!date) {

        container.innerHTML = `
            <p class="slot-message">
                Select a date to view available slots.
            </p>
        `;

        return;

    }


    const appointments =
        getAppointments();


    container.innerHTML = "";


    timeSlots.forEach(time => {

        const alreadyBooked =
            appointments.some(
                appointment =>
                    appointment.date === date &&
                    appointment.time === time
            );


        const button =
            document.createElement("button");


        button.classList.add("slot");

        button.innerText =
            time;


        if (alreadyBooked) {

            button.classList.add("booked");

            button.disabled = true;

        } else {

            button.onclick = function () {

                document
                    .querySelectorAll(".slot")
                    .forEach(
                        slot =>
                            slot.classList.remove("selected")
                    );


                button.classList.add("selected");

                selectedTime = time;

            };

        }


        container.appendChild(button);

    });

}


/* =====================================================
   CONFIRM BOOKING
===================================================== */

function confirmBooking() {

    const user = getCurrentUser();


    if (!user) {

        alert("Please login first.");

        return;

    }


    const service =
        document.getElementById(
            "bookingService"
        ).value;


    const date =
        document.getElementById(
            "bookingDate"
        ).value;


    if (!service) {

        alert(
            "Please select a service."
        );

        return;

    }


    if (!date) {

        alert(
            "Please select a date."
        );

        return;

    }


    if (!selectedTime) {

        alert(
            "Please select an available time."
        );

        return;

    }


    const appointments =
        getAppointments();


    /*
       Double-checking the slot before saving.
    */

    const slotTaken =
        appointments.some(
            appointment =>
                appointment.date === date &&
                appointment.time === selectedTime
        );


    if (slotTaken) {

        alert(
            "Sorry! This slot was just booked."
        );

        loadSlots();

        return;

    }


    const appointment = {

        id: Date.now(),

        userId: user.id,

        userName: user.name,

        service: service,

        date: date,

        time: selectedTime,

        status: "Confirmed"

    };


    appointments.push(appointment);

    saveAppointments(appointments);


    alert(
        "Appointment confirmed successfully! ✨"
    );


    document.getElementById(
        "bookingService"
    ).value = "";

    document.getElementById(
        "bookingDate"
    ).value = "";


    document.getElementById(
        "slots"
    ).innerHTML = `
        <p class="slot-message">
            Select a date to view available slots.
        </p>
    `;


    selectedTime = "";


    closeBooking();

    openDashboard();

}


/* =====================================================
   DASHBOARD
===================================================== */

function openDashboard() {

    const user = getCurrentUser();


    if (!user) {

        openAuth();

        return;

    }


    dashboardModal.classList.add("active");

    document.body.style.overflow = "hidden";


    document.getElementById(
        "dashboardGreeting"
    ).innerText =
        "Hello, " + user.name.split(" ")[0] + "!";


    document.getElementById(
        "profileName"
    ).innerText =
        user.name;


    document.getElementById(
        "profileEmail"
    ).innerText =
        user.email;


    displayAppointments();

}


function closeDashboard() {

    dashboardModal.classList.remove("active");

    document.body.style.overflow = "auto";

}


/* =====================================================
   DISPLAY APPOINTMENTS
===================================================== */

function displayAppointments() {

    const user = getCurrentUser();

    const container =
        document.getElementById(
            "appointmentsList"
        );


    const appointments =
        getAppointments();


    const userAppointments =
        appointments.filter(
            appointment =>
                appointment.userId === user.id
        );


    if (userAppointments.length === 0) {

        container.innerHTML = `
            <div class="appointment-card">
                <p>
                    You don't have any appointments yet.
                </p>
            </div>
        `;

        return;

    }


    container.innerHTML = "";


    userAppointments.forEach(
        appointment => {

            const card =
                document.createElement("div");


            card.className =
                "appointment-card";


            card.innerHTML = `

                <strong>
                    ${appointment.service}
                </strong>

                <p>
                    📅 ${formatDate(appointment.date)}
                </p>

                <p>
                    🕐 ${appointment.time}
                </p>

                <p>
                    ✓ ${appointment.status}
                </p>

                <button
                    class="cancel-btn"
                    onclick="cancelAppointment(${appointment.id})">

                    Cancel Appointment

                </button>
            `;


            container.appendChild(card);

        }
    );

}


/* =====================================================
   CANCEL APPOINTMENT
===================================================== */

function cancelAppointment(id) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this appointment?"
        );


    if (!confirmCancel) {

        return;

    }


    let appointments =
        getAppointments();


    appointments =
        appointments.filter(
            appointment =>
                appointment.id !== id
        );


    saveAppointments(appointments);


    displayAppointments();


    alert(
        "Appointment cancelled successfully."
    );

}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =====================================================
   FAQ
===================================================== */

document
    .querySelectorAll(".faq-question")
    .forEach(question => {

        question.addEventListener(
            "click",
            function () {

                const item =
                    this.parentElement;


                document
                    .querySelectorAll(".faq-item")
                    .forEach(other => {

                        if (other !== item) {

                            other.classList.remove(
                                "active"
                            );

                        }

                    });


                item.classList.toggle("active");

            }
        );

    });


/* =====================================================
   MODAL OUTSIDE CLICK
===================================================== */

window.addEventListener(
    "click",
    function (event) {

        if (event.target === authModal) {

            closeAuth();

        }

        if (event.target === bookingModal) {

            closeBooking();

        }

        if (event.target === dashboardModal) {

            closeDashboard();

        }

    }
);


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function () {

                document
                    .getElementById("navLinks")
                    .classList.remove("active");

            }
        );

    });