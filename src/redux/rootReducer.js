import { CHANGE_TEXT, TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
	let prevState;
	let type;
	// console.log(action, 'action');
	switch (action.type) {
		case TABLE_RESIZE:
			type = action.data.type === 'col' ? 'colState' : 'rowState';
			prevState = state[type] || {};
			prevState[action.data.id] = action.data.value;
			return {...state, [type]: prevState}; // id,  value
		case CHANGE_TEXT:
			prevState = state['dataState'] || {};
			prevState[action.data.id] = action.data.value;
			return {...state, currentText: action.data.value, dataState: prevState};
		default: return state;
	}
}
