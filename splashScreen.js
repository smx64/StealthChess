function preload()
{
    //pre-loading screen images
    CS_backgroundImage = loadImage("./Assets/BG_Image.png");
    CS_gameLogo = loadImage("./Assets/Logo_StealthChess_White.png");
    CS_SMXLogo = loadImage("./Assets/Logo_SMX.png");

    //pre-loading typefaces
    CS_fontHeading = loadFont("./Assets/BlackOpsOne.ttf");
    CS_fontAccent = loadFont("./Assets/LexendTera.ttf");
    CS_fontBody = loadFont("./Assets/NATS.ttf");
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    background(CS_backgroundImage);

    //loading game logo
    imageMode(CENTER);
    image(CS_gameLogo, width/2, height/2.6);

    //creating start game button
    startButton = createButton("START GAME");
    startButton.position(width/2.3, height/1.68);
    startButton.style("width", width/8+"px");
    startButton.style("height", height/15+"px");
    startButton.mouseClicked(gameStart);

    //generating smx logo and dynamic sizing
    SMX_widthSize = 60;
    image(CS_SMXLogo, width/2, height-(height/10), SMX_widthSize, SMX_widthSize/3.6);

    //code to generate name at bottom-right corner
    textAlign(RIGHT,CENTER);
    textFont(CS_fontAccent);
    textSize(12);
    fill(255);
    noStroke();
    text("SHASHWAT MISHRA | 2025", width-(width/40), height-(height/25));
}

//function to start game on button click
function gameStart()
{
    startButton.hide();
    window.location.href = "./StealthChess.html";
}