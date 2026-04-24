document.addEventListener("DOMContentLoaded", () => {

    // --- 1. SIGN IN LOGIC ---
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

    // --- 2. SIGN UP LOGIC ---
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