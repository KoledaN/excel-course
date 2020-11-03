import { ExcelComponent } from './ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
	constructor(...args) { // если придет больше параметров, чем ожидаем
		super(...args); // расширяет перебираемый объект (массив) в список арг-ов
	}

	get template() {
		return JSON.stringify(this.state, null, 2);
	}

	initState(initialState = {}) {
		this.state = {...initialState};
	}

	setState(newState) {
		this.state = {...this.state, ...newState};
		this.$root.html(this.template); // шаблон текущ комп-та, зависящего от state
	}
}
