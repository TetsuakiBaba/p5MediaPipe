var g_text = '';
function setup() {
    // Setup code goes here
    // sketch-holderにcanvasを作成
    let canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
}

function draw() {
    // Drawing code goes here
    background(220); // Replace with your desired background color

    // Add your drawing commands here
    text(g_text, 20, 20);
}

// Add any additional functions or event handlers below