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
    image(CS_gameLogo, width/2, height/3);

    //creating start game button - digital version
    startButton_digital = createButton("START GAME (DIGITAL)");
    startButton_digital.position(width/2.9, height/1.8);
    startButton_digital.style("width", width/8+"px");
    startButton_digital.style("height", height/12+"px");
    startButton_digital.mouseClicked(gameStart_digital);

    //creating start game button - hybrid version
    startButton_hybrid = createButton("START GAME (HYBRID)");
    startButton_hybrid.position(width/1.95, height/1.8);
    startButton_hybrid.style("width", width/8+"px");
    startButton_hybrid.style("height", height/12+"px");
    startButton_hybrid.mouseClicked(gameStart_hybrid);

    //generating smx logo and dynamic sizing
    SMX_widthSize = 60;
    image(CS_SMXLogo, width/2, height-(height/6.2), SMX_widthSize, SMX_widthSize/3.6);

    //code to generate name at bottom-right corner
    textAlign(LEFT,CENTER);
    textFont(CS_fontBody);
    textSize(20);
    noStroke();
    fill(255,0,0);
    text("DIGITAL -", width/40, height-(height/13));
    text("HYBRID -", width/40, height-(height/20));
    fill(255);
    text("Physical StealthChess Cards NOT REQUIRED", width/13.5, height-(height/13));
    text("Physical StealthChess Cards REQUIRED", width/13.5, height-(height/20));
    
    textAlign(RIGHT,CENTER);
    textFont(CS_fontAccent);
    textSize(12);
    fill(255);
    text("SHASHWAT MISHRA | 2025", width-(width/40), height-(height/20));
}

//function to start digital version of game on button click
function gameStart_digital()
{
    //hiding all buttons
    startButton_digital.hide();
    startButton_hybrid.hide();

    //redirecting to cardSelection.js
    window.location.href = "./StealthChess_Digital.html";
}

//function to start hybrid version of game on button click
function gameStart_hybrid()
{
    //hiding all buttons
    startButton_digital.hide();
    startButton_hybrid.hide();

    //redirecting to cardSelection.js
    window.location.href = "./StealthChess_Hybrid.html";
}