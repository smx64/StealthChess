//initializing base variables
let CS_totalPlayers = 2;
let CS_playerNames = [];
let CS_totalCards = 4;

//initializing card placeholder position variables
let CS_cards_initxPos;
let CS_cards_separation;
let CS_cards_size;

//initializing aesthetic variables - red color, fonts, card & background images
let CS_backgroundImage;
let CS_redShade = "#FF0000";
let CS_fontHeading, CS_fontBody, CS_fontAccent;
let CS_P1_cardImage_Q, CS_P1_cardImage_B, CS_P1_cardImage_N, CS_P1_cardImage_R, CS_P1_cardImage_P;
let CS_P2_cardImage_Q, CS_P2_cardImage_B, CS_P2_cardImage_N, CS_P2_cardImage_R, CS_P2_cardImage_P;

//initializing input field variables
let CS_nameField, CS_cardLetterField;

//initializing card counter and empty arrays for storing players' card values
let CS_playerCount = 1;
let CS_cardCount = 0;
let CS_P1_Cards = [];
let CS_P2_Cards = [];

function preload()
{
    CS_backgroundImage = loadImage("./Assets/BG_Image.png");

    //pre-loading typefaces
    CS_fontHeading = loadFont("./Assets/BlackOpsOne.ttf");
    CS_fontAccent = loadFont("./Assets/LexendTera.ttf");
    CS_fontBody = loadFont("./Assets/NATS.ttf");

    //pre-loading player 1 card images
    CS_P1_cardImage_Q = loadImage("./Assets/Player1_Queen.png");
    CS_P1_cardImage_B = loadImage("./Assets/Player1_Bishop.png");
    CS_P1_cardImage_N = loadImage("./Assets/Player1_Knight.png");
    CS_P1_cardImage_R = loadImage("./Assets/Player1_Rook.png");
    CS_P1_cardImage_P = loadImage("./Assets/Player1_Pawn.png");

    //pre-loading player 2 card images
    CS_P2_cardImage_Q = loadImage("./Assets/Player2_Queen.png");
    CS_P2_cardImage_B = loadImage("./Assets/Player2_Bishop.png");
    CS_P2_cardImage_N = loadImage("./Assets/Player2_Knight.png");
    CS_P2_cardImage_R = loadImage("./Assets/Player2_Rook.png");
    CS_P2_cardImage_P = loadImage("./Assets/Player2_Pawn.png");
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    background(CS_backgroundImage);

    //creating name input field
    CS_nameField = createInput();
    CS_nameField.size(300, 30);
    CS_nameField.position(width/2.5, height/2);

    //creating card letter input field
    CS_cardLetterField = createInput();
    CS_cardLetterField.hide();
    CS_cardLetterField.size(30, 30);
    CS_cardLetterField.position(width/1.92, height-(height/8.5));

    //setting card height to scale according to screen-height
    CS_cards_size = height/3;
    CS_cards_separation = 325;

    //generating chessboard for piece placement segment
    let PP_init_block_yPos = int(height/3.75);
    for(let PP_blockRow=0; PP_blockRow<PP_chessboardSize; PP_blockRow++)
    {
        let PP_init_block_xPos = int(width/9);
        PP_blocksArray.push([]);

        for(let PP_blockCol=0; PP_blockCol<PP_chessboardSize; PP_blockCol++)
        {
            let PP_Chessboard_object = new PP_Chessboard(PP_init_block_xPos, PP_init_block_yPos, PP_blockRow, PP_blockCol);
            PP_blocksArray[PP_blockRow].push(PP_Chessboard_object);
            PP_init_block_xPos += PP_blocksArray[PP_blockRow][PP_blockCol].PP_block_separation;
        }
        PP_init_block_yPos += PP_blocksArray[PP_blockRow][PP_blockRow].PP_block_separation;
    }
}

