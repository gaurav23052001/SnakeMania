// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
let input2Dir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let score = 0;
let count = 0 
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        // musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play();
        score = 0;
    }
    

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        // foodSound.play();
        score += 1;

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;

        console.log(count)
        if (count === 3) {     
            console.log("eat")
            food = { x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y }
            count = 0
        }
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        count +=1;
       
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
        console.log(snakeArr[i])
    }

    
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    input2Dir = { ...inputDir };  



    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
// food = {y: 15, x: 13}
console.log(food.x, food.y)

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}



// Main logic starts here
// musicSound.play();


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    moveSound.play();
    let newInputDir = { ...inputDir };
    switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
            newInputDir.x = 0;
            newInputDir.y = -1;
            break;

        case "arrowdown":
        case "s":
            newInputDir.x = 0;
            newInputDir.y = 1;
            break;

        case "arrowleft":
        case "a":
            newInputDir.x = -1;
            newInputDir.y = 0;
            break;

        case "arrowright":
        case "d":
            newInputDir.x = 1;
            newInputDir.y = 0;
            break;

        default:
            break;
    }
    if (inputDir.x === -newInputDir.x && inputDir.y === -newInputDir.y) {

        snakeArr.reverse();

        inputDir = newInputDir;

    } else if (!(inputDir.x === newInputDir.x && inputDir.y === newInputDir.y)) {

        inputDir = newInputDir;

    }
});


