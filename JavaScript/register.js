"use strict";

import { wrapper } from "../utilities/variables.js";
import { swapStyleSheet } from "../utilities/swapCSS.js";
import { RenderLoginPage } from "./login.js";


export function RenderRegisterPage() {

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
            </div>
            <div id="confirm">
                <label for="confirm">Confirm password:</label>
                <input type="password" id="confirmPassword" name="confirm" required minlength="4" maxlength="8" size="10" />
                <div class="underline"></div>
            </div>
            
            <div id="email">
                <label for="email">Email:</label>
                <input type="text" id="emailInput" name="Email" required minlength="4" size="10" />
                <div class="underline"></div>
            </div>
        
        <button id="register" type=submit> SIGN UP </button>
        <p id=message></p>

        <h3>Got an account? <u>Login here</u></h3>
    </form>`;


    document.querySelector("h3").addEventListener("click", (event) => {
        event.preventDefault();
        RenderLoginPage();
    })

    wrapper.querySelector("form").addEventListener("submit", async function (event) {
        
        event.preventDefault();

        let emailInput = wrapper.querySelector("#emailInput").value;
        let usernameInput = wrapper.querySelector("#username").value;
        let passwordInput = wrapper.querySelector("#password").value;
        let message = wrapper.querySelector("#message");
        let confirmPassword = wrapper.querySelector("#confirmPassword").value

        if (passwordInput === confirmPassword) {

            try {
                let userDetail = {
                    email: emailInput,
                    username: usernameInput,
                    password: passwordInput,

                };

                let response = await fetch("../api/register.php", {
                    method: "POST",
                    body: JSON.stringify(userDetail)
                });
                let data = await response.json();

                if (response.ok) {
                    message.innerHTML = `The user ${data.username} was successfully added!`;

                } else {
                    message.innerHTML = `<span>${data.message}</span>.`;
                }
            } catch (error) {
                message.textContent = `${error.message}`;
            }
        } else {
            message.textContent = "The passwords doesnt seem to match";
        }
    });
}