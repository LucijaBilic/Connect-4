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
            // console.log(discRow[columnIndex])
            return discRow[columnIndex].player === '';
        });
    }
    getRightDiagonal (emptyRowIndex, clickedDiscColumn) {
        let edgeRowPoint,
            edgeColumnPoint,
            lowerPoint,
            columnCounter,
            rowCounter,
            rightDiagonalDiscs = [];
        
        lowerPoint = (emptyRowIndex >= clickedDiscColumn) ? clickedDiscColumn : emptyRowIndex;
        
        edgeRowPoint = emptyRowIndex - lowerPoint;
        edgeColumnPoint = clickedDiscColumn - lowerPoint;
        // console.log(edgeRowPoint, edgeColumnPoint);

        columnCounter = edgeColumnPoint;
        rowCounter = edgeRowPoint;

        while (rowCounter <= 5 && columnCounter <= 6) {
                rightDiagonalDiscs.push(this.discs[ rowCounter ][ columnCounter ]);
                rowCounter++;
                columnCounter++;
            }
        // console.log("diagonal", rightDiagonalDiscs);

        return rightDiagonalDiscs;
    }
    getLeftDiagonal (emptyRowIndex, clickedDiscColumn) {
        let edgeRowPoint,
            edgeColumnPoint,
            sum,
            columnCounter,
            rowCounter,
            leftDiagonalDiscs = [];
        
        sum = emptyRowIndex + clickedDiscColumn;

        if (sum > 5) {
            edgeRowPoint = 5;
            edgeColumnPoint = sum - 5;
            // console.log(edgeRowPoint, edgeColumnPoint);
        } else {
            edgeRowPoint = sum;
            edgeColumnPoint = 0;
        }

        columnCounter = edgeColumnPoint;
        rowCounter = edgeRowPoint;

        while (rowCounter >= 0 && columnCounter <= 6) {
            leftDiagonalDiscs.push(this.discs[ rowCounter ][ columnCounter ]);
            rowCounter--;
            columnCounter++;
        };
        // console.log("left diagonal", leftDiagonalDiscs);

        return leftDiagonalDiscs;
    }
    checkIfFourInARow (sequence) {
        // console.log("sequence", sequence);
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
        // console.log("clickedDiscId", clickedDiscId);
        const clickedDiscColumn = clickedDisc.id % 7;
        // console.log("clickedDiscColumn", clickedDiscColumn);
        const emptyRowIndex = this.findEmptyRowByColumnIndex(clickedDiscColumn);
        // console.log("emptyRowIndex", emptyRowIndex);

        if (emptyRowIndex === -1) { 
            return;
        }

        const addedDisc = this.discs[ emptyRowIndex ][ clickedDiscColumn ];
        
        if (isPlayerWinner) {
            this.isGameFinished = true;
            alert(this.playerTurn);
        }

        addedDisc.target.classList.add(`player-${ this.playerTurn }`);
        addedDisc.player = this.playerTurn;

        const currentRow = this.discs[emptyRowIndex];
        // console.log("curent row: ", currentRow);
        const currentColumn = this.discs.map(row => row[ clickedDiscColumn ]);
        // console.log("curent column: ", currentColumn);

        const currentRightDiagonal = this.getRightDiagonal(emptyRowIndex, clickedDiscColumn);
        const currentLeftDiagonal = this.getLeftDiagonal(emptyRowIndex, clickedDiscColumn);
        
        const isPlayerWinner = [ currentRow, currentColumn, currentRightDiagonal, currentLeftDiagonal ].some(sequence => this.checkIfFourInARow(sequence));
        
        

        this.playerTurn = this.playerTurn === "yellow" ? "red" : "yellow";
    }
}

window.onload = e => {
    const gameManager = new GameManager();
};
