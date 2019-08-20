var getPixels = require("get-pixels")

getPixels("img/fort.gif", (err, pixels) => {
    if (err) {
        console.log("not found")
        return
    }
    go(pixels);
})

async function go(pixels) {
    for (var i = 0; i < pixels.shape[0]; i++) {
        await sleep(40)
        printFrame(pixels, i);
    }
}

function getDarkness(pixels, pixel, frame) {
    var r = pixels.get(pixel[0], pixel[1], pixel[2], 0);
    var g = pixels.get(pixel[0], pixel[1], pixel[2], 1);
    var b = pixels.get(pixel[0], pixel[1], pixel[2], 2);
    var a = pixels.get(pixel[0], pixel[1], pixel[2], 3);
    if (a == 255) {
        return (255 - ((r + g + b) / 3)) / 255;
    } else {
        return 0;
    }
}

function printFrame(pixels, frame_num) {
    var str = "";
    for (var h = 0; h < pixels.shape[2] / 10; h++) {
        for (var w = 0; w < pixels.shape[1] / 10; w++) {
            darkness = getDarkness(pixels, [frame_num, w * 10, h * 10], frame_num);
            if (darkness == 0) {
                str += "  ";
            } else if (darkness <= 0.6 && darkness >= 0.3) {
                str += "▓▓";
            } else if (darkness > 0.6 && darkness <= 0.8) {
                str += "▒▒";
            } else {
                str += "░░";
            }
        }
        str += "\n";
    }
    console.log(str);
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}