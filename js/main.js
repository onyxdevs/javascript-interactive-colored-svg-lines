/*
 * Nugget Name: JavaScript interactive experience SVG colored lines interact with mousemove (taken from bezier.method.ac)
 * Nugget URL: #
 * Author: Obada Qawwas
 * Author URL: http://www.onyxdev.net/
 * Version: 1.0
 */

(function () {
    var dom = {};

    dom.playground = document.getElementById('playground');

    var docFrag = document.createDocumentFragment(),
        svgns = 'http://www.w3.org/2000/svg',
        spacing = 10, // Spaces between lines
        nodes = 30, // Number of lines
        segments = [],
        svg = dom.playground,
        width = window.innerWidth,
        height = window.innerHeight,
        pt = svg.createSVGPoint(),
        paths = [];

    for (var i = 0; i < nodes; i++) {
        var path = document.createElementNS(svgns, 'path'),
            color = HUSL.toHex((360 / nodes) * i, 100, 60),
            y = i * spacing;

        path.setAttribute(
            'd',
            'M ' +
                0 +
                ' ' +
                y +
                ' ' +
                'C ' +
                width / 2 +
                ' ' +
                height / 4 +
                ' ' +
                width / 2 +
                ' ' +
                height / 4 +
                ' ' +
                width +
                ' ' +
                y +
                ' '
        );

        if (i === 10) middle = path;

        path.setAttribute('stroke', color);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-width', 3); // Line width
        paths.push(path);
        segments.push(path.pathSegList.getItem(1));
        docFrag.appendChild(path);
    }

    var g = document.createElementNS(svgns, 'g');

    g.setAttribute('transform', 'translate(0, ' + height / 3.5 + ')');
    g.appendChild(docFrag);
    svg.appendChild(g);

    svg.addEventListener('mousemove', move);
    svg.addEventListener('mouseleave', end);
    svg.addEventListener('touchmove', move);
    svg.addEventListener('touchend', end);

    function move(e) {
        var pt = cursorPoint(e);
        segments.forEach(function (segment, i) {
            segment.x1 = Math.abs(pt.x - width);
            segment.y1 = Math.abs(pt.y - height / 2);
            segment.x2 = pt.x;
            segment.y2 = pt.y;
        });
    }

    function end(e) {
        segments.forEach(function (segment, i) {
            TweenMax.to(segment, 0.5, {
                x1: width / 2,
                y1: height / 4,
                x2: width / 2,
                y2: height / 4,
                ease: Bounce.easeOut
            });
        });
    }

    function cursorPoint(e) {
        pt.x = e.clientX;
        pt.y = e.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
    }

    window.addEventListener('resize', function (e) {
        height = window.innerHeight;
        width = window.innerWidth;
        segments.forEach(function (segment, i) {
            segment.x = width;
            segment.x1 = width / 2;
            segment.y1 = height / 4;
            segment.x2 = width / 2;
            segment.y2 = height / 4;
        });
    });
})();
