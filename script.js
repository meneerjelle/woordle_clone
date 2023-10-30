const word = ["MAGIE", "RADIO", "KERST", "LAARS", "ZACHT", "HOOFD", "ZICHT", "KAARS"];

const random = Math.floor(Math.random() * word.length);
const wordChoice = word[random].split("");

const validLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let userInput = document.querySelector("#inputField");
let button = document.querySelector("#button");

button.addEventListener("click", function() {
        checkWord();
        userInput.value = "";
    
});

let startTime;
startTime = new Date ();
let divCount = 0
let guessCount = 0

let popup = document.querySelector("#popUpBox");

function checkWord() {
    guessCount += 1;
    let userGuess = userInput.value.toUpperCase().split("");
    let newDiv = document.createElement("div")
    newDiv.className = `word${divCount += 1}`;
    document.querySelector(".output").appendChild(newDiv);

    if (userGuess.join("") === wordChoice.join("")) {
        let currentTime = new Date ();
        let elapsedTime = Math.floor((currentTime - startTime) / 1000);
        showPopUp();

        function showPopUp() {
            let popUpText = document.createElement("p");
            let popupContent = document.querySelector(".popup-content");
        
            popUpText.innerHTML = `
            <h1>Gefeliciteerd!</h1>
        
            <p>Je hebt het woord geraden. Het woord was: <strong>${wordChoice.join("")}</strong>.</p>
            
            <p>Je deed er <strong>${elapsedTime} seconden</strong> over om het woord te raden.</p>

            <div class="close"><p>Speel opnieuw!</p></div>
            
            `;
            popupContent.appendChild(popUpText);
        
            popup.style.display = "block";
            let span = document.querySelector(".close");
            span.onclick = function () {
                popup.style.display = "none";
                location.reload();
            }
        }
    } else if (guessCount === 7) {
        showPopUpLose();

        function showPopUpLose() {
            let popUpText = document.createElement("p");
            let popupContent = document.querySelector(".popup-content");
        
            popUpText.innerHTML = `
            <h1>Helaas!</h1>
        
            <p>Je hebt het woord niet geraden. Het woord was: <strong>${wordChoice.join("")}</strong>.</p>
    
            <div class="close"><p>Speel opnieuw!</p></div>
            
            `;
            popupContent.appendChild(popUpText);
        
            popup.style.display = "block";
            let span = document.querySelector(".close");
            span.onclick = function () {
                popup.style.display = "none";
                location.reload();
            }
        }
    }

    let correctLetters = [];

    for (let i = 0; i <= 4; i++) {
        let p = document.createElement("p");
        p.id = `letter${i}`;
        newDiv.appendChild(p);

        let insertLetter = document.querySelector(`.word${divCount} > #letter${i}`);
        if (userGuess[i] === wordChoice[i]) {
            insertLetter.innerHTML = `<span style="color: #00c003;">${userGuess[i]}</span>`
            correctLetters.push(userGuess[i]);
       }
    }

    for (let k = 0; k <= 4; k++) {
        let insertLetter = document.querySelector(`.word${divCount} > #letter${k}`);
        if (wordChoice.includes(userGuess[k]) && !correctLetters.includes(userGuess[k])) {
            insertLetter.innerHTML = `<span style="color: orange;">${userGuess[k]}</span>`;
            correctLetters.push(userGuess[k]);
        } else if (!validLetters.includes(userGuess[k])) {
            insertLetter.innerHTML = `<span style="color: #fbefff;">_</span>`
        } else if (userGuess[k] != wordChoice[k]) {
            insertLetter.innerHTML = `<span style="color: #fbefff;">${userGuess[k]}</span>`
    }


    }

}

console.log(wordChoice);

