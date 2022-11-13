class GameManager {
    gameBoard;
    /**
     * @type {{ target: HTMLElement, player: "red" | "yellow"}[][]} 
     * Matrix containing disc elements and the player that chose them
     */
    discs;
    /**
     * @type {"red" | "yellow"} A string representing the current player
     */
    playerTurn;
    isGameFinished;
    constructor () {
        this.playerTurn = "yellow";
        this.isGameFinished = false;

        this.gameBoard = document.getElementById("game-board");
        this.discs = [];
        
        for (let columnIndex = 5; columnIndex >= 0; columnIndex--) {
            this.discs[ columnIndex ] = [];

            for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
                const disc = document.createElement("div");
                disc.id = rowIndex + columnIndex * 7;
                disc.classList.add("disc");
                disc.onclick = this.handleClick;
                this.gameBoard.appendChild(disc);
                this.discs[columnIndex].push({target: disc, player: ''});
            }
        }
    }
    findEmptyRowByColumnIndex (columnIndex) {
        return this.discs.findIndex(discRow =>
        {
            console.log(discRow[columnIndex])
            return discRow[columnIndex].player === '';
        });
    }
    checkIfFourInARow (sequence) {
        let currentPlayerColorCounter = 0;

        return sequence.some(sequenceEl => {
            if (sequenceEl.player === this.playerTurn) {
                currentPlayerColorCounter++;
            } else {
                currentPlayerColorCounter = 0;
            }

            return currentPlayerColorCounter === 4;
        })
    }
    handleClick = ({ target: clickedDisc }) => {
        if (this.isGameFinished) return;

        const clickedDiscId = clickedDisc.id;
        console.log(clickedDiscId);

        const clickedDiscColumn = clickedDisc.id % 7;
        console.log(clickedDiscColumn);

        const emptyRowIndex = this.findEmptyRowByColumnIndex(clickedDiscColumn);
        console.log(emptyRowIndex);

        if (emptyRowIndex === -1) { 
            return;
        }

        const addedDisc = this.discs[ emptyRowIndex ][ clickedDiscColumn ];

        addedDisc.target.classList.add(`player-${ this.playerTurn }`);
        addedDisc.player = this.playerTurn;

        ////

        const currentRow = this.discs[emptyRowIndex];
        console.log(currentRow);

        const currentColumn = this.discs.map(row => row[ clickedDiscColumn ]);
        console.log(currentColumn);
        
        const isPlayerWinner = [ currentRow, currentColumn ].some(sequence => this.checkIfFourInARow(sequence));
        
        // const winnerRow = this.checkIfFourInARow(currentRow);
        // console.log(winnerRow, this.playerTurn);
        // const winnerColumn = this.checkIfFourInARow(currentColumn);
        // console.log(winnerColumn, this.playerTurn);

        if (isPlayerWinner) {
            this.isGameFinished = true;
            alert(this.playerTurn);
        }

        ////

        this.playerTurn = this.playerTurn === "yellow" ? "red" : "yellow";
    }
}

window.onload = e => {
    const gameManager = new GameManager();
};