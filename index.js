//Getting Computer Choice

function getComputerChoice(){
let computerChoice = Math.floor(Math.random() * 3); // gives 0, 1, or 2
if(computerChoice === 0){
return "rock";
} else if(computerChoice === 1){
return "paper";
} else {
return "scissors";
}
}

//Getting human Choice
/* For strict validation of human entries*/
/*function getHumanChoice() {
let choice;
do {
choice = prompt("Choose your move: rock, paper, or scissors", "rock");
if (!choice) continue; // if user clicks cancel or empty
choice = choice.toLowerCase();
} while (choice !== "rock" && choice !== "paper" && choice !== "scissors");
return choice;
}
*/

function getHumanChoice(){
const humanChoices = prompt("Choose your move: rock, paper, or scissors", "rock");
return humanChoices;

}



function playGame(){


// Declaring the players score variables

let humanScore = 0;
let computerScore = 0;

//Logic to play a single round


function playRound(humanChoice, computerChoice){
 humanChoice = humanChoice.toLowerCase();

if (humanChoice === computerChoice) {
return "It's a tie!";
}else if (
(humanChoice === "rock" && computerChoice === "scissors") ||
(humanChoice === "paper" && computerChoice === "rock") ||
(humanChoice === "scissors" && computerChoice === "paper")
) {
    humanScore++
    return `You win! ${humanChoice} beats ${computerChoice}`;
} else {
    computerScore++
    return `You lose! ${computerChoice} beats ${humanChoice}`;
}

}
/*
//To Use loop

for (let i = 0; i < 5; i++){
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    console.log(playRound(humanSelection, computerSelection));
    console.log(`Score so far -> Human: ${humanScore}, Computer: ${computerScore}`);
}

*/


console.log(playRound(getHumanChoice(),getComputerChoice()));
console.log(playRound(getHumanChoice(),getComputerChoice()));
console.log(playRound(getHumanChoice(),getComputerChoice()));
console.log(playRound(getHumanChoice(),getComputerChoice()));
console.log(playRound(getHumanChoice(),getComputerChoice()));
console.log(playRound(getHumanChoice(),getComputerChoice()));


 // Declare winner after 5 rounds
  if (humanScore > computerScore) {
    console.log(`Final Result: You win the game ${humanScore} to ${computerScore}!`);
  } else if (computerScore > humanScore) {
    console.log(`Final Result: Computer wins the game ${computerScore} to ${humanScore}!`);
  } else {
    console.log(`Final Result: It's a tie ${humanScore} to ${computerScore}!`);
  }
}

playGame(); // call once, it runs 5 rounds inside


