// get the input from the input text box
function get_input(){
    var input_string = document.getElementById('inputstr').value;
    console.log(input_string);
    var show = document.getElementById('inputshow');
    show.innerText = input_string;
}

// calculate the frequency for the specific symbol in the input string 'str'
function get_frequency(symbol, str){
    var counter = 0;
    for(var i=0;i<str.length;i++){
        if(str.charAt(i)==symbol){
            counter++;
        }
    }
    return counter/str.length;
}


// the arithmetic encoding algorithm implementation (with animation)
function arithmetic(input_string, length) {
    var cdf = {};
    var scaned_string = '';
    for (var i = 0; i < input_string.length; i++) {
        if (i === 0) {
            cdf[input_string[i]] = get_frequency(input_string[i], input_string);
            scaned_string += input_string[i];
        }else{
            if (get_frequency(input_string[i], scaned_string) === 0){
                cdf[input_string[i]] = cdf[Object.keys(cdf)[(Object.keys(cdf)).length-1]] + get_frequency(input_string[i], input_string);
                scaned_string += input_string[i];
            }

        }
    }

    var low = 0.0;
    var high = 1.0;

    x1 = 100;
    var y1 = 50;

    x2 = 500;
    var y2 = 50;


    var canvas = document.getElementById("tree");
    var ctx = canvas.getContext("2d");
    var ratio = getPixelRatio(ctx);

    canvas.width = 600;
    canvas.height = 1800;
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    canvas.style.width = '100%';
    canvas.style.height = canvas.height + 'px';

    draw_axis('', ctx, x1, y1, x2, y2, ratio);
    var bar_x = low;
    draw_bar(ctx, bar_x, x1, y1-5, x1, y1+5, ratio);
    ctx.fillText(Object.keys(cdf)[0], x1+5, y1+15);
    for(var k=0; k<(Object.keys(cdf)).length-1; k++){
        bar_x = (x2-x1) * cdf[Object.keys(cdf)[k]] + x1;
        draw_bar(ctx, (low + cdf[Object.keys(cdf)[k]]).toFixed(2), bar_x, y1-5, bar_x, y1+5, ratio);
        ctx.fillText(Object.keys(cdf)[k+1], bar_x+5, y1+15);
    }
    draw_bar(ctx, high, x2, y1-5, x2, y1+5, ratio);


    y1 += 100;
    y2 += 100;

    var last_low;
    var last_high;

    for(var j=0; j<length; j++){

        var range = high - low;



        if(j === 0){  // the first iteration, only change the high, low does not change
            last_high = (x2-x1) * cdf[input_string[j]] + x1;
            high = 1 * cdf[input_string[j]];
            last_low = x1;
        }else{
            last_high = (x2-x1) * cdf[input_string[j]] + x1;
            high = low + range * cdf[input_string[j]];

            if(input_string[j] === Object.keys(cdf)[0]){
                // in this case, the low does not change
                last_low = x1;
            }else{

                var last_index = Object.keys(cdf).indexOf(input_string[j])-1;
                var last_value = Object.keys(cdf)[last_index];
                last_low = (x2-x1) * cdf[last_value] + x1;
                low = low + range * cdf[last_value];
            }
        }




        draw_line(ctx, last_low, y1-100, x1, y1);
        draw_line(ctx, last_high, y2-100, x2, y2);
        draw_axis("Input " + input_string[j], ctx, x1, y1, x2, y2, ratio);
        bar_x = low;
        draw_bar(ctx, bar_x.toFixed(5), x1, y1-5, x1, y1+5, ratio);
        ctx.fillText(Object.keys(cdf)[0], x1+5, y1+15);
        for(var k=0; k<(Object.keys(cdf)).length-1; k++){
            bar_x = (x2-x1) * cdf[Object.keys(cdf)[k]] + x1;
            draw_bar(ctx, (low + (high-low) * cdf[Object.keys(cdf)[k]]).toFixed(5), bar_x, y1-5, bar_x, y1+5, ratio);
            ctx.fillText(Object.keys(cdf)[k+1], bar_x+5, y1+15);
        }
        draw_bar(ctx, high.toFixed(5), x2, y1-5, x2, y1+5, ratio);


        y1 += 100;
        y2 += 100;

    }
    ctx.scale(ratio,ratio);

    return low;

}

// to show the encoding process on canvas
function encoding(input_string){
    var low;
    var j = document.getElementById('j').innerText;
    console.log("j = " + j);
    var length = parseInt(j);
    if (length < input_string.length){
        console.log("length = ", length);
        low = arithmetic(input_string, length);
        length++;
        document.getElementById('j').innerText = String(length);
        document.getElementById('result').innerText = String(low);
    }


}