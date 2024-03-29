"use strict";

import { wrapper } from "./utilities/variables.js";
import { RenderLoginPage } from "./JavaScript/login.js";
import { RenderRegisterPage } from "./JavaScript/register.js";
import { RenderHomePage } from "./JavaScript/HomePage.js";

if (localStorage.getItem("state")) {
    RenderHomePage();
} else {
    RenderLoginPage();
}

export function renderFirstPage() {

    wrapper.innerHTML = `
        <div id="box">
        <h1> Rita </h1>

            <div id="LoginOrReg">

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

                    <button> Sign In </button>
                    <p id=message></p>

                    <h3>New to this? <u> Create an account <u></h3>
            </form>
            </div>
         </div>`;


    wrapper.querySelector("#box").style.backgroundImage = "url(/images/paper.png)";
        document.querySelector("button").addEventListener("click", () => {
        RenderLoginPage();
    });

    document.querySelector("h3").addEventListener("click", () => {
        RenderRegisterPage();
    })

}
