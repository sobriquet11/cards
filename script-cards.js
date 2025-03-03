let cardCount = 1;
const maxCards = 4;

// Function to flip and expand card
function handleCardClick(card) {
    card.classList.toggle('flipped');

    const buttonContainer = document.querySelector('.button-container');
    if (card.classList.contains('flipped')) {
        buttonContainer.style.transform = 'translateX(-50px)';
        buttonContainer.style.opacity = '0';
        buttonContainer.style.pointerEvents = 'none';
    } else {
        buttonContainer.style.transform = 'translateX(0)';
        buttonContainer.style.opacity = '1';
        buttonContainer.style.pointerEvents = 'all';
    }
}

// Function to close the expanded card
function handleCloseButtonClick(card) {
    card.classList.remove('flipped');
    document.querySelector('.button-container').style.transform = 'translateX(0)';
    document.querySelector('.button-container').style.opacity = '1';
    document.querySelector('.button-container').style.pointerEvents = 'all';
}

// Function to update button states
function updateButtons() {
    document.getElementById('backButton').disabled = cardCount === 1;
    document.getElementById('nextButton').disabled = cardCount === maxCards;
}

// Add event listeners for existing cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(event) {
        if (!event.target.classList.contains('closeButton')) {
            handleCardClick(card);
        }
    });

    card.querySelector('.closeButton').addEventListener('click', function(event) {
        event.stopPropagation();
        handleCloseButtonClick(card);
    });
});

// "Next" button click event
document.getElementById('nextButton').addEventListener('click', function() {
    if (cardCount >= maxCards) return;

    // Create a new card
    const newCard = document.createElement('div');
    newCard.classList.add('card', 'new-card'); // Add slide-in animation class
    newCard.innerHTML = `
        <div class="front">
            <h1>Card ${cardCount + 1}</h1>
        </div>
        <div class="back">
            <h1>Full Screen Content</h1>
            <p>This is the content for Card ${cardCount + 1}.</p>
            <button class="closeButton">Close</button>
        </div>
    `;

    // Add the new card to the container
    document.querySelector('.card-container').appendChild(newCard);

    // Tilt previous card
    const previousCard = document.querySelector('.card:not(.tilted)');
    if (previousCard) {
        previousCard.classList.add('tilted');
    }

    // Add event listeners to new card
    newCard.addEventListener('click', function(event) {
        if (!event.target.classList.contains('closeButton')) {
            handleCardClick(newCard);
        }
    });

    newCard.querySelector('.closeButton').addEventListener('click', function(event) {
        event.stopPropagation();
        handleCloseButtonClick(newCard);
    });

    // Increase card count
    cardCount++;
    updateButtons();
});

// "Back" button click event
document.getElementById('backButton').addEventListener('click', function() {
    if (cardCount <= 1) return; // Prevent going back below 1 card

    // Get all cards
    const cards = document.querySelectorAll('.card');
    const lastCard = cards[cards.length - 1];

    // Remove the last card
    if (lastCard) {
        lastCard.remove();
        cardCount--; // Reduce count
    }

    // Find the new top card and remove its "tilted" effect
    const newTopCard = document.querySelector('.card.tilted');
    if (newTopCard) {
        newTopCard.classList.remove('tilted');
    }

    // Update buttons
    updateButtons();
});

// Add event listener to the Eye Button
document.getElementById('eyeButton').addEventListener('click', function() {
    const cards = document.querySelectorAll('.card');
    const topCard = cards[cards.length - 1];

    if (topCard) {
        handleCardClick(topCard); // Flip the topmost card
    }
});

// Initialize buttons
updateButtons();