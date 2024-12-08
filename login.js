'use strict';
let users = [
    { email: "mkhdige2001@email.com", password: "1234", username: "Mohamed" },
    { email: "mkhdige2002@email.com", password: "4321", username: "Mahmood" }
];

const form = document.getElementById("loginForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const foundUser = users.find(user => email === user.email && password === user.password);

    if (foundUser) {
        localStorage.setItem("userName", foundUser.username);
        window.location.href = "HomePageApps.html";
    } else {
        alert("Incorrect email or password. Please try again.");
    }
    console.log(email, password);
});
