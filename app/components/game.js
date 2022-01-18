import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

const gameLetters = [
    ["R","E","V","E","A","L","L","R","Y","N","D","B","V","S","L","H","I","D","A","D","G"],
    ["L","S","C","Z","K","R","E","F","S","P","U","X","A","T","S","A","U","K","S","K","I"],
    ["B","M","O","M","H","A","P","C","X","M","L","N","E","Y","S","G","Y","O","B","H","R"],
    ["O","G","I","R","L","E","W","B","O","Y","U","N","O","H","F","I","A","H","U","G","X"],
    ["Y","W","G","I","X","L","B","A","C","T","R","M","G","A","A","R","Y","M","O","M","A"],
    ["B","O","I","X","Y","O","L","B","U","K","E","Y","O","P","W","L","R","U","N","O","P"],
    ["D","A","D","B","O","I","X","L","L","R","I","G","H","P","X","S","E","M","O","M","B"],
    ["V","S","L","H","I","C","A","N","A","N","X","O","X","Y","I","U","D","U","K","O","O"],
    ["T","A","N","A","L","M","N","R","E","V","E","A","L","B","G","A","C","A","I","O","Y"],
    ["B","H","U","G","R","O","I","G","I","R","L","D","M","A","I","H","K","S","K","F","M"],
    ["O","U","N","O","I","M","L","B","O","X","L","A","O","B","R","F","D","S","C","A","O"],
    ["Y","E","W","O","G","F","I","M","D","M","E","D","M","Y","S","M","S","K","R","W","M"],
    ["X","O","X","D","H","E","L","L","O","T","H","E","R","E","C","E","U","O","A","X","G"],
    ["U","K","O","E","T","N","O","L","R","I","G","H","M","M","U","Y","P","P","L","I","I"],
    ["O","N","U","R","O","C","Z","K","F","S","P","W","O","E","T","O","S","D","G","G","R"],
    ["Y","O","B","Y","B","A","C","T","Y","P","L","G","M","U","E","B","A","G","A","I","L"],
    ["D","A","D","A","V","S","L","H","I","M","D","M","S","S","N","A","N","A","C","R","C"],
    ["R","E","V","E","A","L","B","O","Y","O","A","E","U","G","H","A","P","T","B","O","P"],
    ["B","O","I","X","Y","O","L","B","H","M","D","W","P","I","D","O","K","Y","O","P","E"],
    ["W","G","I","X","L","E","W","G","I","R","L","S","S","R","L","O","V","E","Y","S","T"],
    ["E","W","B","O","Y","O","C","Z","K","F","S","P","W","L","E","R","E","N","L","E","R"]
];

class Cell {
    constructor (value = undefined, isBoySelectable = false, isGirlSelectable = false) {
        this.value = value;
        this.isBoySelectable = isBoySelectable;
        this.isGirlSelectable = isGirlSelectable;
        this.selected = false;
    }
}

const boyCells = [
    [2,0],[3,0],[4,0],
    [3,7],[3,8],[3,9],
    [2,18],[2,17],[2,16],
    [6,20],[7,20],[8,20],
    [9,0],[10,0],[11,0],
    [15,2],[15,1],[15,0],
    [17,6],[17,7],[17,8],
    [15,15],[14,15],[13,15],
    [17,18],[18,18],[19,18],
    [20,2],[20,3],[20,4]
]

const girlCells = [
    [3,1],[3,2],[3,3],[3,4],
    [2,15],[3,15],[4,15],[5,15],
    [6,11],[6,10],[6,9],[6,8],
    [11,4],[10,4],[9,4],[8,4],
    [9,7],[9,8],[9,9],[9,10],
    [13,10],[13,9],[13,8],[13,7],
    [12,20],[13,20],[14,20],[15,20],
    [19,7],[19,8],[19,9],[19,10],
    [17,13],[18,13],[19,13],[20,13]
]


export default class GameCellComponent extends Component {
    constructor(owner, args) {
        super(owner, args);
        this.game = new Array();
        for (let row=0; row<21; row++) {
            let rowArray = new Array()
            for (let col=0; col<21; col++) {
                rowArray.push(new Cell(
                    gameLetters[row][col], 
                    (boyCells.find(cell => cell[0] === row && cell[1]===col) ? true : false), 
                    (girlCells.find(cell => cell[0] === row && cell[1]===col)) ? true : false));
            }
            this.game[row] = rowArray;
        }
    }
    
    @tracked beginSelecting = false;

    @tracked gameOver = false;

    get gameOverClass() {
        return this.gameOver ? 'victory' : '';
    }

    @action
    validateGame() {
        for (let row of this.game) {
            for (let item of row) {
                if (item.isBoySelectable === true && item.selected === false) {
                    return false;
                }
            };
        };
        this.beginSelecting = false;
        this.gameOver = true;
    }

    @action
    selectCell(row, column) {
        // console.log('select cell called');
        set(this.game[row][column], 'selected', !this.game[row][column].selected);
        this.validateGame();
    }

    @action
    selectStart(row, column) {
        this.beginSelecting = true;
        this.selectCell(row, column)
        // console.log(`${row},${column} select start`);
    }

    @action
    selecting(row, column) {
        if (this.beginSelecting) {
            this.selectCell(row, column)
            // console.log(`${row},${column} selecting`);
        }
    }

    @action
    selectStop(row, column) {
        this.beginSelecting = false;
    }
}