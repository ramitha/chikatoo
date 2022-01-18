import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GameCellComponent extends Component {
    get isBoySelected() {
        return this.args.isBoySelectable && this.args.selected;
    }

    get isGirlSelected() {
        return this.args.isGirlSelectable && this.args.selected;
    }
}