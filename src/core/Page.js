export class Page {
    constructor(params) {
        this.params = params; // for Excel
    }

    getRoot() {
        throw new Error('Method "getRoot" should be implemented');
    }

    afterRender() {}

    destroy() {}
}
