export function createStore(rootReducer, initialState = {}) {
	// state, action
	let state = rootReducer({...initialState}, {type: '__INIT__'});
	let listeners = [];
	return {
		subscribe(fn) {
			listeners.push(fn);
			// console.log(state, 'state');
			return {
				unsubscribe: () => {
					listeners = listeners.filter(listener => listener !== fn);
				}
			};
		},
		dispatch(action) {
			state = rootReducer(state, action);
			listeners.forEach(listener => listener(state));
		},
		getState() {
			return state;
		}
	};
}
