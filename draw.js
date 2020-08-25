// The basic functions used to draw the animations

// Make the shapes clear on most popular screen sizes
var getPixelRatio = function (context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};


// draw the main axis for the arithmetic coding
function draw_axis(data, ctx, x1, y1, x2, y2, ratio){

    ctx.beginPath();

    // draw line
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.font = "16px Arial";
    ctx.fillText(data, (x1-80)*ratio, (y1-50)*ratio);

}

// draw the boundaries for each symbols in the input string
function draw_bar(ctx, data, x1, y1, x2, y2, ratio){

    ctx.beginPath();

    // draw line
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.stroke();

    ctx.font = "16px Arial";
    ctx.fillText(data, x1*ratio, y1*ratio);
}

// draw the lines that connect the last step and the current step
function draw_line(ctx, x1, y1, x2, y2){
    ctx.beginPath();

    // draw line
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.stroke();
}