function draw()
{
    if(CS_playerCount <= CS_totalPlayers)
    {
        //function to display on-screen text
        CS_playerTextDisplay();

        //condition to check player name entry
        if(keyCode == ENTER && CS_nameField.value() != "")
        {
            //name value pushed to player name array on pressing enter key
            CS_playerNames.push(CS_nameField.value());
            CS_nameField.value("");
            CS_nameField.hide();

            //generating card placeholder shapes
            background(CS_backgroundImage);
            rectMode(CENTER);
            fill(255);
            noStroke();

            CS_cards_initxPos = width/5.5;
            for(let i=0; i<CS_totalCards; i++)
            {
                rect(CS_cards_initxPos, height/1.8, CS_cards_size, CS_cards_size/0.64, 15);
                CS_cards_initxPos += CS_cards_separation;
            }

            //resetting cards' initial position for superimposing actual card images on card selection
            CS_cards_initxPos = width/5.5;
        }

        //condition to check card values entered in input field
        if(keyCode == ENTER && CS_cardCount < CS_totalCards && (CS_cardLetterField.value() == 'Q' || CS_cardLetterField.value() == 'B' || CS_cardLetterField.value() == 'N' || CS_cardLetterField.value() == 'R' || CS_cardLetterField.value() == 'P'))
        {
            if(CS_playerCount == 1)
            {
                //pushing letter values onto players' card value array, and resetting input field to blank
                CS_P1_Cards.push(CS_cardLetterField.value());
                CS_cardLetterField.value("");

                //generating actual card images for the values entered
                //function decides which image to generate depending on value passed from letter input field
                imageMode(CENTER);
                image(CS_showCardImage(CS_P1_Cards[CS_cardCount]), CS_cards_initxPos, height/1.8, CS_cards_size, CS_cards_size/0.64);
                CS_cards_initxPos += CS_cards_separation;
            }
            //same thing as above, but for player 2
            else if(CS_playerCount == 2)
            {
                CS_P2_Cards.push(CS_cardLetterField.value());
                CS_cardLetterField.value("");

                imageMode(CENTER);
                image(CS_showCardImage(CS_P2_Cards[CS_cardCount]), CS_cards_initxPos, height/1.8, CS_cards_size, CS_cards_size/0.64);
                CS_cards_initxPos += CS_cards_separation;
            }
            //counter to check total cards picked by each player
            CS_cardCount++;
        }
        //once all cards picked, increment player count variable and restart process for next player
        else if(CS_cardCount >= CS_totalCards && CS_playerCount <= CS_totalPlayers)
        {
            //hide the input field box after all cards picked
            CS_cardLetterField.hide();

            //continue to another by pressing spacebar
            if(keyCode == 32)
            {
                //reset card counter for next player & bring up input field for entering player name
                CS_playerCount++;
                CS_cardCount = 0;
                CS_nameField.show();

                //resetting image mode so that the background comes fullscreen
                imageMode(CORNER);
                background(CS_backgroundImage);
            }
        }
    }
    //if all players done with their card selections, move onto piece placement file
    else
    {
        CS_nameField.hide();

        //function to proceed to piece placement step
        piecePlacement();
    }
}

//function definition for displaying on-screen text
function CS_playerTextDisplay()
{
    textAlign(CENTER,CENTER);
    textFont(CS_fontAccent);
    textSize(32);
    fill(CS_redShade);
    noStroke();
    text("CARD SELECTION", width/2, height/12);

    textFont(CS_fontHeading);
    fill(255);
    
    //code to display text before player has entered name
    if(CS_playerNames[CS_playerCount-1] == undefined)
    {
        text("PLAYER "+CS_playerCount, width/2, height/7.5);
        
        textFont(CS_fontBody);
        textSize(30);
        text("Enter Player "+CS_playerCount+"'s Name", width/2, height/2.2);
    }
    //code to display text after player has entered name
    else
    {
        //code to display text for the card picking process
        if(CS_cardCount < CS_totalCards)
        {
            text("PLAYER "+CS_playerCount+": "+CS_playerNames[CS_playerCount-1], width/2, height/7.5);

            textFont(CS_fontBody);
            textSize(30);
            text("Cards Picked From Deck", width/2, height/4.5);
            text("Card Letter: ", width/2.1, height-(height/9));
            CS_cardLetterField.show();
        }
        //code to hide text after all cards picked for a player
        else
        {
            rectMode(CORNER);
            fill(CS_redShade);
            noStroke();
            rect(0, height-(height/9), width, height);
            
            fill(255);
            textFont(CS_fontBody);
            textSize(25);
            text("Done! Press [SPACE] to continue.", width/2, height-(height/15));
        }
    }
}

//function to return variable name of actual image card depending on letter value received from input field
function CS_showCardImage(letterValue)
{
    if(CS_playerCount == 1)
    {
        switch(letterValue)
        {
            case 'Q': return CS_P1_cardImage_Q;
            break;
            case 'B': return CS_P1_cardImage_B;
            break;
            case 'N': return CS_P1_cardImage_N;
            break;
            case 'R': return CS_P1_cardImage_R;
            break;
            case 'P': return CS_P1_cardImage_P;
            break;
        }
    }
    else if(CS_playerCount == 2)
    {
        switch(letterValue)
        {
            case 'Q': return CS_P2_cardImage_Q;
            break;
            case 'B': return CS_P2_cardImage_B;
            break;
            case 'N': return CS_P2_cardImage_N;
            break;
            case 'R': return CS_P2_cardImage_R;
            break;
            case 'P': return CS_P2_cardImage_P;
            break;
        }
    }
}