(function(){
const gameChoicesArray = ['paper', 'scissors', 'rock', 'lizard', 'spock'];
const rule = {
    'paper': ['rock', 'spock'],
    'lizard': ['spock', 'paper'],
    'rock': ['lizard', 'scissors'],
    'spock': ['scissors', 'rock'],
    'scissors': ['paper', 'lizard']
};

const gameContentElement = document.querySelector('.game-content');
const gameChoiceElements = document.querySelectorAll('.game-content__game-choice');
const countdownTextElement = document.querySelector('.game-content__countdown-text');
const gameChoiceComputerElement = document.querySelector('.game-content__game-choice-computer');
const gameChoiceImageElement = document.querySelector('.game-content__game-choice-image');

const showResult = (userChoice, computerChoice) => {
    const scoreNumberElement = document.querySelector('.header__score-number');
    const resultTextElement = document.querySelector('.game-content__result-text');
    const score = +(scoreNumberElement.textContent);

    if(userChoice === computerChoice) resultTextElement.textContent = 'Draw';

    if(rule[computerChoice].includes(userChoice)){
        resultTextElement.textContent = 'You lose';

        setTimeout(() => gameChoiceComputerElement
            .classList.add('game-content__game-choice_win'), 600);

        if(score > 0) scoreNumberElement.textContent = score - 1; 
    }

    if(rule[userChoice].includes(computerChoice)){
        resultTextElement.textContent = 'You win';

        setTimeout(() => 
            document.querySelector('.game-content__game-choice_active')
            .classList.add('game-content__game-choice_win'), 600);

        scoreNumberElement.textContent = score + 1;
    }
};

let countdown = 4;
let computerChoice = '';

const startCountdown = () => {
    countdownTextElement.textContent = countdown - 1;
    countdown --;

    if(countdown){
        setTimeout(() => startCountdown(), 600);
    } else {
        const selectedGameChoiceElement = document.querySelector('.game-content__game-choice_active');
        const selectedChoice = selectedGameChoiceElement.dataset.choice;
        computerChoice = gameChoicesArray[Math.floor(Math.random() * 5)];

        showResult(selectedChoice, computerChoice);
        setTimeout(() => gameContentElement.classList.add('game-content_reveal-result'), 300)

        countdownTextElement.textContent = '';
        gameChoiceComputerElement.classList.add(`game-content__game-choice_${computerChoice}`);
        gameChoiceImageElement.src = `images/icon-${computerChoice}.svg`;
        countdown = 4;
    }
}

const gameChoiceEvent = (evt) => {
    gameContentElement.classList.add('game-content_active');
    evt.target.classList.add('game-content__game-choice_active');
    
    startCountdown();
}

const playAgainEvent = () => {
    const activeChoiceElement = document.querySelector('.game-content__game-choice_active');
    gameChoiceElements.forEach(item => item.classList.remove('game-content__game-choice_win'));
    gameContentElement.classList.remove('game-content_reveal-result')
    gameChoiceComputerElement.classList.remove(`game-content__game-choice_${computerChoice}`);
    gameChoiceImageElement.src = '';
    gameContentElement.classList.remove('game-content_active', 'game-content_lost');
    activeChoiceElement.classList.remove('game-content__game-choice_active');
}

gameChoiceElements.forEach(item => item.addEventListener('click', gameChoiceEvent));

const resultBtnElement = document.querySelector('.game-content__result-button');
resultBtnElement.addEventListener('click', playAgainEvent);
})();