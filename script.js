//create array to hold data
let boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

// define game variables 
let player = 1;
let gameOver = false;
let gameStart = false;

// fetch two themes
let theme1 = document.querySelector("#theme1");
let theme2 = document.querySelector("#theme2");

let classOne, classTwo;


// create two events for two theme
theme1.addEventListener('click',()=>{
    if (gameStart == false){
        document.querySelector("#theme1").style.backgroundColor = "grey";
        document.querySelector("#theme2").style.backgroundColor = "rgb(180, 230, 227)";
        document.querySelector(".btn2").innerHTML = theme1.innerHTML;
        document.querySelector(".btn2").style.backgroundColor = "lightcoral";
        document.querySelector(".btn2").style.color = "white";
        
        classOne = "circle";
        classTwo =  "cross"
    } 
} )

theme2.addEventListener('click',()=>{
    if (gameStart == false){    
        document.querySelector("#theme2").style.backgroundColor = "grey";
        document.querySelector("#theme1").style.backgroundColor = "rgb(180, 230, 227)";
        document.querySelector(".btn2").innerHTML = theme2.innerHTML;
        document.querySelector(".btn2").style.backgroundColor = "lightcoral";
        document.querySelector(".btn2").style.color = "white";
        classOne = "hex";
        classTwo = "rectangles";
    }
} )


const cellElements = document.querySelectorAll(".cell");
// console.log(cellElements);

cellElements.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameOver && (classOne != undefined && classTwo != undefined)){
            placeMarker(index);
        }
    });
});


//create function for drawing player markers

const drawMarkers = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            //check if it is player 1's marker
            if (boardData[i][j] == 1) {
                cellElements[i * 3 + j].classList.add(classOne);
            }
            else if (boardData[i][j] == -1) {
                cellElements[i * 3 + j].classList.add(classTwo);
            }

        }
    }
}

//create a function to check the result

const checkResult = () => {
    for (let i = 0; i < 3; i++) {
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        if (rowSum == 3 || colSum == 3) {

            // console.log("player 1 wins")
            endGame(1);
            return
        }
        else if (rowSum == -3 || colSum == -3) {
            // console.log("player 2 wins");
            endGame(2);
            return

        }

        let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
        let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
        if (diagonalSum1 == 3 || diagonalSum2 == 3) {
            // console.log("pla, gameOveryer 1 wins")
            endGame(1);
            return
        }
        else if (diagonalSum1 == -3 || diagonalSum2 == -3) {
            // console.log("player 2 wins");
            endGame(2);
            return
        }

        //check tie
        if (boardData[0].indexOf(0) == -1 && boardData[1].indexOf(0) == -1 && boardData[2].indexOf(0) == -1) {
            // console.log("its a tie");
            endGame(0);
            return

        }
    }
}

//function to end the game and display the result 
const endGame = (winner) => {
    //trigger game over event
    gameStart = false;
    gameOver = true;
    let result = document.querySelector("#result");
    //check if game ended in a tie
    if (winner == 0) {
        result.innerHTML = "Its a Tie !!";
        // console.log("its a tie");
    }
    else {
        // console.log(`player ${winner} has won !!`)
        result.innerHTML = `player ${winner} has won !!`;

    }
}



//create function for placing markers 

const placeMarker = (index) => {
    // console.log(index)
    //determine row and column from the index
    let column = index % 3
    let row = (index - column) / 3
    gameStart = true;

    if (boardData[row][column] == 0 || gameOver == false || (classOne != undefined && classTwo != undefined)) {
        boardData[row][column] = player;

        // change player
        player *= -1;
        //update the screen with marksers
        drawMarkers();

        //check if anyone has won
        checkResult();
    } else {
        console.log(gameOver, boardData[row][column])
    }
}

const restartButton = document.querySelector("#btn1");

restartButton.addEventListener('click', () => {
    boardData = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    player = 1;
    gameOver = false;
    //reset game board
    cellElements.forEach((cell) => {
        cell.classList.remove("cross", "circle", "rectangles", "hex");
    })
    let result = document.querySelector("#result");
    result.innerHTML = "";
    classOne = undefined;
    classTwo = undefined;

    if (theme1.style.backgroundColor == "grey"){
        theme1.style.backgroundColor = "rgb(180, 230, 227)";
    }
    else{
        theme2.style.backgroundColor = "rgb(180, 230, 227)";
    }

    const btn2 = document.querySelector(".btn2")

    if (btn2.style.backgroundColor != "rgb(33, 227, 217)"){
        btn2.style.backgroundColor = "rgb(33, 227, 217)";
        btn2.style.color = "black";
        btn2.innerHTML = "Select a theme";
    }
});