let totalPieces = 4;
let cards_xPos;
let cardTextbox;

let cardCount = 0;
let p1_Cards = [];

let P1_cardImage_Q;
let P1_cardImage_B;
let P1_cardImage_N;
let P1_cardImage_R;
let P1_cardImage_P;

function preload()
{
    P1_cardImage_Q = loadImage("./CardImages/Player1_Queen.png");
    P1_cardImage_B = loadImage("./CardImages/Player1_Bishop.png");
    P1_cardImage_N = loadImage("./CardImages/Player1_Knight.png");
    P1_cardImage_R = loadImage("./CardImages/Player1_Rook.png");
    P1_cardImage_P = loadImage("./CardImages/Player1_Pawn.png");
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    background(0);

    textAlign(CENTER,CENTER);
    textSize(32);
    fill(255);
    noStroke();
    text("PLAYER 1", width/2, height/10);

    cards_xPos = width/4.75;
    rectMode(CENTER);

    for(let i=0; i<totalPieces; i++)
    {
        rect(cards_xPos, height/2.25, 250, 350, 15);
        cards_xPos+=300;
    }

    cards_xPos = width/4.75;

    cardTextbox = createInput();
    cardTextbox.size(30,30);
    cardTextbox.position(width/2.05, height-(height/5));
}

function draw()
{
    if(keyCode == ENTER && cardCount < totalPieces && (cardTextbox.value() == 'Q' || cardTextbox.value() == 'B' || cardTextbox.value() == 'N' || cardTextbox.value() == 'R' || cardTextbox.value() == 'P'))
    {
        p1_Cards.push(cardTextbox.value());
        cardTextbox.value("");
        
        imageMode(CENTER);
        image(showImg(p1_Cards[cardCount]), cards_xPos, height/2.25, 250, 350);
        cards_xPos+=300;
        cardCount++;
    }
    else if(cardCount >= totalPieces)
    {
        cardTextbox.hide();
        text("Player 1 Pieces Selected! Press [SPACE] for Player 2.", width/2, height/1.5);
        if(keyCode == 32)
        {
            background(0);
        }
    }
}

function showImg(funValue)
{
    switch(funValue)
    {
        case 'Q': return P1_cardImage_Q;
        break;
        case 'B': return P1_cardImage_B;
        break;
        case 'N': return P1_cardImage_N;
        break;
        case 'R': return P1_cardImage_R;
        break;
        case 'P': return P1_cardImage_P;
        break;
    }
}