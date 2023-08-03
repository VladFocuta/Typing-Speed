let revealWords = document.getElementById("revealWords");
let words = ["speed", "size", "live", "freighter", "policy", "rebel", "check", "reckless", "gesture", "headquarters", "child",
    "switch", "cute", "adviser", "version", "vegetable", "smooth", "match", "begin", "prosecution", "emergency", "record", "tie",
    "trouser", "bleed", "anticipation", "performer", "tribute", "premium", "blackmail", "reaction", "hospital", "deposit", "pursuit",
    "manual", "earthquake", "shout", "fare", "lead", "regular", "increase", "prisoner", "extent", "poor", "competition", "bathtub", "highway",
    "feast", "passive", "representative"];
let printWords = document.getElementById("messagesContainer");
let userInputBar = document.getElementById("userInput");
let rightWords = document.getElementById("rightWords");
let timerMessage = document.getElementById("timer");

let l = 0;
let word = words[l];
let wordsCounter = 0;
const sixtySeconds = 60, oneSecond = 1, zeroSeconds = -1;
let endProgram = false, timer = sixtySeconds, timeInterval;

function timeCounter() {
    if (!endProgram) {
        timeInterval = setInterval(function () {
            timerMessage.innerHTML = timer;
            timerMessage.style.display = "block";
            timer -= oneSecond;
            if (timer === zeroSeconds) {
                endGame();
                deleteWords();
            }
        }, 1000);
    }
}

function endGame() {
    endProgram = true;
    clearInterval(timeInterval);
    document.getElementById("userInput").disabled = true;
}

function countCorrectWords() {
    let input = userInputBar.value;
    let greenLetters = document.querySelectorAll(".green-letter").length;
    if (input.length > word.length && wordsCounter >= zeroSeconds) {
        --wordsCounter;
    }
    if (greenLetters === word.length) {
        ++wordsCounter;
    }
}

function handleKeyPress(event) {
    if (!endProgram) {
        if (event.key === "Enter" && userInputBar.value !== "") {
            countCorrectWords();
            printWordsCounter();
            deleteWords();
            getWords();
            startTheGame();
        }
    }
}

function getWords() {
    ++l;
    word = words[l];
    userInputBar.value = "";
}

function startTheGame() {
    if (!endProgram) {
        for (let i = 0; i < word.length; ++i) {
            let showWords = document.createElement("message");
            showWords.id = "messages" + i;
            showWords.innerHTML = word[i];
            printWords.appendChild(showWords);
        }
        revealWords.style.display = "none";
    }
}

function checkLetters() {
    let inputText = userInputBar.value;
    let correctLettersCount = 0;
    for (let i = 0; i < word.length; ++i) {
        let message = document.getElementById("messages" + i);

        if (word[i] === inputText[i]) {
            message.innerHTML = `<span class="green-letter">${inputText[i]}</span> `;
            ++correctLettersCount;
        }
        if (word[i] !== inputText[i]) {
            message.innerHTML = `<span class="red-letter">${word[i]}</span> `;
        }
        if (inputText.length <= i) {
            message.innerHTML = `<span>${word[i]}</span> `;
        }
    }
}

function deleteWords() {
    for (let i = 0; i < word.length; ++i) {
        let message = document.getElementById("messages" + i);
        printWords.removeChild(message);
    }
}

function printWordsCounter() {
    rightWords.innerHTML = "Correct words: " + wordsCounter;
}
