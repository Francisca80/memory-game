/*
 * Create a list that holds all of your cards
 */
const cardArray= [
    "fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-anchor",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube"
  ];

/* een refentie naar de open en matched en shuffled kaarten.
*/

let openCards: [];
let matchedCards [];
let shuffledCards [];

/* refeentie naar alle ids
*/
const deck = create.getElementById('deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function initGame();
 shuffledCards = shuffle(cardArray);
 createDeck(shuffledCards);
}

function createDeck(shuffledCards){
  for(var i = 0;i ,shuffledCards.lenght;i++){
    let li = document.createElement('li');
    let i = document.createElement('i');
    i.classList.add('fa');
    i.classList.add(shuffledCards[i]);
    li.appendChild(i);
    deck.appendChild(li);

    li.addEventListener(click.turnCard);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

function turnCard(event){}


  initGame();  
/*Write a code which will add cards on page - you have exemplary code in HTML file,
 how this can looks like... You can use for this for example for loop and
  innerHTML method to add elements <li> for example to element <ul> in HTML file,
in which you will have your cards ... For example in <div> or <span> elements...
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
