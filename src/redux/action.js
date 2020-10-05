const { TABLE_RESIZE } = require('./types');

// Action Creator
export function tableResize(data) {
	return {
		type: TABLE_RESIZE,
		data
	};
}
