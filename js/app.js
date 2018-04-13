/*
 * Create a list that holds all of your cards
 */
const cards = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-anchor',
    'fa-bicycle',
    'fa-diamond',
    'fa-bomb',
    'fa-leaf',
    'fa-bomb',
    'fa-bolt',
    'fa-bicycle',
    'fa-paper-plane-o',
    'fa-cube'
];

/* a refence to the matched and shuffledCards.
 */

let openCards = [];
let matchedCards = [];
let shuffledCards = [];

let moves = 0;
let counter = document.querySelector(".moves");


// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");



let modal = document.querySelector(".modal");
let closeicon = document.querySelector(".close");

let pAgain = document.querySelector(".btn.playagain");
/* reference to all id's
 */
const deck = document.getElementById("deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function initGame() {

    /* shuffle the cards and assign them to shuffledCards
     */
    shuffledCards = shuffle(cards);



    for (let i = 0; i < shuffledCards.length; i++) {
        let liEl = document.createElement("li");
        liEl.classList.add("card");
        let iEl = document.createElement("i");
        iEl.classList.add("fa");
        iEl.classList.add(shuffledCards[i]);
        liEl.appendChild(iEl);
        deck.appendChild(liEl);
        liEl.addEventListener("click", turnCard);

    }
}
// reset moves
moves = 0;
counter.innerHTML = moves;
// reset rating
for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
}
//reset timer
second = 0;
minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
timer.innerHTML = "0 mins 0 secs";
clearInterval(interval);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* function to turn the cards,event target is li.card
    event is the clicked card.
*/



function turnCard(event) {

    /* add the class show to event.target.*/
    event.target.classList.add("show");

    /*remove the eventlistener to avoid doubleclik and fill the opencards array
    with to times te same card,when no match was fount the listener gets added again.*/
    event.target.removeEventListener("click", turnCard);

    checkCards(event);

}
/* function to check the cards and add them to the matched cards array of put the eventlistener back*/
function checkCards(event) {
    /*add the cards to the opencards array*/

    openCards.push(event.target.firstChild);

    /*Check opencards array*/
    if (openCards.length === 2) {
        moveCounter();

        if (openCards[0].className === openCards[1].className) {

          openCards[0].parentNode.classList.add('matched');
          openCards[1].parentNode.classList.add('matched');


            openCards = [];

            matchedCards.push(openCards[0]);
            matchedCards.push(openCards[1]);

        }
        if (matchedCards.length === 16) {
            winGame()
        }
    } else {
        setTimeout(function() {
            for (let i = 0; i < openCards.length; i++) {
                openCards[i].parentNode.addEventListener("click", turnCard);
            }
        }, 1000);
        setTimeout(removeOpenClass, 1000);
    }
}


/* reset moves*/

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first move
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 20) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 21) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// @description game timer
var second = 0,
    minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


function removeOpenClass() {
    for (let i = 0; i < openCards.length; i++) {
        openCards[i].parentNode.classList.remove("show");
    }
}

function winGame() {
    clearInterval(interval);
    modal.style.display = "block";

    let finalTime = document.querySelector(".timer").innerHTML;
    document.querySelector(".totalTime").innerHTML = finalTime;

    let starFinal = document.querySelector(".stars").innerHTML;
    document.querySelector(".totalRating").innerHTML = starFinal;

    let finalMove = document.querySelector(".moves").innerHTML;
    document.querySelector(".totalMoves").innerHTML = finalMove;
    closeModal();
    playAgain();

}

function closeModal() {
    closeicon.addEventListener("click", function(e) {
        modal.style.display = "none";

        initGame();
    });
}



    function playAgain() {
        pAgain.addEventListener("click", function(e) {
            modal.style.display = "none";
            initGame();
        });
        openCards = [];
    }

    initGame();
