import { defaultStyles } from '../../constans';
import { camelToDashCase } from '../../core/utils';

const CODES = {
	A: 65,
	Z: 90
};

// function toCell(row, index) {
//     return `
//         <div class="cell"
//         data-cell="${index}"
//         data-row="${row}"
//         contenteditable
//         ></div>
//     `;
// }

function toCell(row, state) {
	const {colState, dataState} = state;
	return function(_, index) {
		const styles = Object.keys(defaultStyles)
			.map(key => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
			.join('; ');
		const size = getParams(colState, index, 'width', styles);
		const text = dataState[`${row}:${index}`] || '';
		return `
					<div class="cell"
            contenteditable
            data-cell="${index}"
            data-id="${row}:${index}"
						data-type="cell"
						${size}
					>${text}</div>
       `;
	};
}

// function toColumn(col, index) {
// 	return `
//         <div class="column" data-type="resizable" data-col="${index}">
//             ${col}
//             <div class="col-resize" data-resize="col"></div>
//         </div>
//     `;
// }

function toColumn(colState) {
	return function(col, index) {
		const size = getParams(colState, index, 'width');
		return `
					<div class="column" ${size} data-type="resizable" data-col="${index}">
							${col}
							<div class="col-resize" data-resize="col"></div>
					</div> 
			`;
	};
}

function createRow(index = '', content, rowState = {}) {
	const size = getParams(rowState, index, 'height');
	const resize = index
		? '<div class="row-resize" data-resize="row"></div>'
		: '';
	const resizable = index
		? 'data-type="resizable"'
		: '';
	const row = index
		? `data-row="${index}"`
		: '';
	return `
        <div class="row" ${resizable} ${row} ${size}>
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>    
            <div class="row-data">${content}</div>    
        </div>
    `;
}

function getParams(colState = {}, index, param, styles = '') {
		return colState[index]
		?	`style="${param}: ${colState[index]}px; ${styles}"`
		: `style="${styles}"`;
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state = {}) {
	const {colState, rowState} = state;

	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar) // the same     map((el, index) => toChar(el, index)
		// .map(toColumn) // the same   map(el => toColumn(el))
		.map(toColumn(colState))
		.join('');

	rows.push(createRow(null, cols));

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			// .map((_, index) => toCell(row, index))
			.map(toCell(row, state))
			.join('');
		rows.push(createRow(row + 1, cells, rowState));
	}
	return rows.join('');
}
