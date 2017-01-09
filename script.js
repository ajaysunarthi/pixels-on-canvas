Array.prototype.forEach.call(document.querySelectorAll('.i'), function(Elm) {
    process(Elm);
});

function process(imgEl) {
    //processing
    var pixArr = getPixels(imgEl);
    var filter = imgEl.dataset.filter;

    obj = {
        pixel: pixArr,
        filter: filter
    };

    // worker for non blocking calculation 
    worker = new Worker('worker.js');

    worker.postMessage(obj);

    worker.onmessage = function(e) {

        renderCanvas(imgEl, e.data);

    };

    function getPixels(img) {
        var canvas, context;
        canvas = getCanvas(img.width, img.height);
        context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        return context.getImageData(0, 0, canvas.width, canvas.height);
    }

    function getCanvas(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    function renderCanvas(img, new_pixels) {
        var canvas, context;
        canvas = getCanvas(img.width, img.height);
        context = canvas.getContext("2d");
        context.putImageData(new_pixels, 0, 0);
        img.src = canvas.toDataURL();
        return;
    }
}
