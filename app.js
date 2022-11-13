class GameManager {
    gameBoard;
    discs;
    /**
     * @type {"red" | "yellow"} A string representing the current player
     */
    playerTurn;
    constructor () {
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

        this.playerTurn = "yellow";
    }
    findEmptyRowByColumnIndex (columnIndex) {
        return this.discs.findIndex(discRow =>
        {
            console.log(discRow[columnIndex])
            return discRow[columnIndex].player === '';
        });
    }
    handleClick = ({ target: clickedDisc }) => {
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

        this.playerTurn = this.playerTurn === "yellow" ? "red" : "yellow";
    }
}

window.onload = e => {
    const gameManager = new GameManager();
};