/*
 * Create a list that holds all of your cards
 */
const cardsAll = [
    {
        id: 1,
        name: 'mew',
        img: "img/001-mew.png"
    },
    {
        id: 2,
        name: 'pokeball',
        img:  "img/002-pokeball.png"
    },

    {   id:3,
        name:'charmander',
        img: "img/003-charmander.png"
    },

    {   id:4,
        name: 'bullbasaur',
        img: "img/004-bullbasaur.png"
    },
    {   id:5,
        name:'squirtle',
        img: "img/005-squirtle.png"
    },
    {   id:6,
        name:'eevee',
        img: "img/006-eevee.png"
    },
    {   id:7,
        name:'snorlax',
        img:"img/007-snorlax.png"
    },
    {   id:8,
        name: 'pikachu',
        img:"img/008-pikachu.png"
    }
]; 

//create pairs

const cards = cardsAll
    .concat(cardsAll);


/* a refence to the matched and shuffledCards.
 */

let openCards = [];
let matchedCards = document.getElementsByClassName("card open show matched");


let moves = 0;
let counter = document.querySelector(".moves");

let pairs= [];
let matches = 0;
let pairedCards = document.getElementsByClassName("card open show match");
const stars = document.querySelectorAll(".fa-star");

let modal = document.querySelector(".modal");
let closeicon = document.querySelector(".close");

let pAgain = document.querySelector(".btn.playagain");

const deck = document.querySelector(".deck");//deck element with all the acrads
const card = document.querySelectorAll(".card"); //card element


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


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
    createDeck();
    return array;
}
shuffle(cards);

/* function to create the deck
 */
function createDeck() {

    for (let i = 0; i < card.length; i++) {
        card[i].children.item(0).src = cards[i].img;
        card[i].dataset.id =cards[i].id;
    }
}

function turnCard(event) {
    if (!event.target.classList.contains('card')) return; // If the target isn't a card, stop the function

    if (openCards.length < 2) {
        event.target.classList.add("open", "show");
        openCards.push(event.target);
    }
    if (openCards.length == 2) {
        deck.removeEventListener('click', turnCard); // to stop from further clicking on cards until animation is finished
        checkMatch(openCards[0], openCards[1]);
    }

}
    /* add the class show to event.target.*/
  //  event.target.classList.add("show");

    /*remove the eventlistener to avoid doubleclik and fill the opencards array
    with to times te same card,when no match was fount the listener gets added again.*/
  //  event.target.removeEventListener("click", turnCard);

  //  checkCards(event);

//}
/* *** *** MATCH & UNMATCH COMPARISON *** *** */

function checkMatch(a, b) {
    setTimeout(function () {
        if (a.dataset.id == b.dataset.id) {
            //* if the cards match *//
            openCards[0].classList.add("matched");
            openCards[1].classList.add("matched");
            pairs.push(openCards[0]);
            pairs.push(openCards[1]);
            countPairs();
            if (++matches == 8) {
                setTimeout(winGame(), 500);
            }
        } else {
            openCards[0].classList.remove("open", "show");
            openCards[1].classList.remove("open", "show");
        }
        openCards = [];
        deck.addEventListener('click', turnCard)
    }, 750);
    moveCounter();
}
/* *** *** REMOVE MATCH*** *** */
//removes all classes with open show match
function removeMatch() {
    for (i = 0; i < cards.length; i++) {
        card[i].classList.remove("open", "show", "matched");
    }
    matches = 0;
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

/* *** *** PAIRS COUNT *** *** */
const pairsNo = document.querySelector(".pairs"); // span elemet which displays number of pairs

function countPairs() {
    //update pairs
    let pairsCount = pairs.length / 2;
    pairsNo.innerText = pairsCount;
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

}



// Event listener -> on click on deck, flip card
deck.addEventListener('click', turnCard);