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
    if (isSigned === "true" &&
        (currentPage.includes("signIn.html") || currentPage.includes("createAcc.html"))) {
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

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (email && password) {
                const btn = signInForm.querySelector(".btn-signin");
                btn.innerText = "Connecting...";
                btn.style.opacity = "0.7";

                const username = email.split("@")[0];
                localStorage.setItem("userDisplayName", username);
                localStorage.setItem("signedIn", "true");

                setTimeout(() => {
                    window.location.href = "../Pages/profile.html";
                }, 1000);
            }
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
            const createBtn = document.getElementById("createAccBtn");
            const name = nameInput.value;

            createBtn.innerText = "Creating Account...";
            createBtn.style.opacity = "0.7";

            localStorage.setItem("userDisplayName", name);
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

    if (profName && isSigned === "true") {
        const savedName = localStorage.getItem("userDisplayName") || "User";
        profName.textContent =
            savedName.charAt(0).toUpperCase() + savedName.slice(1);
    }

    // =========================
    // 8. LOGOUT
    // =========================
    const logoutBtn = document.querySelector(".logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("signedIn");
            localStorage.removeItem("userDisplayName");
            window.location.href = "../Pages/signIn.html";
        });
    }

    // =========================
    // 9. BUY BUTTON PROTECTION
    // =========================
    const buyButtons = document.querySelectorAll(".btn-buy");

    buyButtons.forEach((button) => {
        button.addEventListener("click", () => {
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
                alert("Thank you! Your feedback has been received and will be reviewed.");
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
            window.location.href = "../Pages/boarding.html";
        });
    }
});