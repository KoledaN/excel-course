import {$} from '@core/dom';

export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = $.create('div', 'excel');
        this.components.forEach(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.innerHTML = component.toHTML();
            $root.append($el);
        });
        return $root;
    }

    render() {
        // console.log(this.$el);
        // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`);
        // this.$el.append(document.createElement('h1'));
        // const node = document.createElement('h1');
        // node.textContent = 'test';
        this.$el.append(this.getRoot());
    }
}
