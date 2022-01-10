import Component from '@glimmer/component';
import {TrackedArray} from 'tracked-built-ins';
import { action, set } from '@ember/object';

export default class GameCellComponent extends Component {
  gameLetters = new TrackedArray([
      [{value: 'B', selected: false}, {value: 'O', selected: false}],
      [{value: 'B', selected: false}, {value: 'O', selected: false}]
    ]);

  @action 
  selectCell(row, column) {
      console.log(`${row},${column} cell is selected`);
      set(this.gameLetters[row][column], 'selected', true);
  }
}