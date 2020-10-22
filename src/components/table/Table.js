import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { isCell, matrix, nextSelector, shouldResize } from './table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import * as actions from '../../redux/action';
import { defaultStyles } from '../../constans';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		});
	}

	toHTML() {
		return createTable(20, this.store.getState());
	}

	prepare() {
		this.selection = new TableSelection();
	}

	init() {
		super.init();

		const $cell = this.$root.find('[data-id="0:0"');
		this.selectCell($cell);

		this.$on('formula:input', (data) => {
			this.selection.current.text(data);
			this.updateTextInStore(data);
		});

		this.$on('formula:done', () => {
			this.selection.current.focus();
		});

		this.$on('toolbar:applyStyle', style => {
			this.selection.applyStyle(style);
		});
	}

	selectCell($cell) {
		this.selection.select($cell);
		this.$emit('table:select', $cell);
		this.updateTextInStore($cell.text());
		const styles = $cell.getStyles(Object.keys(defaultStyles));
		this.$dispatch(actions.changeStyles(styles));
	}

	async resizeTable(event) {
		try {
			const data = await resizeHandler(this.$root, event);
			this.$dispatch(actions.tableResize(data)); // action
		} catch (e) {
			console.warn(e, 'resize error');
		}
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event);
		} else if (isCell(event)) {
			const $target = $(event.target);
			if (event.shiftKey) {
				const $cells = matrix(this.selection.current, $target)
					.map((id) => this.$root.find(`[data-id="${id}"]`));
				this.selection.selectGroup($cells);
			} else {
				this.selectCell($target);
			}
		}
	}

	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowDown',
			'ArrowUp'
		];
		const { key } = event;
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault();
			const id = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(key, id));
			this.selectCell($next);
		}
	}

	updateTextInStore(value) {
		this.$dispatch(actions.changeText({
			id: this.selection.current.id(),
			value
		}));
	}

	onInput(event) {
		// this.$emit('table:input', $(event.target));
		this.updateTextInStore($(event.target).text());
	}
}

