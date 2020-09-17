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

function toCell(row) {
    return function(_, index) {
        return `
            <div class="cell"
            contenteditable
            data-cell="${index}"
            data-id="${row}:${index}"
            data-type="cell"
            ></div>
       `;
    };
}

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="column"></div>
        </div> 
    `;
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

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar) // the same     map((el, index) => toChar(el, index)
        .map(toColumn) // the same   map(el => toColumn(el))
        .join('');

    rows.push(createRow(null, cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, index) => toCell(row, index))
            .map(toCell(row))
            .join('');
        rows.push(createRow(row + 1, cells));
    }
    return rows.join('');
}
