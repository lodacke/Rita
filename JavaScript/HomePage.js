"use strict";

export async function RenderHomePage() {

    swapStyleSheet("css/landingPage.css");

    BasicLayout();


    document.querySelector("#wrapper").innerHTML += `
    <div id="navi">
        <div id="theme"> Theme </div>
        <div id="material"> Material </div>
        <div id="style"> Style </div>
    </div>
    <div id="cards"></div>
    `;

    let response = await fetch("api/data/comics.json");
    let resource = await response.json();

    let boxCards = document.querySelector("#cards");

    resource.forEach(part => {
        let card = document.createElement("div");
        console.log(part);
        card.innerHTML = `
        <div id="top">
            <div id="title"> ${part.title} </div>
            <div id="author"> ${part.author} </div>
            <div id="time"> ${part.publish} </div>
        </div>
            <div id="pic"></div>
        <div id="bottom">
            <div id="description"> ${part.description} </div>
            <div id="likes"> Likes: ${part.likes} </div>
        </div>
        `;
        card.querySelector("#pic").style.backgroundImage = "url(../images/unnamed.png)";
        boxCards.append(card);
    });
}
