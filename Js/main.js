document.addEventListener("DOMContentLoaded", () => {
    // --- 1. CONFIGURATION & CONSTANTS ---
    const isSigned = localStorage.getItem("signedIn");
    const currentPage = window.location.pathname;

    // --- 2. SECURITY & REDIRECT GUARDS ---
    // If logged in, don't let them go back to Sign-In/Sign-Up
    if (isSigned === "true" && (currentPage.includes("signIn.html") || currentPage.includes("signUp.html"))) {
        window.location.href = "../Pages/profile.html";
        return;
    }

    // If NOT logged in, don't let them see the Profile page
    if (currentPage.includes("profile.html") && isSigned !== "true") {
        window.location.href = "../Pages/signIn.html";
        return;
    }

    // --- 3. THEME SWITCHER ---
    const themeBtn = document.querySelector(".theme-btn");
    const themeLink = document.querySelector("#theme-style");
    const icon = themeBtn ? themeBtn.querySelector("i") : null;

    // Detect the correct base path
    const isRoot = !window.location.pathname.includes("/Pages/");
    const basePath = isRoot ? "Css/Themes/" : "../Css/Themes/";

    // Apply saved theme immediately on load
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

    // --- 4. SIGN IN LOGIC ---
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

                // Save name from email prefix
                const username = email.split("@")[0];
                localStorage.setItem("userDisplayName", username);
                localStorage.setItem("signedIn", "true");

                setTimeout(() => {
                    window.location.href = "../Pages/profile.html";
                }, 1000);
            }
        });
    }

    // --- 5. SIGN UP LOGIC ---
    const signUpForm = document.querySelector(".signup-form");
    if (signUpForm) {
        signUpForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nameInput = document.getElementById("fullname");
            const createBtn = document.getElementById("createAccBtn");
            const name = nameInput.value;

            createBtn.innerText = "Creating Account...";
            createBtn.style.opacity = "0.7";

            // Save full name
            localStorage.setItem("userDisplayName", name);
            localStorage.setItem("signedIn", "true");

            setTimeout(() => {
                alert(`Welcome aboard, ${name}! Your account has been created.`);
                window.location.href = "../Pages/profile.html";
            }, 1500);
        });
    }

    // --- 6. PROFILE DISPLAY & LOGOUT ---
    const profName = document.querySelector(".ProName");
    if (profName && isSigned === "true") {
        const savedName = localStorage.getItem("userDisplayName");
        profName.textContent = savedName.charAt(0).toUpperCase() + savedName.slice(1);
    }

    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("signedIn");
            localStorage.removeItem("userDisplayName");
            window.location.href = "../Pages/signIn.html";
        });
    }

    // --- 7. Buy-btn Logic ---
    // Select ALL buttons with the class .btn-buy
    const buyButtons = document.querySelectorAll(".btn-buy");

    buyButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const isSigned = localStorage.getItem("signedIn");

            if (isSigned === "true") {
                // User is signed in
                window.location.href = "../Pages/paymentMethod.html";
            } else {
                // User is not signed in
                alert("Please sign in to continue with your purchase.");
                window.location.href = "../Pages/signIn.html";
            }
        });
    });

});