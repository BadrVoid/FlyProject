document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // 1. BASIC STATE
    // =========================
    const isSigned = localStorage.getItem("signedIn");
    const hasAccount = localStorage.getItem("hasAccount");
    const currentPage = window.location.pathname;

    // =========================
    // 2. FIRST TIME USER RULE
    // =========================
    if (!hasAccount && currentPage.includes("signIn.html")) {
        window.location.href = "../Pages/createAcc.html";
        return;
    }

    // =========================
    // 3. SECURITY ROUTES
    // =========================
    if (
        isSigned === "true" &&
        (currentPage.includes("signIn.html") ||
            currentPage.includes("createAcc.html"))
    ) {
        window.location.href = "../Pages/profile.html";
        return;
    }

    if (currentPage.includes("profile.html") && isSigned !== "true") {
        window.location.href = "../Pages/signIn.html";
        return;
    }

    // =========================
    // 4. THEME SWITCHER
    // =========================
    const themeBtn = document.querySelector(".theme-btn");
    const themeLink = document.querySelector("#theme-style");
    const icon = themeBtn ? themeBtn.querySelector("i") : null;

    const isRoot = !window.location.pathname.includes("/Pages/");
    const basePath = isRoot ? "Css/Themes/" : "../Css/Themes/";

    const savedTheme = localStorage.getItem("userTheme");

    if (savedTheme === "dark") {
        themeLink.href = basePath + "darkTheme.css";
        if (icon) icon.className = "fas fa-sun";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            if (themeLink.href.includes("lightTheme.css")) {
                themeLink.href = basePath + "darkTheme.css";
                if (icon) icon.className = "fas fa-sun";
                localStorage.setItem("userTheme", "dark");
            } else {
                themeLink.href = basePath + "lightTheme.css";
                if (icon) icon.className = "fas fa-moon";
                localStorage.setItem("userTheme", "light");
            }
        });
    }

    // =========================
    // 5. SIGN IN
    // =========================
    const signInForm = document.querySelector(".signin-form");

    if (signInForm) {
        signInForm.addEventListener("submit", (event) => {
            event.preventDefault();
            //trim => remove spaces before and after the input
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            /*
                  ^ → start of string
                  [^\s@]+ → any characters except space or @ (username)
                  @ → must contain @
                  [^\s@]+ → domain name
                  \. → dot (.)
                  [^\s@]+ → extension (com, net, etc)
                  $ → end of string 
                  {6,} → at least 6 characters

                  emailRegex.test("test@gmail.com") => true
                  emailRegex.test("bad email")    => false
                  */
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^.{6,}$/; // min 6 chars

            if (!emailRegex.test(email)) {
                alert("Enter a valid email address");
                return;
            }

            if (!passwordRegex.test(password)) {
                alert("Password must be at least 6 characters");
                return;
            }

            const btn = signInForm.querySelector(".btn-signin");
            btn.innerText = "Connecting...";
            btn.style.opacity = "0.7";

            const username = email.split("@")[0];
            localStorage.setItem("userDisplayName", username);
            localStorage.setItem("userDisplayEmail", email);
            localStorage.setItem("signedIn", "true");

            setTimeout(() => {
                window.location.href = "../Pages/profile.html";
            }, 1000);
        });
    }
    // =========================
    // 6. SIGN UP
    // =========================
    const signUpForm = document.querySelector(".signup-form");

    if (signUpForm) {
        signUpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("fullname");
            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");

            const createBtn = document.getElementById("createAccBtn");

            const name = nameInput.value.trim();
            const email = emailInput ? emailInput.value.trim() : "";
            const password = passwordInput ? passwordInput.value.trim() : "";

            const nameRegex = /^[a-zA-Z\s]{3,}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^.{6,}$/;

            if (!nameRegex.test(name)) {
                alert("Name must be at least 3 letters (no numbers)");
                return;
            }

            if (!emailRegex.test(email)) {
                alert("Enter a valid email address");
                return;
            }

            if (!passwordRegex.test(password)) {
                alert("Password must be at least 6 characters");
                return;
            }

            createBtn.innerText = "Creating Account...";
            createBtn.style.opacity = "0.7";

            localStorage.setItem("userDisplayName", name);
            localStorage.setItem("userDisplayEmail", email);
            localStorage.setItem("signedIn", "true");
            localStorage.setItem("hasAccount", "true");

            setTimeout(() => {
                window.location.href = "../Pages/profile.html";
            }, 1200);
        });
    }
    // =========================
    // 7. PROFILE DISPLAY
    // =========================
    const profName = document.querySelector(".ProName");
    const profEmail = document.querySelector(".ProEmail");
    if (isSigned === "true") {
        if (profName) {
            const savedName = localStorage.getItem("userDisplayName") || "User";
            profName.textContent =
                savedName.charAt(0).toUpperCase() + savedName.slice(1);
        }
        if (profEmail) {
            const savedEmail =
                localStorage.getItem("userDisplayEmail") || "Not provided";
            profEmail.textContent =
                savedEmail.charAt(0).toUpperCase() + savedEmail.slice(1);
        }
    }

    // =========================
    // 8. LOGOUT
    // =========================
    const logoutBtn = document.querySelector(".logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("signedIn");
            localStorage.removeItem("userDisplayName");
            localStorage.removeItem("userDisplayEmail");
            window.location.href = "../Pages/signIn.html";
        });
    }

    // =========================
    // 9. BUY BUTTON PROTECTION & CLASS SELECTION
    // =========================
    const buyButtons = document.querySelectorAll(".btn-buy");

    buyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Get the class type from the data attribute
            const selectedClass = button.getAttribute("data-class");
            localStorage.setItem("selectedTicketClass", selectedClass);

            if (localStorage.getItem("signedIn") === "true") {
                window.location.href = "../Pages/paymentMethod.html";
            } else {
                alert("Please sign in to continue with your purchase.");
                window.location.href = "../Pages/signIn.html";
            }
        });
    });

    // =========================
    // 10. FEEDBACK FORM
    // =========================
    const feedbackForm = document.querySelector(".feedback-form");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const btn = feedbackForm.querySelector(".send-btn");
            btn.innerText = "Sending...";
            btn.style.opacity = "0.7";

            setTimeout(() => {
                alert(
                    "Thank you! Your feedback has been received and will be reviewed.",
                );
                btn.innerText = "Sent ✓";
                btn.style.opacity = "1";
                feedbackForm.reset();
            }, 1000);
        });
    }
    // =========================
    // 11. BookHomeBtn
    // =========================
    const bookHome = document.querySelector(".home-btn");
    if (bookHome) {
        bookHome.addEventListener("click", (e) => {
            window.location.href = "Pages/yourFlights.html";
        });
    }
    // =========================
    // 12.Faq
    // =========================
    document.querySelectorAll(".faq-question").forEach((e) => {
        e.addEventListener("click", () => {
            const faqItem = e.parentElement;
            faqItem.classList.toggle("active");
        });
    });

    // =========================
    // 13. FLIGHT BOOKING SUBMISSION (Updated)
    // =========================
    const bookingForm = document.querySelector(".Book");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Get values from your IDs
            const fromVal = document.getElementById("From").value;
            const toVal = document.getElementById("TO").value;
            const dateVal = document.getElementById("Date").value;
            // NEW: Get the Ticket Class value
            const classVal = document.getElementById("Class").value;
            const passenger =
                document.getElementById("First").value +
                " " +
                document.getElementById("Last").value;

            // Store as simple strings
            localStorage.setItem("booked_From", fromVal);
            localStorage.setItem("booked_To", toVal);
            localStorage.setItem("booked_Date", dateVal);
            localStorage.setItem("booked_Class", classVal); // Save class
            localStorage.setItem("booked_Passenger", passenger);
            // Redirect to your flight page
            window.location.href = "../Pages/yourFlights.html";
        });
    }


    // =========================
    // 14. DISPLAY IN UPCOMING TRIPS TABLE
    // =========================
    const flightTableBody = document.getElementById("tableBody");

    if (flightTableBody) {
        // Retrieve the simple strings saved from the booking form
        const fromVal = localStorage.getItem("booked_From");
        const toVal = localStorage.getItem("booked_To");
        const dateVal = localStorage.getItem("booked_Date");
        const classVal = localStorage.getItem("booked_Class");

        // We only add a row if there is actually data saved
        if (fromVal && toVal) {
            const newRow = `
                <tr>
                    <td>${fromVal}</td>
                    <td>${toVal}</td>
                    <td>${dateVal}</td>
                    <td>12:00 PM</td>
                    <td>C1</td>      
                    <td>${classVal}</td>
                </tr>
            `;

            // This adds the new flight to the TOP of the table
            flightTableBody.insertAdjacentHTML("afterbegin", newRow);
        }
    }
    // =========================
    // 15. AUTO-FILL & DISABLE CLASS INPUT
    // =========================
    // This runs on the page where the .Book form exists
    const classSelect = document.getElementById("Class");

    if (classSelect) {
        const savedClass = localStorage.getItem("selectedTicketClass");

        if (savedClass) {
            classSelect.value = savedClass;
            classSelect.disabled = true;

            classSelect.style.opacity = "0.7";
            classSelect.style.cursor = "not-allowed";
        }
    }
    // =========================
    // 16. LOAD MORE BUTTON & PAYMENT METHOD TOGGLE
    // =========================
    document.getElementById('loadMoreBtn').addEventListener('click', function() {
        const extraRows = document.getElementById('extra-rows');

        if (extraRows.style.display === "none") {
            extraRows.style.display = "table-row-group";
            this.textContent = "Show Less";
        } else {
            extraRows.style.display = "none";
            this.textContent = "Load More";
        }
    });

});
// =========================
// 17. PAYMENT METHOD TOGGLE
// =========================
document.addEventListener("DOMContentLoaded", function() {
    const method = document.getElementById("Method");
    const cardSection = document.getElementById("visadetails");
    const cardInputs = cardSection.querySelectorAll("input");

    function togglePayment() {
        const isVisa = method.value === "visa";
        cardSection.style.display = isVisa ? "grid" : "none";
        cardInputs.forEach(input => input.required = isVisa);
    }

    method.addEventListener("change", togglePayment);
    togglePayment();




});

document.addEventListener('DOMContentLoaded', () => {
    const layoutBtn = document.getElementById('layoutToggle');
    const ticketGrid = document.querySelector('.ticket-grid');

    // Check for saved preference
    const currentLayout = localStorage.getItem('preferred-layout');
    if (currentLayout === 'list') {
        ticketGrid.classList.add('list-view');
    }

    layoutBtn.addEventListener('click', () => {
        ticketGrid.classList.toggle('list-view');

        // Save preference
        if (ticketGrid.classList.contains('list-view')) {
            localStorage.setItem('preferred-layout', 'list');
        } else {
            localStorage.setItem('preferred-layout', 'grid');
        }
    });
});