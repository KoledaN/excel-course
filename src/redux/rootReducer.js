import { CHANGE_STYLES, CHANGE_TEXT, TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
	let type;
	switch (action.type) {
		case TABLE_RESIZE:
			type = action.data.type === 'col' ? 'colState' : 'rowState';
			return {...state, [type]: value(type, state, action)}; // id,  value
		case CHANGE_TEXT:
			type = 'dataState';
			return {
				...state,
				currentText: action.data.value,
				[type]: value(type, state, action)
			};
		case CHANGE_STYLES:
			return {...state, currentStyles: action.data};
		default: return state;
	}
}

function value(type, state, action) {
	const prevState = state[type] || {};
	prevState[action.data.id] = action.data.value;
	return prevState;
}
