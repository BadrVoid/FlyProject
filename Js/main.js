document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Theme Switcher ---
    // 1. Select the button and the stylesheet link
    const themeBtn = document.querySelector(".theme-btn");
    const themeLink = document.querySelector("#theme-style");
    const icon = themeBtn.querySelector("i");

    // 1. Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("userTheme");

    // 2. Apply the saved theme immediately on page load
    if (savedTheme === "dark") {
        themeLink.href = "../Css/Themes/darkTheme.css";
        if (icon) icon.className = "fas fa-sun";
    } else {
        themeLink.href = "../Css/Themes/lightTheme.css";
        if (icon) icon.className = "fas fa-moon";
    }

    // 3. Toggle and Save on click
    themeBtn.addEventListener("click", () => {
        // If current link is light, switch to dark
        if (themeLink.href.includes("lightTheme.css")) {
            themeLink.href = "../Css/Themes/darkTheme.css";
            if (icon) icon.className = "fas fa-sun";
            localStorage.setItem("userTheme", "dark");
        } else {
            themeLink.href = "../Css/Themes/lightTheme.css";
            if (icon) icon.className = "fas fa-moon";
            localStorage.setItem("userTheme", "light");
        }
    });

    // --- 2. SIGN IN LOGIC ---
    const signInForm = document.querySelector(".signin-form");
    if (signInForm) {
        console.log("Sign-in form active");
        signInForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (email && password) {
                const btn = signInForm.querySelector(".btn-signin");
                btn.innerText = "Connecting...";
                btn.style.opacity = "0.7";

                setTimeout(() => {
                    window.location.href = "../Pages/profile.html";
                }, 1000);
            }
        });
    }

    // --- 3. SIGN UP LOGIC ---
    const signUpForm = document.querySelector(".signup-form");
    if (signUpForm) {
        console.log("Sign-up form active");
        signUpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const createBtn = document.getElementById("createAccBtn");
            const nameInput = document.getElementById("fullname");

            const name = nameInput.value;
            createBtn.innerText = "Creating Account...";
            createBtn.style.opacity = "0.7";
            createBtn.style.cursor = "not-allowed";

            setTimeout(() => {
                alert(`Welcome aboard, ${name}! Your account has been created.`);
                window.location.href = "../Pages/profile.html";
            }, 1500);
        });
    }
});