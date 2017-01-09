onmessage = function(e) {
    postMessage(imageProcess(e.data));
}

function imageProcess(data) {
    var filter = data.filter;
    var pixel = data.pixel;

    switch (filter) {
        case 'grayscale':
            grayscale(pixel.data);
            break;
        case 'sepia':
            sepia(pixel.data);
            break;
        case 'invert':
            invert(pixel.data);
            break;
        case 'Opacity':
            Opacity(pixel.data, .5);
            break;
        case 'enhance':
            enhance(pixel.data);
            break;
        case 'luminance':
            luminance(pixel.data);
            break;
        case 'darken':
            darken(pixel.data, 50);
            break;
        case 'threshold':
            threshold(pixel.data);
            break;
    }

    function grayscale(pix) {
        for (var i = 0, n = pix.length; i < n; i += 4) {
            var grayscale = pix[i] * .29 + pix[i + 1] * .58 + pix[i + 2] * .11;
            pix[i] = grayscale;
            pix[i + 1] = grayscale;
            pix[i + 2] = grayscale;
        };
    };

    function sepia(pix) {
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i] = pix[i] * 1.07;
            pix[i + 1] = pix[i + 1] * .74;
            pix[i + 2] = pix[i + 2] * .43;
        }
    }

    function invert(pix) {
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i] = 255 - pix[i];
            pix[i + 1] = 255 - pix[i + 1];
            pix[i + 2] = 255 - pix[i + 2];
        }
    }

    function Opacity(pix, value) {
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i + 3] = pix[i + 3] * value;
        }
    }

    function enhance(pix) {
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i] = pix[i] * 1.24;
            pix[i + 1] = pix[i + 1] * 1.33;
            pix[i + 2] = pix[i + 2] * 1.21;
        };
    }

    function luminance(pix) {
        for (var i = 0, n = pix.length; i < n; i += 4) {
            var luminance = pix[i] * 0.2126 + pix[i + 1] * 0.7152 + pix[i + 2] * 0.0722;
            pix[i] = luminance;
            pix[i + 1] = luminance;
            pix[i + 2] = luminance;
        }
    }

    function darken(pix, value) {
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i] -= value;
            pix[i + 1] -= value;
            pix[i + 2] -= value;
        }
    }

    function threshold(pix) {
        var
            red,
            green,
            blue,
            value,
            new_value,
            threshold;
        for (var i = 0, len = pix.length; i < len; i += 4) {
            red = pix[i];
            green = pix[i + 1];
            blue = pix[i + 2];
            threshold = (red * .29 + green * .58 + blue * .11); // threshold
            value = (red + green + blue) * .33; // average
            new_value = (threshold >= value) ? 255 : 0; // black or white
            pix[i] = new_value;
            pix[i + 1] = new_value;
            pix[i + 2] = new_value;
        }
    }
    
    return pixel
}
