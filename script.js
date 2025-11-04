const suits = ['♠️', '♥️', '♦️', '♣️'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];
let playerHand = [];
let dealerHand = [];

const playerCards = document.getElementById('player-cards');
const dealerCards = document.getElementById('dealer-cards');
const playerScore = document.getElementById('player-score');
const dealerScore = document.getElementById('dealer-score');
const message = document.getElementById('message');

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function startGame() {
    createDeck();
    shuffleDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    updateHands();
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
    document.getElementById('start-button').disabled = true;
    message.textContent = '';
}

function updateHands() {
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    for (let card of playerHand) {
        const img = document.createElement('img');
        img.src = `cartas/${card.value}${card.suit}.png`;
        img.classList.add('card');
        playerCards.appendChild(img);
    }
    for (let card of dealerHand) {
        const img = document.createElement('img');
        img.src = `cartas/${card.value}${card.suit}.png`;
        img.classList.add('card');
        dealerCards.appendChild(img);
    }
    playerScore.textContent = `Pontuação: ${calculateScore(playerHand)}`;
    dealerScore.textContent = `Pontuação: ${calculateScore(dealerHand)}`;
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    for (let card of hand) {
        if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else if (card.value === 'A') {
            aces += 1;
            score += 11;
        } else {
            score += parseInt(card.value);
        }
    }
    while (score > 21 && aces > 0) {
        score -= 10;
        aces -= 1;
    }
    return score;
}

function hit() {
    playerHand.push(deck.pop());
    updateHands();
    if (calculateScore(playerHand) > 21) {
        message.textContent = 'Você estourou! Dealer vence!';
        endGame();
    }
}

function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    updateHands();

    const player = calculateScore(playerHand);
    const dealer = calculateScore(dealerHand);

    if (dealer > 21 || player > dealer) {
        message.textContent = 'Você venceu!';
    } else if (player < dealer) {
        message.textContent = 'Dealer venceu!';
    } else {
        message.textContent = 'Empate!';
    }

    endGame();
}

function endGame() {
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    document.getElementById('start-button').disabled = false;
}
