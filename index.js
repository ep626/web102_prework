/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for(let i = 0; i < games.length; i++){
        let game = games[i]

        let gameCard = document.createElement('div')
        gameCard.classList.add('game-card')

        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Game Backers: ${game.backers}</p>
        `;
        gamesContainer.appendChild(gameCard);
    }
}
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const totalBackers = GAMES_JSON.reduce( (acc, games) => {
    return acc + games.backers;
}, 0);
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.textContent = (totalBackers.toLocaleString('en-US'));

// set the inner HTML using a template literal and toLocaleString to get a number with commas


const totalRaised = GAMES_JSON.reduce( (acc, games) => {
    return acc + games.pledged;
}, 0);
const raisedCard = document.getElementById("total-raised");
raisedCard.textContent = '$' + (totalRaised.toLocaleString('en-US'));

//Total Games
const gamesCard = document.getElementById("num-games");
const numOfGames = GAMES_JSON.length;
gamesCard.textContent = (numOfGames.toLocaleString('en-US'));

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let unfundedGames = GAMES_JSON.filter((games) =>{
        return games.pledged < games.goal;
    });
    addGamesToPage(unfundedGames);
}
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let fundedGames = GAMES_JSON.filter((games) => {
        return games.pledged >= games.goal;
    });
    addGamesToPage(fundedGames)
}
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
document.addEventListener('DOMContentLoaded', () => {
    unfundedBtn.addEventListener('click', filterUnfundedOnly);
    fundedBtn.addEventListener('click', filterFundedOnly);
    allBtn.addEventListener('click', showAllGames);
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");
const unfundedGames = GAMES_JSON.filter((games) =>{
    return games.pledged < games.goal;
});
const amountUnfunded = unfundedGames.length;

let fundingCard = document.createElement('div')

fundingCard.innerHTML = `
    <div>
    <p>A total of $${(totalRaised.toLocaleString('en-US'))} has been raised for  ${(numOfGames.toLocaleString('en-US'))}  games. Currently,  
    ${(amountUnfunded.toLocaleString('en-US'))}  ${(amountUnfunded === 1 ? ' game remains' : ' games remain')} unfunded. We need your help to fund these amazing games!</p>
    </div>
`;
descriptionContainer.appendChild(fundingCard);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const {name} = sortedGames[0]; //Deconstructing
let firstCard = document.createElement('div')
firstCard.innerHTML = `
    <div>
    <p>${name}</p>  
    </div>
`;
firstGameContainer.appendChild(firstCard);

//Starting the Second Place Container
const [_, secondGame] = sortedGames; //Spread
let secondCard = document.createElement('div')
secondCard.innerHTML = `
    <div>
    <p>${secondGame.name}</p>  
    </div>
`;
secondGameContainer.appendChild(secondCard);