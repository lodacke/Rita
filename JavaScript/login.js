"use strict";
import { wrapper } from "../utilities/variables.js";
import { swapStyleSheet } from "../utilities/swapCSS.js";
import { RenderRegisterPage } from "./register.js";
import { RenderHomePage } from "./HomePage.js";

export function RenderLoginPage() {

    swapStyleSheet("css/register.css");

    wrapper.innerHTML = `
    <h1> RITA </h1>

        <form>
            <div id="login"> 
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required minlength="4" maxlength="8" size="10" />
                <div class="underline"></div>
            </div>

            <div id="reg">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required minlength="4" maxlength="8" size="10" />
                <div class="underline"></div>
                <p>Forgot password?</p>
            </div>

            <button> SIGN IN </button>
            <p id=message></p>

            <h3>New to this? <u> Create an account <u></h3>
        </form>

`;
    document.querySelector("h3").addEventListener("click", () => {
        RenderRegisterPage();
    })

    let loginForm = wrapper.querySelector("form");
    let username = wrapper.querySelector("#username");
    let password = wrapper.querySelector("#password");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        let errorMessage = wrapper.querySelector("#message");

        let userDetail = {
            username: username.value,
            password: password.value,
        };

        try {
            let response = await fetch("/Rita/api/login.php", {
                method: "POST",
                body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                })
            });
            let data = await response.json();

            if (!response.ok) {
                errorMessage.innerHTML = `<span>${data.message}</span>.`; 

            } else {
                
                window.localStorage.setItem("user", JSON.stringify(data));

                let user = data;

                RenderHomePage();

            }
        } catch (error) { 
            errorMessage.textContent = `Error: ${error.message}`;
            console.log(error.message);
        }
    });
}


