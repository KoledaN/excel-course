import {
	APPLY_STYLE,
	CHANGE_STYLES,
	CHANGE_TEXT,
	CHANGE_TITLE,
	TABLE_RESIZE
} from './types';

export function rootReducer(state, action) {
	let type;
	let val;
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
		case APPLY_STYLE:
			type = 'stylesState';
			val = state[type] || {};
			action.data.ids.forEach(id => {
				val[id] = {...val[id], ...action.data.value};
			});
			return {
				...state,
				[type]: val,
				currentStyles: {...state.currentStyles, ...action.data.value}
			};
		case CHANGE_TITLE:
			return {
				...state,
				title: action.data
			};
		default: return state;
	}
}

function value(type, state, action) {
	const prevState = state[type] || {};
	prevState[action.data.id] = action.data.value;
	return prevState;
}
