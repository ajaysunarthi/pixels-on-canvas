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

    console.log(obj);

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
}