import { storage } from '../core/utils';

const defaultState = {
	rowState: {},
	colstate: {},
};

export const initialState = storage('excel-state')
	? storage('excel-state')
	: defaultState;
