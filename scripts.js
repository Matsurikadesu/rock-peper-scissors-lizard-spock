(function(){
    const gameChoicesArray = ['paper', 'scissors', 'rock', 'lizard', 'spock'];
    const rule = {
        'paper': ['rock', 'spock'],
        'lizard': ['spock', 'paper'],
        'rock': ['lizard', 'scissors'],
        'spock': ['scissors', 'rock'],
        'scissors': ['paper', 'lizard']
    };

    const rulesElement = document.querySelector('.rules');;
    const modalElement = document.querySelector('.modal-container');
    const closeElement = document.querySelector('.modal__close-button');
    const gameContentElement = document.querySelector('.game-content');
    const gameChoiceElements = document.querySelectorAll('.game-content__game-choice');
    const scoreNumberElement = document.querySelector('.header__score-number');
    const resultTextElement = document.querySelector('.game-content__result-text');
    const countdownTextElement = document.querySelector('.game-content__countdown-text');
    const gameChoiceComputerElement = document.querySelector('.game-content__game-choice-computer');
    const gameChoiceImageElement = document.querySelector('.game-content__game-choice-image');
    const resultBtnElement = document.querySelector('.game-content__result-button');

    let countdown = 4;
    let randomResult = '';

    const rulesClickHandler = () => modalElement.classList.toggle('active');
    const getRandomNumber = () => Math.floor(Math.random() * 5);

    const showResult = (userChoice, computerChoice) => {
        const score = +(scoreNumberElement.textContent);

        if(userChoice === computerChoice){
            resultTextElement.textContent = 'Draw';
        }else if(rule[computerChoice].includes(userChoice)){
            resultTextElement.textContent = 'You lose';
            setTimeout(() => gameChoiceComputerElement.classList.add('game-content__game-choice_win'), 600);

            if(score > 0){
                scoreNumberElement.textContent = score - 1; 
            }
        }else{
            resultTextElement.textContent = 'You win';
            setTimeout(() => document.querySelector('.game-content__game-choice_active').classList.add('game-content__game-choice_win'), 600);
            scoreNumberElement.textContent = score + 1;
        }
    };

    const startCountdown = () => {
        countdownTextElement.textContent = countdown - 1;
        countdown --;
        if(countdown){
            setTimeout(() => startCountdown(), 600);
        }else{
            const selectedGameChoiceElement = document.querySelector('.game-content__game-choice_active');
            const selectedChoice = selectedGameChoiceElement.dataset.choice;
            randomResult = gameChoicesArray[getRandomNumber()];

            showResult(selectedChoice, randomResult);
            setTimeout(() => gameContentElement.classList.add('game-content_reveal-result'), 300)

            countdownTextElement.textContent = '';
            gameChoiceComputerElement.classList.add(`game-content__game-choice_${randomResult}`);
            gameChoiceImageElement.src = `images/icon-${randomResult}.svg`;
            countdown = 4;
        }
    }

    const gameChoiceEvent = (evt) => {
        gameContentElement.classList.add('game-content_active');
        evt.target.classList.add('game-content__game-choice_active')
        
        startCountdown();
    }

    const playAgainEvent = () => {
        const activeChoiceElement = document.querySelector('.game-content__game-choice_active');
        gameChoiceElements.forEach(item => item.classList.remove('game-content__game-choice_win'));
        gameContentElement.classList.remove('game-content_reveal-result')
        gameChoiceComputerElement.classList.remove(`game-content__game-choice_${randomResult}`);
        gameChoiceImageElement.src = '';
        gameContentElement.classList.remove('game-content_active', 'game-content_lost');
        activeChoiceElement.classList.remove('game-content__game-choice_active');
    }

    rulesElement.addEventListener('click', rulesClickHandler);
    closeElement.addEventListener('click', rulesClickHandler);
    modalElement.addEventListener('click', function(evt){
        if(evt.target === modalElement) rulesClickHandler();
    })

    gameChoiceElements.forEach(item => item.addEventListener('click', gameChoiceEvent));
    resultBtnElement.addEventListener('click', playAgainEvent);
})();