// let title = document.querySelector('h1');
// title.innerHTML = 'Secret Number Game';

// let paragraph = document.querySelector('p');
// paragraph.innerHTML = 'Choose a number between 1 and 10';
let listOfSecretNumber = [];
let limitNumber = 10;
let secretNumber = randomNumber();
let tries = 1;

function screenText(tag, text) {
    let fields = document.querySelector(tag);
    fields.innerHTML = text;
    responsiveVoice.speak(text, 'UK English Female', { rate: 1.2 }); //Not working.
}

function startingMessage() {
    screenText('h1', 'Secret Number Game');
    screenText('p', 'Choose a number between 1 and 10');
}

startingMessage();


function randomNumber() {
    let choosedNumber = Math.floor(Math.random() * limitNumber + 1);
    let secretNumberLength = listOfSecretNumber.length;

    if (secretNumberLength == limitNumber) {
        listOfSecretNumber = [];
    }

    if (listOfSecretNumber.includes(choosedNumber)) {
        return randomNumber();
    } else {
        listOfSecretNumber.push(choosedNumber);
        console.log(listOfSecretNumber);
        return choosedNumber;
    }
}



function verifyGuess() {
    let guess = document.querySelector('input').value;
    let textOfTry = tries > 1 ? 'tries' : 'try';
    let message = `You discovered the secret number with ${tries} ${textOfTry}`
    if (guess == secretNumber) {
        screenText('h1', 'That is right!');
        screenText('p', message);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            screenText('p', 'Not quite. The secret number is lower!');
        } else {
            screenText('p', 'Sorry but the secret number is bigger.');

        }
        tries++;
        cleaningInput();
    }

}

function cleaningInput() {
    guess = document.querySelector('input');
    guess.value = '';
}

function playAgain() {
    secretNumber = randomNumber();
    cleaningInput();
    tries = 1;
    startingMessage();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}