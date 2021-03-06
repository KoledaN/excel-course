import {$} from '@core/dom';

const OVERFLOW = {
	width: 0,
	height: 19
};

const MINPARAMS = {
	width: 40,
	height: 20
};

export function resizeHandler($root, event) {
	return new Promise(resolve => {
		const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    let value;
    const prop = type === 'col' ? 'height' : 'width';

    $resizer.css({
			opacity: 1,
			[prop]: ($root.getCoords()[prop] - OVERFLOW[prop]) + 'px'
    });

    document.onmousemove = e => {
			e.preventDefault();
			if (type === 'col') {
				const delta = e.pageX - coords.right;
				value = coords.width + delta;
				$resizer.css({right: -delta + 'px'});
			} else {
				const delta = e.clientY - coords.bottom;
				value = coords.height + delta;
				$resizer.css({bottom: -delta + 'px'});
			}
    };

    document.onmouseup = (e) => {
			e.preventDefault();
			document.onmousemove = null;
			document.onmouseup = null;
			if (type === 'col') {
				value = value >= MINPARAMS.width ? value : MINPARAMS.width;
				$parent.css({width: value + 'px'});
				$root.findAll(`[data-cell="${$parent.data.col}"`)
					.forEach(el => $(el).css({width: value + 'px'}));
			} else {
				value = value >= MINPARAMS.height ? value : MINPARAMS.height;
				$parent.css({height: value + 'px'});
			}
			resolve({
				id: $parent.data[type],
				value: value,
				type
			});
			$resizer.css({
				opacity: '',
				height: '',
				width: '',
				right: '',
				bottom: ''
			});
    };
	});
}
