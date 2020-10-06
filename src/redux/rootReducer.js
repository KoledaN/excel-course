import { TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
	let prevState;
	let type;
	switch (action.type) {
		case TABLE_RESIZE:
			type = action.data.type === 'col' ? 'colState' : 'rowState';
			prevState = state[type] || {};
			prevState[action.data.id] = action.data.value;
			return {...state, [type]: prevState}; // id,  value
		default: return state;
	}
}
