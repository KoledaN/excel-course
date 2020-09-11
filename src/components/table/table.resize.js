import {$} from '@core/dom';

const OVERFLOW = {
    width: 0,
    height: 19
};

export function resizeHandler($root, event) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    let value;
    const prop = type === 'column' ? 'height' : 'width';

    $resizer.css({
        opacity: 1,
        [prop]: ($root.getCoords()[prop] - OVERFLOW[prop]) + 'px'
    });

    document.onmousemove = e => {
        e.preventDefault();
        if (type === 'column') {
            const delta = e.pageX - coords.right;
            value = coords.width + delta;
            $resizer.css({right: -delta + 'px'});
        } else {
            const delta = e.clientY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({bottom: -delta + 'px'});
        }
    };

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (type === 'column') {
            $parent.css({width: value + 'px'});
            $root.findAll(`[data-cell="${$parent.data.col}"`)
                .forEach(el => $(el).css({width: value + 'px'}));
        } else {
            $parent.css({height: value + 'px'});
        }
        $resizer.css({
            opacity: '',
            height: '',
            right: '',
            bottom: ''
        });
    };
}
