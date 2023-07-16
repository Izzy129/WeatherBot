// rock paper scissors random choose and logic
function rps(choice) {
    const choices = ['rock', 'paper', 'scissors'];
    const random = choices[Math.floor(Math.random() * 3)];
   
    switch (random) {
        case 'rock':
            if (choice == random) return('I choose rock🪨 It\'s a Tie!');
            if (choice == 'paper') return('I choose rock🪨 You win!');
            if (choice == 'scissors') return('I choose rock🪨 I win!');
            break;
        case 'paper':
            if (choice == random) return('I choose paper📄 It\'s a Tie!');
            if (choice == 'rock') return('I choose paper📄 I win!');
            if (choice == 'scissors') return('I choose paper📄 You win!');
            break;
        case 'scissors':
            if (choice == random) return('I choose scissors✂️ It\'s a Tie!');
            if (choice == 'rock') return('I choose scissors✂️ You win!');
            if (choice == 'paper') return('I choose scissors✂️ I win!');
            break;
        default:
            return('Something went wrong.❌ Please try again.');
    }
}
module.exports = {rps};

