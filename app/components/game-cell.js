import Component from '@glimmer/component';

export default class GameCellComponent extends Component {
    get isBoySelected() {
        return this.args.isBoySelectable && this.args.selected;
    }

    get isGirlSelected() {
        return this.args.isGirlSelectable && this.args.selected;
    }
}