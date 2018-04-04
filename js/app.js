/*
 * Create a list that holds all of your cards
 */
const cards =[
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

let moves= 0;
let counter = document.querySelector(".moves");

let timer=0;




/* reference to all id's
*/
const deck = document.getElementById('deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function initGame(){

  /* shuffle the cards and assign them to shuffledCards
  */
 shuffledCards = shuffle(cards);

 /* Call the createDeck function and add shuffledCards as a parameter
*/
 createDeck(shuffledCards);
}

/* function to create the deck
*/

function createDeck(shuffledCards){

  for(var i = 0;i <shuffledCards.length; i++){
    let liEl = document.createElement('li');
    liEl.classList.add('card');
    let iEl = document.createElement('i');
    iEl.classList.add('fa');
    iEl.classList.add(shuffledCards[i]);
    liEl.appendChild(iEl);
    deck.appendChild(liEl);

    liEl.addEventListener('click', turnCard)
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
}

/* function to turn the cards,event target is li.card
    event is the clicked card.
*/
function moveCounter(){
  moves++;
     counter.innerHTML= moves;
}

function turnCard(event){

  /* add the class show to event.target.*/
  event.target.classList.add('show');

  /*remove the eventlistener to avoid doubleclik and fill the opencards array
  with to times te same card,when no match was fount the listener gets added again.*/

  event.target.removeEventListener('click', turnCard);
  checkCards(event);

}
  /* function to check the cards and add them to the matched cards array of put the eventlistener back*/
  function checkCards(event) {
  /*add the cards to the opencards array*/

    openCards.push(event.target.firstChild);

  /*Check opencards array*/
    if (openCards.length === 2) {
   moveCounter();

      if (openCards[0].className === openCards[1].className){

        openCards[0].parentNode.classList.add('matched');
        openCards[1].parentNode.classList.add('matched');

        openCards = [];

      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);

        } else {
          setTimeout(function() {
            for (let i = 0; i < openCards.length; i++) {
              openCards[i].parentNode.addEventListener('click', turnCard);
            }
          }, 1000);

          setTimeout(removeOpenClass, 1000);
        }
    }
}


/*if (moves == 15){
  stars.removeChild (star3);
} else if (moves == 25){
  stars.removeChild (star2);
}
*/

function removeOpenClass() {
   for (let i = 0; i < openCards.length; i++) {
        openCards[i].parentNode.classList.remove('show');
    }


openCards = [];
}

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
