let newGameBtn = document.querySelector('.new-game')
let gameStatus = document.querySelector('.game-status')

let game = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'x'
let winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

newGameBtn.addEventListener('click', () => {
    game = ['', '', '', '', '', '', '', '', '']
    currentPlayer = 'x'
    for(let i = 0; i < 9; i++){
        let box = document.querySelector(`.cell${i}`)
        box.textContent = ''
        box.style.pointerEvents = 'all';
        box.style.backgroundColor = 'initial'
    }
    gameStatus.textContent = 'Game Status'
})

function initGame(){
    for(let i = 0; i < 9; i++){
        let box = document.querySelector(`.cell${i}`)

        box.addEventListener('click', ()=>{
            boxClicked(i, box)
        })
    }

    gameStatus.innerHTML = 'Game Status'
    gameStatus.classList.add('game-status')
}

function isPlayerWin(){
    let flag = false;
    winningPositions.forEach((position) => {
        if(game[position[0]] != '' && game[position[1]] != '' && game[position[0]] != ''){
            if(game[position[0]] == game[position[1]] && game[position[1]] == game[position[2]]){
                flag = true;
                
                gameStatus.textContent = `${currentPlayer.toUpperCase()} Wins`
                makeWinColors(position[0], position[1], position[2])
            }
        }
    })

    return flag;
}

function makeWinColors(x, y, z){
    let box1 = document.querySelector(`.cell${x}`)
    let box2 = document.querySelector(`.cell${y}`)
    let box3 = document.querySelector(`.cell${z}`)

    box1.style.backgroundColor = 'green'
    box2.style.backgroundColor = 'green'
    box3.style.backgroundColor = 'green'
}

function gameTie(){
    disableAllCells();
    gameStatus.textContent = 'Game Tie'
    
    for(let i = 0; i < 9; i++){
        let box = document.querySelector(`.cell${i}`)

        box.style.backgroundColor = 'red';
    }
}

function boxClicked(index, box){
    box.textContent = currentPlayer

    game[index] = currentPlayer;

    // check for win
    if(isPlayerWin()){
        // do something
        disableAllCells();
    }else{
        let counter = 0;
        for(cell of game){
            if(cell != ''){
                counter++;
            }
        }
    if(counter == 9){
        gameTie();
    }
    }

    if(currentPlayer === 'x'){
        currentPlayer = 'o'
    }
    else{
        currentPlayer = 'x'
    }

    box.style.pointerEvents = 'none';
}

function disableAllCells(){
    for(let i = 0; i < 9; i++){
        let box = document.querySelector(`.cell${i}`)

        box.style.pointerEvents = 'none';
    }
}

initGame();
