import { $ } from '../../core/dom';
import { ActiveRoute } from './ActiveRoute';

export class Router {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in Router');
		}
		this.$placeholder = $(selector);
		this.routes = routes;

		this.changePageHandler = this.changePageHandler.bind(this);

		this.init();
	}

	init() {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	changePageHandler(event) {
		console.log(ActiveRoute.path, ActiveRoute.param);
		const Page = this.routes.excel;
		const page = new Page();
		console.log(page.getRoot());

		this.$placeholder.append(page.getRoot());
		page.afterRender();
	}

	destroy() {
		window.removeEventListener('hashchange', this.changePageHandler);
	}
}
