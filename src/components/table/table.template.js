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

function toCell(row, colState) {
	return function(_, index) {
		const size = getWidth(colState, index);
		return `
					<div class="cell"
            contenteditable
            data-cell="${index}"
            data-id="${row}:${index}"
						data-type="cell"
						${size}
					></div>
       `;
	};
}

// function toColumn(col, index) {
// 	return `
//         <div class="column" data-type="resizable" data-col="${index}">
//             ${col}
//             <div class="col-resize" data-resize="column"></div>
//         </div>
//     `;
// }

function toColumn(colState) {
	return function(col, index) {
		const size = getWidth(colState, index);
		return `
					<div class="column" ${size} data-type="resizable" data-col="${index}">
							${col}
							<div class="col-resize" data-resize="column"></div>
					</div> 
			`;
	};
}

function createRow(index = '', content) {
	const resize = index
		? '<div class="row-resize" data-resize="row"></div>'
		: '';
	const resizable = index
		? 'data-type="resizable"'
		: '';
	return `
        <div class="row" ${resizable}>
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>    
            <div class="row-data">${content}</div>    
        </div>
    `;
}

function getWidth(colState, index) {
		return colState[index] ? `style="width: ${colState[index]}px"` : '';
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state = {}) {
	const {colState} = state;

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
			.map(toCell(row, colState))
			.join('');
		rows.push(createRow(row + 1, cells));
	}
	return rows.join('');
}
